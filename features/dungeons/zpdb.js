import Settings from "../../config"
import { C07PacketPlayerDigging, getItemID, MCBlock, scheduleTask } from "../utils/Utils"

const unmineable = [7, 54, 69, 144, 146, 166, 397]

register("packetSent", (packet) => {
	if (!Settings().ZeroPingDungeonbreaker) return;
	const item = Player.getHeldItem()
	if (getItemID(item) !== "DUNGEONBREAKER") return;
	const action = packet.func_180762_c().toString();
    if (action !== "START_DESTROY_BLOCK") return;
	if (item.getDurability() <= 0) return;
	const pos = packet.func_179715_a()
	const x = pos.func_177958_n();
    const y = pos.func_177956_o();
    const z = pos.func_177952_p()
	//console.log(World.getBlockAt(x, y, z).type.getID())
	if (unmineable.includes(World.getBlockAt(x, y, z).type.getID())) return;
	World.getWorld().func_175698_g(pos) 
}).setFilteredClass(C07PacketPlayerDigging)




	/*
	const chargesLore = ChatLib.removeFormatting(item?.getLore().find(lore => lore.match(/\d+§7\/§e\d+/)))
	const charges = chargesLore.match(/\d+/)
	if (!charges) return;
	if (parseInt(charges) <= 0) return;
	console.log(parseInt(charges))
	*/