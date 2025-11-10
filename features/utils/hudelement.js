import { data } from "./Data"

/*
	hudData should be an object within a PogData object with an x, y and scale value.
*/

class hudElement {
	constructor(hudData) {
	this.gui = new Gui()
	this.hudData = hudData
	this.text = ""
	
	this.hudTrigger = this.gui.registerDraw( () => {
	    Renderer.scale(hudData.scale)
		Renderer.translate(hudData.x / hudData.scale, hudData.y / hudData.scale);
        Renderer.drawString(this.text, 0, 0, true)
	}).unregister()

	this.dragTrigger = this.gui.registerMouseDragged( (x, y, bn, lc) => {
		hudData.x = x
		hudData.y = y
	}).unregister()

	this.scrollTrigger = this.gui.registerScrolled( (x, y, dir) => {
		hudData.scale += (dir / 20.0);
	}).unregister()

	this.guiClosedTrigger = this.gui.registerClosed( () => {
		data.save()
	}).unregister()
		
		
	}
	
	edit(text) {
		this.text = text
		this.gui.open()
	}
		
	draw(text, shadow = true, mx = 0, my = 0) {
		this.text = text
		Renderer.scale(this.hudData.scale)
        Renderer.translate(this.hudData.x / this.hudData.scale, this.hudData.y / this.hudData.scale);
		Renderer.drawString(this.text, mx, my, shadow)
	}

	
}

export default hudElement