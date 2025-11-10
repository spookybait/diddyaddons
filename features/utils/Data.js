import PogObject from "../../../PogData";

// --- PERSISTENT DATA ---

export const data = new PogObject(
  "diddyaddons",
  {
    // Control keys
    bpKey: 0,
    pearlKey: 0,
    swapKey: 0,
	testKey: 0,
    // Current Backpack
    backpack: "0",
    // Armor Reminder
    armorset: "",
    // funny
    funny: false,
	lcmac: false,
	lcmacFixed: false,
	fuckyouodin: false,
    // bad players.
	cooldownHudBlacklist: [],
	cooldownHudCoords: {
			x: Renderer.screen.getWidth() / 2,
			y: Renderer.screen.getHeight() / 2 + 10,
			scale: 1,
		},
	hudTextCoords: {
			x: Renderer.screen.getWidth() / 2,
			y: Renderer.screen.getHeight() / 2 + 10,
			scale: 1,
		},
	sfcdHudCoords: {
			x: Renderer.screen.getWidth() / 2,
			y: Renderer.screen.getHeight() / 2 + 10,
			scale: 1,
		},
})

register("gameUnload", () => {
  data.save();
}).setPriority(Priority.LOWEST);