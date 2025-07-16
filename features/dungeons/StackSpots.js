import Settings from "../../config";
import RenderLib from "../../../RenderLibV2J"

	
register("chat", () => {
	if (Settings().StackSpots)
	trigger.register()
}).setCriteria("[BOSS] Wither King: You... again?")

register("worldUnload", () => {
trigger.unregister();	
})


const trigger = register("renderWorld", myWorldRender).unregister()

function myWorldRender() {
    RenderLib.drawEspBox(72.5, 5.01, 91.5, 1, 1, 1, 0.5019, 0, 1, false)
    RenderLib.drawEspBox(48.5, 5.01, 72.5, 1, 1, 1, 0.5019, 0, 1, false)
    RenderLib.drawEspBox(16.5, 6.01, 85.5, 1, 1, 0.8, 0, 0, 1, false)
    RenderLib.drawEspBox(32.5, 5.01, 88.5, 1, 1, 0.8, 0, 0, 1, false)
    RenderLib.drawEspBox(54.5, 6.01, 109.5, 1, 1, 0, 0.5019, 1, 1, false)
    RenderLib.drawEspBox(47.5, 5.01, 62.5, 1, 1, 0.1019, 0.6, 0, 1, false)
    RenderLib.drawEspBox(36.5, 5.01, 50.5, 1, 1, 0.1019, 0.6, 0, 1, false)
    RenderLib.drawEspBox(34.5, 6.01, 100.5, 1, 1, 0.5843, 0, 0.7019, 1, false)
    RenderLib.drawEspBox(85.5, 7.01, 113.5, 1, 1, 0.5843, 0, 0.7019, 1, false)
}