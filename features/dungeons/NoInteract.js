import Settings from "../../config";

const badBlocks = ["Hopper", "Oak Fence Gate", "Birch Fence Gate", "Spruce Fence Gate", "Dark Oak Fence Gate", "Jungle Fence Gate", "Acacia Fence Gate"]

register("playerInteract", (action, vector3d, event) => {
	if (action.toString() !== "RIGHT_CLICK_BLOCK") return;
	if (Player?.getHeldItem()?.getName()?.includes("Ender Pearl")) {
		if (Settings().NoInteractPearl) {
			cancel(event)
		}
	}		
		else if (Settings().NoInteractAbility) {
		if (badBlocks.includes(World.getBlockAt(vector3d.x, vector3d.y, vector3d.z).type.getName()) && ["ASPECT_OF_THE_VOID", "ASPECT_OF_THE_END"].includes(Player.getHeldItem()?.getNBT()?.toObject()?.tag?.ExtraAttributes?.id)) {
			cancel(event)
		}
	}
})