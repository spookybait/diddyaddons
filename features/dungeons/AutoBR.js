import Settings from "../../config"
import { getDoors, getMiddleofBlood } from "../utils/MapUtils"
import { getDistance2D, getDistance, calcYawPitch, Prefix, snapTo, S08PacketPlayerPosLook, swapToItem, swapToItemSbID, rightClick, C08PacketPlayerBlockPlacement, S08PacketPlayerPosLook, scheduleTask, C09PacketHeldItemChange, useAotv } from "../utils/Utils"
import { doPearlclip } from "../utils/pearlclip"
import Listener from "../utils/Listeners"
import RenderLib from "RenderLibV2J"

//const inSingleplayer = () => Client.getMinecraft().func_71356_B()
let doorFound = false
let coords = []
let hudText = new Text("").setShadow(true).setAlign('CENTER')

register("chat", () => {
	if (!Settings().AutoBloodRush) return;
	dungeonEntered.register()
	setTimeout( () => { dungeonEntered.unregister() }, 20000)
}).setCriteria(/^-*->newLine<-(\[.+\] |)\w* entered (MM |)The Catacombs, Floor (IX|IV|V?I{0,3})!->newLine<--*/)

const unload = register("worldLoad", () => {
	unload.unregister()
	renderHud.unregister()
	doorFinder.unregister()
	inBlood.unregister()
	coords = []
	doorFound = false
	chainPearls = false
	extraPearls = 0
}).unregister()

const dungeonEntered = register("worldUnload", () => {
	if (!Settings().AutoBloodRush) return;
	setTimeout( () => { unload.register() }, 500)
	renderHud.register()
	doorFinder.register()
	hudText.setScale(1)
	hudText.setString("Looking for door.")
}).unregister()

const renderHud = register("renderOverlay", () => {
	if (!Settings().AutoBloodRush) return;
	hudText.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 + 10)
}).unregister()

const doorFinder = register("tick", () => {
	if (!Settings().AutoBloodRush) return;
	const bloodDoor = getDoors()
	if (!bloodDoor) return;
	doorFinder.unregister()
	doorFound = true
	hudText.setString("Door found!")
	coords = getMiddleofBlood(bloodDoor[1], bloodDoor[2])
	console.log(coords)
}).unregister()

const autoBRtrigger = register("chat", () => {
	if (!Settings().AutoBloodRush) return;
	if (!doorFound) return;
	if (!coords) return;
	hudText.setString("Attempting to teleport.")
	setTimeout( () => {
	attemptAutoBR.register()
	inBlood.register()
	}, Settings().AutoBRDeathTicks * 50)

}).setCriteria("Starting in 1 second.").setStart()
/*
register("command", () => {
	doorFound = false
	doorFinder.register()
}).setName("autobrreset")

register("command", (uses) => {
	setTimeout( () => { ChatLib.command(`ct simulate ${Player.getName()} is now ready!`, true)}, 1000)
	setTimeout( () => { ChatLib.command("ct simulate Starting in 4 seconds.", true)}, 2000)
	setTimeout( () => { ChatLib.command("ct simulate Starting in 3 seconds.", true)}, 3000)
	setTimeout( () => { ChatLib.command("ct simulate Starting in 2 seconds.", true)}, 4000)
	setTimeout( () => { ChatLib.command("ct simulate Starting in 1 second.", true)}, 5000)
	
}).setName("autobrtest")
*/
let running = false
register("chat", () => {
	if (!Settings().AutoBloodRush) return;
	snapTo(Player.getYaw(), 90)
	if (doorFound) return;
	if (running) return;
	running = true
	scheduleTask(5, () => { running = false })
	hudText.setString("Attempting to load more chunks.")
	Listener.schedule(1, () => {
	goToMiddle.register()
	}, 50)
}).setCriteria(Player.getName() + " is now ready!").setStart()



function getAotvUses(num) {
  return Math.round(num / 12)
}

const attemptAutoBR = register("tick", () => {
	if (!Settings().AutoBloodRush) return;
	attemptAutoBR.unregister()
	goDown()
	//if (inSingleplayer) Client.scheduleTask(50, () => { ChatLib.command("tp @p -188.5 72 -56.5")})
}).unregister()

const goToMiddle = register("tick", () => {
	if (!Settings().AutoBloodRush) return;
	goToMiddle.unregister()
	goDown(true)
	//if (inSingleplayer) Client.scheduleTask(20, () => { ChatLib.command("tp @p -188.5 72 -56.5")})
	
}).unregister()

function goDown(middle = false) {
	doPearlclip(62)
	Listener.schedule(1, () => {
		scheduleTask(1, () => { useAotv(5) })
			Listener.schedule(5, () => {
			if (middle)	tpToMiddle()
				else tpOver()
	}, 40, "net.minecraft.network.play.server.S08PacketPlayerPosLook")
	//if (inSingleplayer) Listener.simulatePacket("net.minecraft.network.play.server.S08PacketPlayerPosLook", 5, 120)
	}, 40, "net.minecraft.network.play.server.S08PacketPlayerPosLook")
}

function tpToMiddle() {
	let aotvUses = getAotvUses(getDistance2D(Player.getX(), Player.getZ(), -105, -105))
	let [yaw, pitch] = calcYawPitch(-105.5, 70, -105.5)
	scheduleTask(3, () => {
		useAotv(aotvUses, yaw, 3.5)
	})
}

function tpOver() {
	let aotvUses = getAotvUses(getDistance2D(Player.getX(), Player.getZ(), coords[0], coords[1]))
	let [yaw, pitch] = calcYawPitch(coords[0], 70, coords[1])
	scheduleTask(1, () => {
		useAotv(aotvUses, yaw, 3.5)
		Listener.schedule(aotvUses, () => {
			goUp()
		}, 40, "net.minecraft.network.play.server.S08PacketPlayerPosLook")
		//if (inSingleplayer) Listener.simulatePacket("net.minecraft.network.play.server.S08PacketPlayerPosLook", aotvUses, 120)
	})
}
let extraPearls = 0
function goUp() {
	scheduleTask(1, () => {
		useAotv(5, Player.getYaw(), -90)
			//Listener.schedule(5, () => {
				scheduleTask(2, () => {
				swapToItem("Ender Pearl")
				extraPearls = Settings().AutoBRPearls
				if (Settings().AutoBloodRushPing) {					
				chainPearls = true
				scheduleTask(1, () => { rightClick() })
				} else {
				for (i = 0; i < extraPearls; i++) {
					scheduleTask(i + 1, () => { rightClick() })
				} }
				})
			//}, 40, "net.minecraft.network.play.server.S08PacketPlayerPosLook")
			//if (inSingleplayer) Listener.simulatePacket("net.minecraft.network.play.server.S08PacketPlayerPosLook", 5, 120)
	})
}


let chainPearls = false
const pearlChainer = register("packetReceived", (packet, event) => {
	if (!extraPearls) {
		chainPearls = false
		return;
	} else if (getDistance2D(coords[0], coords[1], packet.func_148932_c(), packet.func_148933_e()) > 25) {
		return;
	}
	extraPearls--
	Client.scheduleTask(0, () => { rightClick() })
}).setFilteredClass(S08PacketPlayerPosLook)

const inBlood = register("step", () => {
	if (getDistance(Player.getX(), Player.getY(), Player.getZ(), coords[0], 75, coords[1]) > 15) return;
	inBlood.unregister()
	ChatLib.chat(`${Prefix}Blood rush done!`)
	renderHud.unregister()
}).setFps(1).unregister()








