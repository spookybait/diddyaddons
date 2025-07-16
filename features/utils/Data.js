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
	skin: false,
    // bad players.
    badplayers: [],
	hudTextCoords: {
			x: Renderer.screen.getWidth() / 2,
			y: Renderer.screen.getHeight() / 2 + 10,
			scale: 1,
		},
	sfcdTextCoords: {
			x: Renderer.screen.getWidth() / 2,
			y: Renderer.screen.getHeight() / 2 + 10,
			scale: 1,
		},
})

register("gameUnload", () => {
  data.save();
}).setPriority(Priority.LOWEST);