import Settings from "../../config"
import { swapToItem, rightClick, getClass } from "../utils/Utils"

register("chat", () => {
	if(!Settings().AutoRag) return;
	const currentClass = getClass()
	if (currentClass !== "Mage") return;
	useRag()
	actionBarLivid.register()
}).setCriteria("[BOSS] Livid: I can now turn those Spirits into shadows of myself, identical to their creator.")

register("chat", () => {
	if(!Settings().AutoRag) return;
	const currentClass = getClass()
	if (currentClass == "Mage") {
		useRag()
		actionBarM7Mage.register()
	}
    else if (currentClass !== "Archer" && currentClass !== "Berserk") return;
	useRag()
}).setCriteria("[BOSS] Wither King: I no longer wish to fight, but I know that will not stop you.")

function useRag() {
	swapToItem("Ragnarock")
	Client.scheduleTask(1, () => { rightClick() })
}



const actionBarLivid = register("actionBar", (message) => {
	actionBarLivid.unregister()
	Client.scheduleTask(0, () => { swapToItem("Ice Spray Wand")})
}).setChatCriteria(/.*\bCASTING\b$/).unregister()

const actionBarM7Mage = register("actionBar", (message) => {
	actionBarM7Mage.unregister()
	Client.scheduleTask(0, () => { swapToItem("Last Breath")})
}).setChatCriteria(/.*\bCASTING\b$/).unregister()