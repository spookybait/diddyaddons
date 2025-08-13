import Settings from "../../config"
import { playSound, getHeldItemID } from "../utils/Utils"


register("chat", () => {
	if (!Settings().MiningAbilityAlert) return;
	playSound("random.orb", 1, 0.5)
}).setCriteria("&r&a&r&6${pickaxeAbility} &r&ais now available!&r").setStart()