import { data } from "../utils/Data";
import { C01PacketChatMessage, C0APacketAnimation, Prefix } from "../utils/Utils"
let cooldown = true
let timeout = false

const isInCreativeMode = 'func_78758_h'
const setGameType = 'func_78746_a'
const playerController = 'field_71442_b'
const mc = Client.getMinecraft()
const controller = mc[playerController]
const generateRandomString = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

register("command", () => {
	data.funny = !data.funny;
	ChatLib.chat("funny: " + data.funny);
	data.save();
	if (data.funny) ChatLib.chat("§r§9Party §8> §b[MVP§3+§b] SpookyBait§f: §rdiddyaddons SAVED me 5 seconds in THAT room!!!§r");
	
}).setName("funny")

register("packetSent", (packet, event) => {
	if (!data.fuckyouodin) return;
	const message = packet.func_149439_c()
	if (message == "/odingetpingcommand-----") cancel(event)
}).setFilteredClass(C01PacketChatMessage)

register("playerInteract", (action, player, event) => {
        if (!data.funny) return;
        let item = Player.getHeldItem();
        let itemId = item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id");
        if (itemId != "ICE_SPRAY_WAND" || !cooldown|| action.toString() !== "RIGHT_CLICK_EMPTY")  return
cooldown = false
setTimeout(() => cooldown = true, 5000)
ChatLib.say("Oops! I got my ice spray all over you! :3")
})

register("command", () => {
  new Thread(() => {
    const [x, y, z] = [~~Player.getX(), ~~Player.getY(), ~~Player.getZ()]
    ChatLib.say(`x: ${x}, y: ${y}, z: ${z} ` + generateRandomString())
    Thread.sleep(600)
    ChatLib.say(`x: ${x + 2}, y: ${y}, z: ${z} ` + generateRandomString())
    Thread.sleep(600)
    ChatLib.say(`x: ${x + 1}, y: ${y + 1}, z: ${z} ` + generateRandomString())
    Thread.sleep(600)
    ChatLib.say(`x: ${x + 1}, y: ${y + 2}, z: ${z} ` + generateRandomString())
    Thread.sleep(600)
  }).start()
}).setName('rocket2', true);

register("packetSent", (packet, event) => {
  if (packet.func_149439_c() == "/pc {diddyaddons-270scoremessage}") {
	  cancel(event)
	  let crypts = "Placeholder"
	  ChatLib.command(`pc [Skyblocker] We are at ${crypts} of 5 Crypts `)
  }
}).setFilteredClass(C01PacketChatMessage)



/*
register("command", () => {
	if (!timeout) {
	timeout = true
	ChatLib.chat("Run this command again to set gamemode to creative in limbo, DO NOT RUN AGAIN IF YOU ARENT IN LIMBO")
	setTimeout( () => { timeout = false }, 5000)
	} else if (
    !Scoreboard.getTitle()
    && World.getAllEntities().length == 1
    && World.getBlockAt(-26, 36, 28).toString() == 'Block{type=minecraft:brown_mushroom_block, x=-26, y=36, z=28}'
  ) {
	  console.log("test")
	  ChatLib.chat("Set gamemode to creative!")
	controller[setGameType](WorldSettings.GameType.CREATIVE) 
  }
}).setName("limbocreativemode")
*/

