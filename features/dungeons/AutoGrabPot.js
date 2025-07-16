import Settings from "../../config"
import { onTick, scheduleTask, sendWindowClick } from "../utils/PacketUtils"

const S08PlayerPosLook = net.minecraft.network.play.server.S08PacketPlayerPosLook
const S2DPacketOpenWindow = net.minecraft.network.play.server.S2DPacketOpenWindow
const C0DPacketCloseWindow = Java.type("net.minecraft.network.play.client.C0DPacketCloseWindow")
const S2FPacketSetSlot = Java.type("net.minecraft.network.play.server.S2FPacketSetSlot")

let windowOpen = false

register("chat", (rank, type, floor) => {
	if(!Settings().AutoGrabPot) return;
	let currentFloor = floormap[type] + floormap[floor]
	let validFloors = Settings().AutoGrabPotFloors.split(",")
	console.log(currentFloor)
	if (validFloors.includes(currentFloor))
	{
	potBag.register()
	setTimeout( () => { potBag.unregister() }, 10000)
	}
}).setCriteria(/^-*->newLine<-(\[.+\] |)\w* entered (MM |)The Catacombs, Floor (IX|IV|V?I{0,3})!->newLine<--*/)

const potBag = register("worldLoad", () => {
	packetTrigger.register()
		setTimeout( () => { packetTrigger.unregister() }, 1000)
		potBag.unregister()
}).unregister()

const packetTrigger = register("packetReceived", (packet) => {
	console.log(packet.toString())
	ChatLib.command("potionbag")
	packetTrigger2.register()
	packetTrigger.unregister()
}).setFilteredClass(S08PlayerPosLook).unregister()

const packetTrigger2 = register("packetReceived", (packet) => {
if(packet.func_179840_c().func_150254_d().removeFormatting() == "Potion Bag") {
packetTrigger3.register()
} packetTrigger2.unregister()
}).setFilteredClass(S2DPacketOpenWindow).unregister()

const packetTrigger3 = register("packetReceived", (packet) => {
    const slot = packet.func_149173_d();
    const windowId = packet.func_149175_c();
	const itemStack = packet.func_149174_e();
	console.log(itemStack, slot, windowId)
	if(itemStack == "1xitem.potion@1") {
		packetTrigger4.register
		const click = setTimeout( () => { 
		sendWindowClick(windowId, slot, 0, 1)
		packetTrigger4.unregister()
		Client.currentGui.close()
		}, 350)
		packetTrigger3.unregister()
		
	}
}).setFilteredClass(S2FPacketSetSlot).unregister()

const packetTrigger4 = register("packetReceived", (packet, event) => {
	clearTimeout(click)
	packetTrigger4.unregister()
}).setFilteredClass(C0DPacketCloseWindow).unregister()

/*
register("command", () => {
	console.log(Player.getHeldItem()?.getName())
	packetTrigger2.register()
}).setName("dungeonpot1")

// §5Dungeon VII Potion



register("command", () => {
packetTrigger.unregister()	
}).setName("stoppackettrigger")
*/


let floormap = {
	"I": "1",
	"II": "2",
	"III": "3",
	"IV": "4",
	"V": "5",
	"VI": "6",
	"VII": "7",
	"": "F",
	"MM ": "M",
}

/*
§9§m-----------------------------
§r§b[MVP§r§3+§r§b] SpookyBait§r§f §r§eentered §r§c§lMM§r§c The Catacombs§r§e, §r§eFloor VII§r§e!
§r§9§m-----------------------------§r
*/
