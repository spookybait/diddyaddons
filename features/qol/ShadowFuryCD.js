import Settings from "../../config";
import { data } from "../utils/Data";
import { S32PacketConfirmTransaction, getHeldItemID } from "../utils/Utils";
import Listener from "../utils/Listeners";
import { huds } from "../../command";


let ticks = 0

const sfcdHudRender = register("renderOverlay", () => {
	if (!Settings().sfcd) return;
	if (ticks == 0) sfcdHudRender.unregister()
	
		let ticksInSeconds = ticks / 20
		let formatted = ticksInSeconds.toFixed(2)

	huds["sfcdhud"].instance.draw(`&6Shadow Fury:&c ${formatted}s&r`)
}).unregister()

function timer() {
	if (ticks > 0) ticks--
	else Listener.removeListener(timer)
}

register("playerInteract", (action) => {
	if (!Settings().sfcd) return;
	const itemID = getHeldItemID()
		if (action.toString() !== "RIGHT_CLICK_EMPTY") return;
		if (itemID != "SHADOW_FURY" && itemID != "STARRED_SHADOW_FURY") return;
        if (ticks > 0) return
		ticks = 300
		Listener.addListener(timer)
		sfcdHudRender.register()
})
