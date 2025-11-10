import Settings from "../../config"
import Listener from "../utils/Listeners"
import { swapToItemSbID, rightClick, scheduleTask } from "../utils/Utils"


register("chat", () => {
	if (!Settings().AutoFireFreeze) return;
	Listener.addListener(timer)
}).setCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?")

let ticks = 0

function timer() {
	ticks++
	if (ticks < 105) return;
	ticks = 0
	Listener.removeListener(timer)
	doFireFreeze.register()
}

const doFireFreeze = register("tick", () => {
	doFireFreeze.unregister()
	swapToItemSbID("FIRE_FREEZE_STAFF")
	scheduleTask(0, () => { rightClick() })
}).unregister()