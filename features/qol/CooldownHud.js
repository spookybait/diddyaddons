import Settings from "../../config";
import { data } from "../utils/Data";
import { getItemID, S29PacketSoundEffect } from "../utils/Utils";
import Listener from "../utils/Listeners";
import { huds } from "../../command";


let cooldowns = {}
let queuedCooldowns = {}
const WITHER_IMPACT = ["Wither Impact", 5, "mob.zombie.remedy"]

const hardcodedCDs = {
	"HYPERION": WITHER_IMPACT,
	"VALKYRIE": WITHER_IMPACT,
	"ASTRAEA": WITHER_IMPACT,
	"SCYLLA": WITHER_IMPACT,
	"NECRON_BLADE": WITHER_IMPACT,
	
	
	
	
	
	
}

register("packetReceived", (packet, event) => {
	const soundName = packet.func_149212_c()
	switch(soundName) {
	case "mob.zombie.remedy":
	

	default:
	
	}
}).setFilteredClass(S29PacketSoundEffect)


const cdHudRender = register("renderOverlay", () => {
	let text = ""

	for (let key in cooldowns) {
		
		let time = cooldowns[key][0] / 20
		let totalCooldown = cooldowns[key][1]
		text += `&6${key}: ${getTimerColor(time, totalCooldown)}${time.toFixed(2)}\n`
		;
	}
		huds["cooldownhud"].instance.draw(text)
	if (Object.keys(cooldowns).length === 0) cdHudRender.unregister()
}).unregister()

function timer() {
	if (Object.keys(cooldowns).length > 0) {
	for (let key in cooldowns) {
		if (cooldowns[key][0] > 0) cooldowns[key][0]--
		else delete cooldowns[key]
	}
	} else Listener.removeListener(timer)
}

register("playerInteract", (action) => {
	if (!Settings().cooldownHud) return;
	const item = Player.getHeldItem()
	const lore = item?.getLore()
	const itemName = ChatLib?.removeFormatting(item?.getName())
	const itemID = getItemID(item)
		if (action.toString() !== "RIGHT_CLICK_EMPTY") return;
		if (data.cooldownHudBlacklist.includes(itemID)) return;
		
		const ability = getAbilityCooldown(lore, itemID)
		if (!ability) return;
		console.log(ability.length)
			addToQueue.apply(null, ability)
})

function addToQueue(key, value, sound = null) {
		if (Object.keys(cooldowns).length === 0) {
		cdHudRender.register()
		Listener.addListener(timer)
			}
			queuedCooldowns[key] = [parseInt(value) * 20, parseInt(value), sound]
}

function getAbilityCooldown(lore, itemID) {
    const abilityMatch = lore
        ?.map(l => ChatLib.removeFormatting(l).match(/Ability: (.*)  /))
        ?.find(m => m);

    const cooldownMatch = lore
        ?.map(l => ChatLib.removeFormatting(l).match(/Cooldown: (\d+)s/))
        ?.find(m => m);

    const item = hardcodedCDs[itemID] || [];
    const ability = abilityMatch ? abilityMatch[1] : item[0];
    const cooldown = cooldownMatch ? cooldownMatch[1] : item[1];

    if (!ability || !cooldown) return;
    if (cooldowns[ability]) return;

    return [ability, cooldown];
}




function getTimerColor(currentTime, totalCooldown) {
  const progress = currentTime / totalCooldown;

  if (progress < 0.25) return "&a"; // lime
  else if (progress < 0.5) return "&e"; // yellow
  else if (progress < 0.75) return "&c"; // red
  else return "&4"; // dark red
}
