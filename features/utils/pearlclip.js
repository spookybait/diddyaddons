import { S08PacketPlayerPosLook, snapTo, swapToItem, scheduleTask, rightClick } from "./Utils"

let yPos = 0
export const registerPearlClip = (pos) => {
    if (!pos) return
    yPos = Math.abs(pos)
    pearlclip.register()
    scheduleTask(20, () => {
        if (yPos !== Math.abs(pos)) return
        pearlclip.unregister()
        yPos = 0
        ChatLib.chat("Pearlclip timed out!")
    })
}

register("command", (dis) => {
	doPearlclip(dis)
}).setName("pearlclip")

export function doPearlclip(number) { 
	const distance = Number(number)
	if (isNaN(distance)) return;
	if ((Player.getY() - distance) > 40) return;
	snapTo(Player.getYaw(), 90)
	registerPearlClip(distance + 1)
	swapToItem("Ender Pearl")
	scheduleTask(1, () => { rightClick() })
}

const pearlclip = register("packetReceived", (packet, event) => {
    scheduleTask(0, () => {
      if (event?.isCancelled()) return
        pearlclip.unregister()
        ChatLib.chat(`Pearlclipped ${(Player.getY() - yPos).toFixed(2)} blocks down.`)
        Player.getPlayer().func_70107_b(Player.getX(), yPos, Player.getZ())
        yPos = 0
    })
}).setFilteredClass(S08PacketPlayerPosLook).unregister()