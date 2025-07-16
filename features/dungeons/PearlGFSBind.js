import { data } from "../utils/Data";
import Settings from "../../config";

// Bind key
const pearlKey = new KeyBind("Pearl GFS Bind", data.pearlKey, "diddyaddons");
register("gameLoad", () => {
  data.pearlKey = pearlKey.getKeyCode();
}).setPriority(Priority.HIGHEST);

pearlKey.registerKeyPress((player) => {
	if (!Settings().PearlGFSBind) return;
		if (data.funny) ChatLib.command("pc diddyaddons SAVED me 5 seconds in THAT room!!!")
		let foundPearls = false
		Player.getInventory().getItems().forEach(item => {
			if(item != undefined && item.getID() == 368) {
				foundPearls = true
				if(item.getStackSize() < 16) {
					ChatLib.command("gfs ender pearl " + (16 - item.getStackSize()))
				}
			}
			
		})
		if(!foundPearls) ChatLib.command("gfs ender pearl 16")
})


register("command", (player) => {
	let foundJerries = false
	Player.getInventory().getItems().forEach(item => {
		if(item != undefined && item.getName().includes("Inflatable Jerry")) {
			foundJerries = true
			if(item.getStackSize() < 64) {
				ChatLib.command("gfs inflatable jerry " + (64 - item.getStackSize()))
				}
			}
		})
	if(!foundJerries) ChatLib.command("gfs inflatable jerry 64")
}).setName("jerries")