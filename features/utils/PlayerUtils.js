const mc = Client.getMinecraft()
const player = Player.getPlayer();
export const Prefix = "&8[&3Diddy&8] ";

export const S2FPacketSetSlot = Java.type("net.minecraft.network.play.server.S2FPacketSetSlot")
export const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")
export const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow")
export const C01PacketChatMessage = Java.type("net.minecraft.network.play.client.C01PacketChatMessage")
export const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
export const S13PacketDestroyEntities = Java.type("net.minecraft.network.play.server.S13PacketDestroyEntities");
export const C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
export const C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");
export const S32PacketConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")
export const S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook")
export const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent")

export function leftClick() {
    const leftClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147116_af", null)
    leftClickMethod.setAccessible(true);
    leftClickMethod.invoke(Client.getMinecraft(), null)
    
}
export function rightClick() {
    const rightClickMethod = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag", null)
    rightClickMethod.setAccessible(true);
    rightClickMethod.invoke(Client.getMinecraft(), null);

}

export function SetSlot(index) {
    Player.setHeldItemIndex(index);
}

export const swapToItem = (targetItemName) => {
    const itemSlot = Player?.getInventory()?.getItems()?.findIndex(item => { return item?.getName()?.toLowerCase()?.includes(targetItemName.toLowerCase()) })
    if (itemSlot === -1 || itemSlot > 7) {
        ChatLib.chat(`Unable to find "${targetItemName}" in your hotbar`)
        return
    } else {heldItem = Player.getHeldItemIndex() 
        if (heldItem == itemSlot) return;
        Player.setHeldItemIndex(itemSlot)
    }
}

export const swapToItemID = (targetItemID) => {
    const itemSlot = Player?.getInventory()?.getItems()?.findIndex(item => { if (item?.getID() == targetItemID) return item?.getID() })
    if (itemSlot === -1 || itemSlot > 7) {
        ChatLib.chat(`Unable to find "${targetItemID}" in your hotbar`)
        return
    } else { heldItem = Player.getHeldItemIndex() 
        if(heldItem == itemSlot) return;
        Player.setHeldItemIndex(itemSlot)
    }
}

export function snapTo(yaw, pitch) {
    if (Math.abs(pitch) > 90) return

    const player = Player.getPlayer(); 
    player.field_70177_z = yaw
    player.field_70125_A = pitch;
}

export function isPlayerInBox(x1, y1, z1, x2, y2, z2) {
    const x = Player.getX();
    const y = Player.getY();
    const z = Player.getZ();

    return (x >= Math.min(x1, x2) && x <= Math.max(x1, x2) &&
            y >= Math.min(y1, y2) && y <= Math.max(y1, y2) &&
            z >= Math.min(z1, z2) && z <= Math.max(z1, z2));
}

export function getNameByClass(playerClass) {
    let index = TabList?.getNames()?.findIndex(line => line?.toLowerCase()?.includes(playerClass?.toLowerCase()));
    if (index == -1) return;
    
    let match = TabList?.getNames()[index]?.removeFormatting().match(/(?:\[\d+\]\s*)?(.+?) \((.+?)\)/);
    if (!match) return "EMPTY";
    
    return removeUnicode(match[1]).trim(); 
}

export function getHeldItemID() {
    const item = Player.getHeldItem();
    const itemId = item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id");
    return itemId;
}

export function getItemID(item) {
    const itemId = item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id");
    return itemId;
}

export const sendWindowClick = (windowId, slot, clickType, actionNumber=0) => Client.sendPacket(new C0EPacketClickWindow(windowId ?? Player.getContainer().getWindowId(), slot, clickType ?? 0, 0, null, actionNumber))
export const removeUnicode = (string) => typeof(string) !== "string" ? "" : string.replace(/[^\u0000-\u007F]/g, "")


export const UseItemKey = Client.getMinecraft().field_71474_y.field_74313_G

const KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding");

const movementKeys = [
    Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(),
    Client.getMinecraft().field_71474_y.field_74370_x.func_151463_i(),
    Client.getMinecraft().field_71474_y.field_74366_z.func_151463_i(),
    Client.getMinecraft().field_71474_y.field_74368_y.func_151463_i()
]
export const releaseMovementKeys = () => movementKeys.forEach(keybind => KeyBinding.func_74510_a(keybind, false))
export const repressMovementKeys = () => movementKeys.forEach(keybind => KeyBinding.func_74510_a(keybind, Keyboard.isKeyDown(keybind)))

export function getPlayerYaw() {
	return Player.getYaw();
}

export function getPlayerPitch() {
	return Player.getPitch();
}

export function rotateSmoothly(yaw, pitch, time) {
	isRotating = true
    // Normalize yaw and pitch to the range -180 to 180
    while (yaw > 180) yaw -= 360;
    while (yaw < -180) yaw += 360;
    while (pitch >= 180) pitch -= 360;
    while (pitch < -180) pitch += 360;

    const initialYaw = getPlayerYaw();
    const initialPitch = getPlayerPitch();
    const initialTime = Date.now();
    
    // Calculate shortest angular difference between initialYaw and target yaw
    let yawDifference = yaw - initialYaw;
    if (yawDifference > 180) yawDifference -= 360;
    if (yawDifference < -180) yawDifference += 360;

    const trigger = register("step", () => {
        const progress = time <= 0 ? 1 : Math.max(Math.min((Date.now() - initialTime) / time, 1), 0);
        const amount = bezier(progress, 0, 1, 1, 1);

        // Rotate smoothly, adjusting yaw and pitch
        rotate(initialYaw + yawDifference * amount, initialPitch + (pitch - initialPitch) * amount);
        if (progress >= 1) { 
		trigger.unregister();
		 isRotating = false }  
    });
}

function rotate(yaw, pitch) {
	if (Number.isNaN(yaw) || Number.isNaN(pitch)) return;
	const player = Player.getPlayer();
	player.field_70177_z = yaw;
	player.field_70125_A = pitch;
}

export function getYawPitch(x, y, z) {
	const difference = new Vector3(x, y, z).subtract(new Vector3(...getPlayerEyeCoords()));
	return [difference.getYaw(), difference.getPitch()];
}

export function getEyePos() {
    return {
        x: Player.getX(),
        y: Player.getY() + Player.getPlayer().func_70047_e(),
        z: Player.getZ()
    };
}

export function calcYawPitch(blcPos, plrPos) {
    if (!plrPos) plrPos = getEyePos();
    let d = {
        x: blcPos.x - plrPos.x,
        y: blcPos.y - plrPos.y,
        z: blcPos.z - plrPos.z
    };
    let yaw = 0;
    let pitch = 0;
    if (d.x != 0) {
        if (d.x < 0) { yaw = 1.5 * Math.PI; } else { yaw = 0.5 * Math.PI; }
        yaw = yaw - Math.atan(d.z / d.x);
    } else if (d.z < 0) { yaw = Math.PI; }
    d.xz = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.z, 2));
    pitch = -Math.atan(d.y / d.xz);
    yaw = -yaw * 180 / Math.PI;
    pitch = pitch * 180 / Math.PI;
    if (pitch < -90 || pitch > 90 || isNaN(yaw) || isNaN(pitch)) return;

    return [yaw, pitch]
   
}


function bezier(t, initial, p1, p2, final) {
	return (1 - t) * (1 - t) * (1 - t) * initial + 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t * final;
}


// mc.field_71474_y.field_74312_F.func_151463_i()