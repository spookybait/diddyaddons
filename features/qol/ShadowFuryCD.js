import Settings from "../../config";
import { data } from "../utils/Data"
import { S32PacketConfirmTransaction } from "../utils/PlayerUtils"


const sfcdHud = new Gui()
let sfcdText = new Text("").setShadow(true).setAlign('CENTER')
let ticks = 0

const sfcdHudRender = register("renderOverlay", () => {
	if (!Settings().sfcd) return;
	if (ticks == 0) sfcdHudRender.unregister()
	sfcdText.setScale(data.sfcdTextCoords.scale)
	
		let ticksInSeconds = ticks / 20
		let formatted = ticksInSeconds.toFixed(2)

		sfcdText.setString(`&6Shadow Fury:&c ${formatted}s&r`)
	sfcdText.draw(data.sfcdTextCoords.x, data.sfcdTextCoords.y)
}).unregister()


const timer = register("packetReceived", () => {
	if (ticks > 0) ticks--
	else timer.unregister()
}).unregister().setFilteredClass(S32PacketConfirmTransaction)

register("playerInteract", (action) => {
	if (!Settings().sfcd) return;
		let item = Player.getHeldItem();
        let itemId = item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id");
        if (itemId != "SHADOW_FURY" || ticks > 0 || action.toString() !== "RIGHT_CLICK_EMPTY") return
		ticks = 300
		timer.register()
		sfcdHudRender.register()
})

const editHudTrigger = register("renderOverlay", () => {
	    sfcdText.setScale(data.sfcdTextCoords.scale)
        sfcdText.setString(`&6Shadow Fury: &aREADY!&r`)
        sfcdText.draw(data.sfcdTextCoords.x, data.sfcdTextCoords.y)
}).unregister()

const dragTrigger = register("dragged", (dx, dy, x, y, bn) => {
	if (bn == 2) return
	data.sfcdTextCoords.x = x
	data.sfcdTextCoords.y = y
	data.save()
}).unregister()

const scrollTrigger = register("scrolled", (x, y, dir) => {
	if (dir == 1) data.sfcdTextCoords.scale += 0.05
	else data.sfcdTextCoords.scale -= 0.05
	data.save()
}).unregister()

const guiClosedTrigger = register("guiClosed", () => {
	editHudTrigger.unregister()
	dragTrigger.unregister()
	scrollTrigger.unregister()
	guiClosedTrigger.unregister()
}).unregister()

function enableMissingHudEdit() {
	editHudTrigger.register()
	dragTrigger.register()
	scrollTrigger.register()
	sfcdHud.open()
	setTimeout( () => { guiClosedTrigger.register() }, 50)
}

register("command", () => {
	enableMissingHudEdit()
}).setName("editsfcdhud")