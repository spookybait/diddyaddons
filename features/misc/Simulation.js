import Settings from "../../config"
import { releaseMovementKeys, repressMovementKeys, MouseEvent, C08PacketPlayerBlockPlacement, S08PacketPlayerPosLook } from "../utils/PlayerUtils"
import Vector3 from "../../../BloomCore/utils/Vector3"

const inSingleplayer = () => Client.getMinecraft().func_71356_B()

let active = false
let interactables = ["minecraft:lever", "minecraft:chest", "minecraft:trapped_chest"]
let active2 = false

register("tick", () => {
    if (!inSingleplayer()) return
    const { field_70159_w: motionX, field_70179_y: motionZ } = Player.getPlayer()
    const block = World.getBlockAt(Player.getX(), Player.getY(), Player.getZ()).type.getRegistryName()
	if (active) return;
    if (Settings().SingleplayerLavaBounce && Player.getPlayer().func_180799_ab()) {
		active = true
        ChatLib.chat(`&7Simulating Lava Bounce`)
        Client.scheduleTask(() => Player.getPlayer().func_70016_h(0, 3.44, 0))
		Client.scheduleTask(5, () => { active = false })
    } else if (Settings().SingleplayerSuperbounce && block == "minecraft:rail") {
		active = true
        ChatLib.chat(`&7Simulating Super Bounce`)
        Client.scheduleTask(() => Player.getPlayer().func_70016_h(0, 3.7, 0))
		Client.scheduleTask(5, () => { active = false })
    }
})
register("packetSent", (packet, event) => {
		if (!inSingleplayer()) return;
				if (active2) return;
				active2 = true
					Client.scheduleTask(1, () => { active2 = false })
				if (Player.getHeldItem()?.getName() == "Blaze Rod") {
					if (Settings().SingleplayerBonzo) {
						vectorBullshit(packet.func_179724_a(), packet.func_149573_h(), packet.func_149569_i(), packet.func_149575_j(), 1.5, 0.5, 4, true)
						ChatLib.chat("&7Simulating Bonzo");
				}} else if (Player.getHeldItem()?.getName() == "Gold Horse Armor") {
				if (Settings().SingleplayerJerrychine) {
						vectorBullshit(packet.func_179724_a(), packet.func_149573_h(), packet.func_149569_i(), packet.func_149575_j(), 0.5, 0.6, 2)
						ChatLib.chat("&7Simulating Jerry-chine");
				}}


}).setFilteredClass(C08PacketPlayerBlockPlacement)

function vectorBullshit(mcBlockPos, offset1, offset2, offset3, multiplier, height, delay, flatten) {
	let blockPos = new BlockPos(mcBlockPos);
	if (interactables.includes(World.getBlockAt(blockPos)?.type?.getRegistryName())) return;

	let blockVector = new Vector3(blockPos.x, blockPos.y, blockPos.z);
	let [xOffset, yOffset, zOffset] = [offset1, offset2, offset3];

	if (blockPos.x < 0) xOffset *= -1;
	if (blockPos.z < 0) zOffset *= -1;

	let blockVectorOffset = new Vector3(xOffset, yOffset, zOffset);
	let finalBlockVector = blockVector.add(blockVectorOffset);
	if (finalBlockVector.y == -1) return;

	Client.scheduleTask(delay, () => {
		let playerVector = new Vector3(Player.getX(), Player.getY() + 1.62, Player.getZ());
		let direction = playerVector.subtract(finalBlockVector);
		if (flatten) direction.y = 0;
		let finalVector = direction.normalize().multiply(multiplier);
	console.log(finalVector)
		if (Number.isNaN(finalVector.y)) {
			Player.getPlayer().func_70016_h(0, height, 0);
		} else {
			Player.getPlayer().func_70016_h(finalVector.x, height, finalVector.z);
		}
	});
}
