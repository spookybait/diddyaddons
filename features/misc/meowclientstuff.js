import Settings from "../../config";

const mc = Client.getMinecraft()
const leftClickCounter = mc.getClass().getDeclaredField("field_71429_W");
leftClickCounter.setAccessible(true);

register("AttackEntity", (entity, event) => {
		if (!Settings().KeepSprint) return;
        if (mc.field_71439_g === null) return;
        if (!Player.isSprinting()) return;
        mc.field_71439_g.field_70159_w *= (1 - 0 / 60)
        mc.field_71439_g.field_70179_y *= (1 - 0 / 60)
        mc.field_71439_g.func_70031_b(true);	
	
})
register("tick", () => {
	if (!Settings().NoHitDelay) return;
	leftClickCounter.setInt(mc, 0);
})