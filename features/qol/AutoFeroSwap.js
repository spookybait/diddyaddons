import Settings from "../../config";
import { getHeldItemID, swapToItemSbID, C02PacketUseEntity, S29PacketSoundEffect, scheduleTask, MouseEvent } from "../utils/Utils";
import { data } from "../utils/Data"

let active = false
let hp = 2
let lcmacModule = null

if (FileLib.exists("lcmac", "metadata.json")) {
	lcmacModule = require("../../../lcmac/index");
}

register("command", (user) => { 
	if (user) lcmacModule.enable()
	else lcmacModule.disable()
}).setName("lcmactest")

register("packetReceived", (packet, event) => {
	if (!Settings().AutoFeroSwap) return;
	const soundName = packet.func_149212_c()
	if (soundName !== "fire.ignite") return;
	if (getHeldItemID() !== "NEX_TITANUM") return;
	if (!is1HP()) return;
	if (active) return;
	active = true
	scheduleTask(10, () => { active = false })
	if (data.lcmac && lcmacModule) {
		lcmacModule.disable()
	}
	disableMouse.register()
	swapToItemSbID("STARRED_DAEDALUS_AXE")
	setTimeout( () => { disableMouse.unregister() }, 1000)
}).setFilteredClass(S29PacketSoundEffect)

register("packetSent", (packet) => {
	const action = packet.func_149565_c().toString()
	if (action !== "ATTACK") return;
	const entity = packet.func_149564_a(World.getWorld())
	hp = entity?.func_110143_aJ()
}).setFilteredClass(C02PacketUseEntity)

function is1HP() {
	if (hp == 1) return true
	else return false
}

const disableMouse = register(MouseEvent, (event) => {
	if (event.button === 0) cancel(event)
}).unregister()