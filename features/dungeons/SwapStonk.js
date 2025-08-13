import { data } from "../utils/Data";
import Settings from "../../config";
import { leftClick, Prefix } from "../utils/Utils"


// Bind key
const swapKey = new KeyBind("Swap Stonk Bind", data.swapKey, "diddyaddons");
register("gameLoad", () => {
  data.swapKey = swapKey.getKeyCode();
}).setPriority(Priority.HIGHEST);
let active = false
let ticks = Settings().SwapStonkTicks
const validPickaxeIDs = [278, 285, 257, 274, 270]
const isInHotbar = (item) => { return (item < 8 && item >= 0) }

register("tick", () => {
	if (!swapKey.isKeyDown()) return;
	if (!Settings().SwapStonk || active) return;
	    active = true
    let pickaxeSlot = Player.getInventory().getItems().findIndex(item => validPickaxeIDs.includes(item?.getID()))
	    if (!isInHotbar(pickaxeSlot)) {
        ChatLib.chat(`${Prefix}Pickaxe not found in your hotbar!`)
        Client.scheduleTask(2, () => { active = false })
        return }
		let originalItem = Player.getHeldItemIndex()
if(pickaxeSlot == originalItem) 
{
	Client.scheduleTask(2, () => { active = false })
	return;
}
		Player.setHeldItemIndex(pickaxeSlot)
		leftClick()
	Client.scheduleTask(ticks, () => { Player.setHeldItemIndex(originalItem)})
    Client.scheduleTask(ticks + 1, () => { active = false })
}).setPriority(Priority.HIGH)
