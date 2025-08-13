import { data } from "../utils/Data";
import { Prefix } from "../utils/Utils"
import Settings from "../../config";

// Bind key
const bpKey = new KeyBind("Quick Backpack Bind", data.bpKey, "diddyaddons");
register("gameLoad", () => {
  data.bpKey = bpKey.getKeyCode();
}).setPriority(Priority.HIGHEST);

register("command", (user) => {
	const number = Number(user)
	if (number < 1 || number > 18 || isNaN(number)) {
	ChatLib.chat(`${Prefix}Please enter a valid number`)
	return;
	}
	data.backpack = number;
	data.save();
	ChatLib.chat(`${Prefix}Backpack set to ${data.backpack}`);
}).setName("bpset");


bpKey.registerKeyPress(() => {
 if (!Settings().QuickBackpackBind) return;
  ChatLib.command("bp " + data.backpack);
})

