import Settings from "../../config"
import { data } from "../utils/Data"
import { S32PacketConfirmTransaction, C08PacketPlayerBlockPlacement, C07PacketPlayerDigging, C09PacketHeldItemChange, S0FPacketSpawnMob, S1CPacketEntityMetadata, MCBlockPos, EnumFacing, releaseRightClick, pressRightClick, MouseEvent, getHeldItemID, getDistance2D, isPlayerInBox, getClass, swapToItemSbID, mc } from "../utils/Utils"
import tick from "../utils/Listeners"

let lcmacModule = null

const lcmacFunctions = `
export function enable() {
	autoClicking = true
	clicker()
}
export function disable() {
	autoClicking = false
}`

if (FileLib.exists("lcmac", "metadata.json")) {
	if (!data.lcmacFixed) {
		FileLib.append("lcmac", "index.js", lcmacFunctions)
		data.lcmacFixed = true
		data.save()
	}
	lcmacModule = require("../../../lcmac/index");
}
let dragonsSpawned = 0
let dragonsKilled = 0
let safety = false
let firing = false;
let inP5 = false;
let ticks = 0;
let initialSlot = -1;
let initialItemStack = null;
let dragonID = null
const boxes = [
    { xMin: 75, yMin: 5, zMin: 70,  xMax: 105, yMax: 28, zMax: 38 },
    { xMin: 76, yMin: 5, zMin: 108, xMax: 102, yMax: 28, zMax: 78 },
    { xMin: 72, yMin: 5, zMin: 115, xMax: 40, yMax: 28, zMax: 144 },
	{ xMin: 36, yMin: 5, zMin: 107, xMax: 6, yMax: 28, zMax: 82 },
	{ xMin: 33, yMin: 5, zMin: 43,  xMax: 8, yMax: 28, zMax: 76 }
];

register(MouseEvent, (event) => {
	if (!Settings().LBMacro) return;
	if (firing && event.button === 1) cancel(event);
	if (event.button !== 0) return;
	if (event.buttonstate) {
		const item = Player.getHeldItem();
		if (!item) return;
		if (item.getID() !== 261) return;
		if (getHeldItemID() !== "LAST_BREATH" && getHeldItemID() !== "STARRED_LAST_BREATH") return; 
		if (Player.getPlayer()?.func_71052_bv() !== 0) return;
		initialSlot = Player.getHeldItemIndex();
		initialItemStack = item.getItemStack();
		firing = true;
		ticks = 0;
		firstCharge();
		tick.addListener(tickListener);
		fireTrigger.register();
		hotbarSwap.register()
		cancel(event);
	} else firing = false;
});

register("worldLoad", () => {
	inP5 = false
	debuffTrigger.unregister()
	deathTrigger.unregister()
	dragonID = null
})

register("chat", () => {
	inP5 = true
	if (!Settings().AutoDebuff) return;
	debuffTrigger.register()
}).setCriteria("[BOSS] Wither King: You... again?")

register("chat", () => {
	console.log(dragonsSpawned, dragonsKilled)
}).setCriteria("[BOSS] Wither King: Incredible. You did what I couldn't do myself.")

const debuffTrigger = register("packetReceived", (packet, event) => {	
	if (!inP5) return; // should never happen
	const entityID = packet.func_149024_d()
	const entityX = packet.func_149023_f() / 32 
	const entityZ = packet.func_149029_h() / 32 // why is this a thing
	
	
	if (packet.func_149025_e() !== 63) return;
		if (getDistance2D(Player.getX(), Player.getZ(), entityX, entityZ) > 15) return;
		const currentClass = getClass()
		if (currentClass !== "Mage" && currentClass !== "Tank" && currentClass !== "Healer") return;
			for (let i = 0; i < boxes.length; i++) {
				if (isPlayerInBox(boxes[i].xMin, boxes[i].yMin, boxes[i].zMin, boxes[i].xMax, boxes[i].yMax, boxes[i].zMax)) {
				if (safety) return; // it should never get to this point where you are either in 2 boxes or this triggers multiple times but who knows
					safety = true 
					Client.scheduleTask(10, () => { safety = false })
					console.log(`Set dragonID to ${entityID}`)
					dragonID = entityID
					deathTrigger.register()
					dragonsSpawned++
					Client.scheduleTask(0, () => { swapToItemSbID("ICE_SPRAY_WAND", "STARRED_ICE_SPRAY_WAND")})
					if (currentClass === "Mage") { Client.scheduleTask(2, () => {
						eleaseRightClick()
						swapToItemSbID("STARRED_MIDAS_SWORD", "DARK_CLAYMORE")
							if (data.lcmac && lcmacModule) lcmacModule.enable()
					})} else Client.scheduleTask(2, () => { swapToItemSbID("SOUL_WHIP", "FLAMING_FLAY")})
    }
}
}).setFilteredClass(S0FPacketSpawnMob).unregister()

const deathTrigger = register("packetReceived", (packet, event) => {
	if (packet.func_149375_d() !== dragonID) return;
	if (!dragonID) return;
	const watcherData = packet.func_149376_c()
	watcherData.forEach(data => {
	if (data.func_75672_a() !== 6) return;
	if (data.func_75669_b() <= 0) {
		Client.scheduleTask(0, () => { 
		releaseRightClick()
		if (data.lcmac && lcmacModule) lcmacModule.disable()
		})
		dragonsKilled++
		deathTrigger.unregister()
	}
	})
}).setFilteredClass(S1CPacketEntityMetadata).unregister()

const hotbarSwap = register("packetSent", () => {
	console.log("swapped")
	hotbarSwap.unregister()
	if (Settings().AutoDebuff && inP5) return;
	lastRelease()
}).setFilteredClass(C09PacketHeldItemChange).unregister()

const fireTrigger = register("tick", () => {
	if (!firing) {
		tick.removeListener(tickListener);
		fireTrigger.unregister();
		hotbarSwap.unregister()
		lastRelease()
		return;
	}
	if (ticks >= Settings().LBTicks) {
		if (Player.getHeldItemIndex() !== initialSlot || Player.getHeldItem()?.getItemStack() !== initialItemStack) {
			tick.removeListener(tickListener);
			fireTrigger.unregister();
			hotbarSwap.unregister()
			return;
		}
		release();
		charge();
		ticks = 0;
	}
	if (!Settings().LBTickType) ++ticks;
}).unregister();

function tickListener() {
	if (Settings().LBTickType) ++ticks;
}

function firstCharge() {
	pressRightClick()
	
}
function lastRelease() {
	releaseRightClick()
}

function charge() {
	Client.sendPacket(new C08PacketPlayerBlockPlacement(Player.getHeldItem()?.getItemStack()));
}

function release() {
	if (Player.getHeldItem().getID() !== 261) return;
	Client.sendPacket(new C07PacketPlayerDigging(C07PacketPlayerDigging.Action.RELEASE_USE_ITEM, new MCBlockPos(0, 0, 0), EnumFacing.DOWN));
}

		