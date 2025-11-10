import Settings from "../../config";

const mc = Client.getMinecraft()
const leftClickCounter = mc.getClass().getDeclaredField("field_71429_W");
leftClickCounter.setAccessible(true);

register("tick", () => {
	if (!Settings().NoHitDelay) return;
	leftClickCounter.setInt(mc, 0);
})