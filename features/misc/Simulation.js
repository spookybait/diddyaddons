import Settings from "../../config"
import { C08PacketPlayerBlockPlacement, S08PacketPlayerPosLook, Prefix } from "../utils/Utils"
import RenderLib from "../../../RenderLibV2J"
import Vector3 from "../../../BloomCore/utils/Vector3"

const inSingleplayer = () => Client.getMinecraft().func_71356_B()

let active = false
let active2 = false
let interactables = ["minecraft:lever", "minecraft:chest", "minecraft:trapped_chest"]
let terminals = ["numbers", "melody", "panes", "rubix", "select", "starts with"]
let ssActive = false
let selectedButtons = []
let activeButtons = []
let origin = {x: 0, y: 0, z: 0}
let time = 0

let red = {r: 1, g: 0, b: 0}
let yellow = {r: 1, g: 1, b: 0}
let green = {r: 0, g: 1, b: 0}

register("tick", () => {
    if (!inSingleplayer()) return
    const { field_70159_w: motionX, field_70179_y: motionZ } = Player.getPlayer()
    const block = World.getBlockAt(Player.getX(), Player.getY(), Player.getZ()).type.getRegistryName()
	if (active) return;
    if (Settings().SingleplayerLavaBounce && Player.getPlayer().func_180799_ab()) {
		active = true
        ChatLib.chat(`${Prefix}Simulating Lava Bounce`)
        Client.scheduleTask(() => Player.getPlayer().func_70016_h(0, 3.44, 0))
		Client.scheduleTask(5, () => { active = false })
    } else if (Settings().SingleplayerSuperbounce && (block == "minecraft:rail" || block == "minecraft:chest")) {
		active = true
        ChatLib.chat(`${Prefix}Simulating Super Bounce`)
        Client.scheduleTask(() => Player.getPlayer().func_70016_h(0, 3.7, 0))
		Client.scheduleTask(5, () => { active = false })
    }
})
register("packetSent", (packet, event) => {
		if (!inSingleplayer()) return;
			if (packet.func_179724_a().func_177956_o() == -1) return;
				if (Player.getHeldItem()?.getName() == "Blaze Rod") {
					if (Settings().SingleplayerBonzo) {
						vectorBullshit(packet.func_179724_a(), packet.func_149573_h(), packet.func_149569_i(), packet.func_149575_j(), 1.5, 0.5, 4, true)
						ChatLib.chat(`${Prefix}Simulating Bonzo`);
				}} else if (Player.getHeldItem()?.getName() == "Gold Horse Armor") {
				if (Settings().SingleplayerJerrychine) {
						vectorBullshit(packet.func_179724_a(), packet.func_149573_h(), packet.func_149569_i(), packet.func_149575_j(), 0.5, 0.6, 2)
						ChatLib.chat(`${Prefix}Simulating Jerry-chine`);
				}}


}).setFilteredClass(C08PacketPlayerBlockPlacement)

register("packetSent", (packet, event) => {
	if (!inSingleplayer()) return;
	if (!Settings().SingleplayerSuperbounce) return;
	if (Player.getHeldItem()?.getRegistryName() == "minecraft:chest") cancel(event)
}).setFilteredClass(C08PacketPlayerBlockPlacement)

register("playerInteract", (action, vector, event) => {
	if (!inSingleplayer()) return;
	if (active2) return;
		active2 = true 
		Client.scheduleTask(1, () => {active2 = false})
		if (Settings().SingleplayerTerminals && World.getBlockAt(vector.x, vector.y, vector.z)?.type?.getRegistryName() == "minecraft:command_block") {
				cancel(event)
					const terminal = terminals[Math.floor(Math.random() * terminals.length)]
						ChatLib.command(`termsim ${terminal}`, true);
							Client.scheduleTask(1, () => {
								guiOpen.register()
								guiClose.register()
							})
		} else if (Settings().SimonSays && World.getBlockAt(vector.x, vector.y, vector.z)?.type?.getRegistryName() == "minecraft:stone_button") {
			if (ssActive) return;
			const buttons = [];
			let confirmedButtons = 0
				for (let z = 0; z < 4; z++) {
					for (let y = 0; y < 4; y++) {
						buttons.push({ z, y });
						}}
							buttons.forEach((button) => {
							if (World.getBlockAt(vector.x, vector.y - 1 + button.y, vector.z + 1 + button.z)?.type?.getRegistryName() == "minecraft:stone_button") {
								confirmedButtons++
							}})
							if (confirmedButtons == 16) startSS(vector.x, vector.y - 1, vector.z + 1)
							
		}
})

register("playerInteract", (action, vector, event) => {
	if(Player.getHeldItem()?.getID() != 368 || !Settings().CreativeEnderPearls || !inSingleplayer() || action.toString() != "RIGHT_CLICK_EMPTY") return;
	let world = event.entityPlayer.field_70170_p
    let enderPearl = new net.minecraft.entity.item.EntityEnderPearl(world, event.entityPlayer)
	if (!world.field_72995_K) {
		world.func_72838_d(enderPearl)
		//enderPearlFix.register()
	}
})

const enderPearlFix = register("packetReceived", (packet, event) => {
	if(!inSingleplayer()) return;
		if(!Settings().CreativeEnderPearls) return;
	let x =	(Math.floor(packet.func_148932_c())) + 0.5
	let y =	(Math.round(packet.func_148928_d()))
	let z =	(Math.floor(packet.func_148933_e())) + 0.5
	Client.scheduleTask(0, () => {
//	Player.getPlayer().func_70107_b(x, y, z)
	})
	enderPearlFix.unregister()
}).setFilteredClass(S08PacketPlayerPosLook).setPriority(Priority.HIGHEST).unregister()

const ssTrigger = register("playerInteract", (action, vector, event) => {
		if (!inSingleplayer()) return
		if (!ssActive) return;
		if (active2) return;
		active2 = true 
		Client.scheduleTask(1, () => {active2 = false})
		const clickedButton = World.getBlockAt(vector.x, vector.y, vector.z)
		if (activeButtons.length > 0 && activeButtons[0]) {
    const activeButton = new BlockPos(
        origin.x,
        origin.y + activeButtons[0].y,
        origin.z + activeButtons[0].z)
						if (clickedButton.x == activeButton.x && clickedButton.y == activeButton.y && clickedButton.z == activeButton.z) {
						activeButtons.shift()
						if (!activeButtons.length) addActiveButton()
					} else if (clickedButton.x == activeButton.x && clickedButton.y == origin.y + 1 && clickedButton.z == origin.z -1) {
						resetSS(true)
					}
				
				};
		
}).unregister()


const renderTrigger = register("renderWorld", () => {
	for (let i = 0; i < activeButtons.length; i++) {
		let button = activeButtons[i]
		switch (i) {
		case 0:
		RenderLib.drawInnerEspBoxV2(origin.x + 1, origin.y + button.y, origin.z + button.z + 0.5, 0.2, 1, 1, 0, green.g, 0, 0.8, false)
		break;
		case 1:
		RenderLib.drawInnerEspBoxV2(origin.x + 1, origin.y + button.y, origin.z + button.z + 0.5, 0.2, 1, 1, yellow.r, yellow.g, 0, 0.8, false)
		break;
		default:
		RenderLib.drawInnerEspBoxV2(origin.x + 1, origin.y + button.y, origin.z + button.z + 0.5, 0.2, 1, 1, red.r, 0, 0, 0.8, false)
		break;
	}}
}).unregister()

const guiOpen = register("guiOpened", (event) => {
	if (!inSingleplayer()) return
	//cancel(event)
	Client.scheduleTask(0, () => {Client.currentGui.close()})
	guiOpen.unregister()
	guiClose.unregister()
}).unregister()

const guiClose = register("guiClosed", (event) => {
	if (!inSingleplayer()) return
	//cancel(event)
	Client.scheduleTask(0, () => {Client.currentGui.close()})
	guiOpen.unregister()
	guiClose.unregister()
}).unregister()

function addActiveButton(skip) {
	if (selectedButtons.length >= 5) resetSS()

	let z, y;
	let exists;

	do {
		z = Math.floor(Math.random() * 4);
		y = Math.floor(Math.random() * 4);
		exists = selectedButtons.some(btn => btn.z === z && btn.y === y);
	} while (exists);
	selectedButtons.push({ z: z, y: y });
	 if (skip) {
	 addActiveButton()
	 return;
 }
	ssTrigger.unregister()
	for (let i = 0; i < selectedButtons.length; i++) {
		let test = { z: selectedButtons[i].z, y: selectedButtons[i].y };
		setTimeout(() => {
		activeButtons.push(test);
	}, ((500 * i) + 500));
	if (i+1 == selectedButtons.length) Client.scheduleTask(10 * (i+1), () => { ssTrigger.register()})
}
}


function startSS(originX, originY, originZ) {
	origin.x = originX
	origin.y = originY
	origin.z = originZ
	timer = Date.now()
	selectedButtons = []
	activeButtons = []
	addActiveButton(Settings().ssSkip)
	renderTrigger.register()
	ssTrigger.register()
	Client.scheduleTask(0, () => { ssActive = true })
	}

function resetSS(reset) {
	ssActive = false
	selectedButtons = []
	activeButtons = []
	renderTrigger.unregister()
	ssTrigger.unregister()
	if (!reset) ChatLib.chat((Date.now() - timer) / 1000)
}
register("command", () => {
	resetSS()
}).setName("resetss")

function vectorBullshit(mcBlockPos, offset1, offset2, offset3, multiplier, height, delay, flatten) {
	let blockPos = new BlockPos(mcBlockPos);
	let playerVector = null
	if (interactables.includes(World.getBlockAt(blockPos)?.type?.getRegistryName())) return;

	let blockVector = new Vector3(blockPos.x, blockPos.y, blockPos.z);
	let [xOffset, yOffset, zOffset] = [offset1, offset2, offset3];

	if (blockPos.x < 0) xOffset *= -1;
	if (blockPos.z < 0) zOffset *= -1;

	let blockVectorOffset = new Vector3(xOffset, yOffset, zOffset);
	let finalBlockVector = blockVector.add(blockVectorOffset);
	if (finalBlockVector.y == -1) return;
	Client.scheduleTask(delay - 2, () => { playerVector = new Vector3(Player.getX(), Player.getY() + 1.62, Player.getZ())});
	Client.scheduleTask(delay, () => {
		let direction = playerVector.subtract(finalBlockVector);
		if (flatten) direction.y = 0;
		let finalVector = direction.normalize().multiply(multiplier);
	console.log(finalVector)
		if (Number.isNaN(finalVector.y)) {
			Player.getPlayer().func_70016_h(0, height, 0);
		} else {
			Player.getPlayer().func_70016_h(finalVector.x, height, finalVector.z);
		}
	});
}
