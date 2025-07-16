import Settings from "../../config"
import { swapToItem, rightClick } from "../utils/PlayerUtils"




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
    if (currentClass !== "Archer" && currentClass !== "Berserk" && currentClass !== "Mage") return;
	useRag()
}).setCriteria("[BOSS] Wither King: I no longer wish to fight, but I know that will not stop you.")

const tickReg = register('tick', () => {
  tickReg.unregister();
  rightClick()
  // why cant you put Client.scheduleTask in a chat trigger
}).unregister();



function useRag() {
	swapToItem("Ragnarock")
	tickReg.register()
}

function getClass() {
    let index = TabList?.getNames()?.findIndex(line => line?.includes(Player.getName()))
    if (index == -1) return
    let match = TabList?.getNames()[index]?.removeFormatting().match(/.+ \((.+) .+\)/)
    if (!match) return "EMPTY"
    return match[1];
}



const actionBarLivid = register("actionBar", (message) => {
	actionBarLivid.unregister()
	Client.scheduleTask(0, () => { swapToItem("Ice Spray Wand")})
}).setChatCriteria(/.*\bCASTING\b$/).unregister()