import { data } from "../utils/Data";
import Settings from "../../config";

let pieces = [null, null, null, null];

register("chat", (player, event) => {
if (!Settings().ArmorReminder) return;
checkArmor();
console.log(data.armorset, pieces)
if (data.armorset != pieces.toString()) {
Client.showTitle("§cCHANGE ARMOR!!!!", "", 0, 100, 0);
}
}).setCriteria("&r&eentered &r&aThe Catacombs&r&e,").setContains();

register("command", () => {
	checkArmor();
	data.armorset = pieces.toString();
	ChatLib.chat("Updated armor!")
	data.save();
}).setName("updatearmor")


function checkArmor() {
    pieces[0] = Player.armor.getHelmet().getName();
    pieces[1] = Player.armor.getChestplate().getName();
    pieces[2] = Player.armor.getLeggings().getName();
    pieces[3] = Player.armor.getBoots().getName();
}

// &r&b[MVP&r&3+&r&b] SpookyBait&r&f &r&eentered &r&aThe Catacombs&r&e, &r&eEntrance&r&e!