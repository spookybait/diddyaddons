import { data } from "../utils/Data";
import Settings from "../../config";

// Bind key
const bpKey = new KeyBind("Quick Backpack Bind", data.bpKey, "diddyaddons");
register("gameLoad", () => {
  data.bpKey = bpKey.getKeyCode();
}).setPriority(Priority.HIGHEST);

register("command", (user) => {
	data.backpack = user;
	data.save();
	ChatLib.chat("Backpack set to " + data.backpack);
}).setName("bpset");


bpKey.registerKeyPress(() => {
 if (!Settings().QuickBackpackBind) return;
  ChatLib.command("bp " + data.backpack);
})