import { data } from "../utils/Data";
import Settings from "../../config";
import { leftClick, Prefix, swapToSlot, scheduleTask } from "../utils/Utils"

const ctBlock = Java.type("com.chattriggers.ctjs.minecraft.wrappers.world.block")


// Bind key
const swapKey = new KeyBind("Swap Stonk Bind", data.swapKey, "diddyaddons");
register("gameLoad", () => {
  data.swapKey = swapKey.getKeyCode();
}).setPriority(Priority.HIGHEST);
let active = false
let ticks = Settings().SwapStonkTicks
const validPickaxeIDs = [278, 285, 257, 274, 270]
const validAxeIDs = [279, 286]
const isInHotbar = (item) => { return (item < 8 && item >= 0) }

register("tick", () => {
	if (!swapKey.isKeyDown()) return;
	if (!Settings().SwapStonk || active) return;
	    active = true
	const inv = Player.getInventory()
	const lookingAt = Player.lookingAt()

    let pickaxeItem = inv.getItems().find(item => validPickaxeIDs.includes(item?.getID()))
	let pickaxeSlot = inv.indexOf(pickaxeItem)
	    if (!isInHotbar(pickaxeSlot)) {
        ChatLib.chat(`${Prefix}Pickaxe not found in your hotbar!`)
        scheduleTask(2, () => { active = false })
        return }
		let originalItem = Player.getHeldItemIndex()
	if (pickaxeSlot == originalItem) {
		scheduleTask(2, () => { active = false })
		return;
	}
		swapToSlot(pickaxeSlot)
		leftClick()
	scheduleTask(ticks, () => { swapToSlot(originalItem)})
    scheduleTask(ticks + 1, () => { active = false })
}).setPriority(Priority.HIGH)
