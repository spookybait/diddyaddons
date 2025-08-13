import Settings from "../../config"
import { releaseMovementKeys, repressMovementKeys, getHeldItemID } from "../utils/Utils"

// i stole this from cgy

const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");
const jumpKey = Client.getMinecraft().field_71474_y.field_74314_A.func_151463_i()
const forwardKey = Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i()


register("playerInteract", (action) => {
    if (!Settings().bonzoStop) return
    if (action.toString() !== "RIGHT_CLICK_EMPTY") return
	if (!Player.asPlayerMP().isOnGround()) return
    if (Player.getPlayer().field_71075_bZ.func_75094_b() < 0.2) return // Return if speed is too low
    //if (!Player.isSprinting()) return // Return if you aren't sprinting because bonzo should work then because you're so slow
    if (Player.getPitch() < 0) return // Make sure you're looking down
       if (getHeldItemID() == "STARRED_BONZO_STAFF" || getHeldItemID() == "BONZO_STAFF") {
        const [x, y, z] = [Player.getMotionX(), Player.getMotionY(), Player.getMotionZ()]
        const veloSum = Math.sqrt(x * x + z * z) // Sum of velocity
        if (veloSum < 0.3 || !Keyboard.isKeyDown(forwardKey)) return
        releaseMovementKeys()
        jumpListener.register()
        Player.getPlayer().func_70016_h(x / 1.5, y, z / 1.5)

        Client.scheduleTask(0, repressMovementKeys)

        Client.scheduleTask(1, () => {
            jumpListener.unregister()
            // Player.getPlayer().func_70016_h(x, y, z)
      })
    }
})

const jumpListener = register(net.minecraftforge.fml.common.gameevent.InputEvent.KeyInputEvent, () => {
    if (!Keyboard.getEventKeyState()) return
    if (Keyboard.getEventKey() !== jumpKey) return

    KeyBinding.func_74510_a(jumpKey, false)
    Client.scheduleTask(0, () => KeyBinding.func_74510_a(jumpKey, true)) // Delay the keypress slightly in order to not lagback if you jump
}).unregister()