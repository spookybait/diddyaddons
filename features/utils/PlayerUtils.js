export const mc = Client.getMinecraft()
export const player = Player.getPlayer();
export const Prefix = "&7[&6Diddy&7] ";


export const C01PacketChatMessage = Java.type("net.minecraft.network.play.client.C01PacketChatMessage")
export const C03PacketPlayer = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
export const C04PacketPlayerPosition = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C04PacketPlayerPosition")
export const C05PacketPlayerLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C05PacketPlayerLook")
export const C06PacketPlayerPosLook = Java.type("net.minecraft.network.play.client.C03PacketPlayer$C06PacketPlayerPosLook")
export const C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");
export const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement")
export const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange")
export const C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");
export const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow")
export const S08PacketPlayerPosLook = Java.type("net.minecraft.network.play.server.S08PacketPlayerPosLook");
export const S0FPacketSpawnMob = Java.type("net.minecraft.network.play.server.S0FPacketSpawnMob");
export const S13PacketDestroyEntities = Java.type("net.minecraft.network.play.server.S13PacketDestroyEntities");
export const S19PacketEntityStatus = Java.type("net.minecraft.network.play.server.S19PacketEntityStatus")
export const S1CPacketEntityMetadata = Java.type("net.minecraft.network.play.server.S1CPacketEntityMetadata")
export const S32PacketConfirmTransaction = Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")
export const S2FPacketSetSlot = Java.type("net.minecraft.network.play.server.S2FPacketSetSlot")
export const S2DPacketOpenWindow = Java.type("net.minecraft.network.play.server.S2DPacketOpenWindow")

export const MouseEvent = Java.type("net.minecraftforge.client.event.MouseEvent")

export const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
export const MCBlockPos = Java.type("net.minecraft.util.BlockPos");
export const EnumFacing = Java.type("net.minecraft.util.EnumFacing");

const Mouse = Java.type("org.lwjgl.input.Mouse")


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

export const swapToItemSbID = (targetItemSbID, backup) => {
    const itemSlot = Player?.getInventory()?.getItems()?.findIndex(item => { if (item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id") == targetItemSbID) return item?.getNBT()?.get("tag")?.get("ExtraAttributes")?.getString("id")})
    if (itemSlot === -1 || itemSlot > 7) {
		if (backup) swapToItemSbID(backup)
			else ChatLib.chat(`Unable to find "${targetItemSbID}" in your hotbar`)
        return
    } else { heldItem = Player.getHeldItemIndex() 
        if(heldItem == itemSlot) return;
        Player.setHeldItemIndex(itemSlot)
    }
}

export function snapTo(yaw, pitch) {
	if (Number.isNaN(yaw) || Number.isNaN(pitch)) return;
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

export function getDistance2D(x1, z1, x2, z2) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    return Math.sqrt(dx * dx + dz * dz);
}

export function getDistance3D(x1, y1, z1, x2, y2, z2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function getNameByClass(playerClass) {
    let index = TabList?.getNames()?.findIndex(line => line?.toLowerCase()?.includes(playerClass?.toLowerCase()));
    if (index == -1) return;
    
    let match = TabList?.getNames()[index]?.removeFormatting().match(/(?:\[\d+\]\s*)?(.+?) \((.+?)\)/);
    if (!match) return "EMPTY";
    
    return removeUnicode(match[1]).trim(); 
}

export function getClass() {
    let index = TabList?.getNames()?.findIndex(line => line?.includes(Player.getName()))
    if (index == -1) return
    let match = TabList?.getNames()[index]?.removeFormatting().match(/.+ \((.+) .+\)/)
    if (!match) return "EMPTY"
    return match[1];
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
    mc.field_71474_y.field_74351_w.func_151463_i(),
    mc.field_71474_y.field_74370_x.func_151463_i(),
    mc.field_71474_y.field_74366_z.func_151463_i(),
    mc.field_71474_y.field_74368_y.func_151463_i()
]

const rightClickKey = mc.field_71474_y.field_74313_G
const rightClickKeycode = rightClickKey.func_151463_i()

export function releaseRightClick() {
	if (rightClickKey.func_151470_d()) {
		KeyBinding.func_74510_a(rightClickKeycode, false)
	}
}
export function pressRightClick() {
	if (!rightClickKey.func_151470_d()) {
		KeyBinding.func_74510_a(rightClickKeycode, true)
	}
}

export const releaseMovementKeys = () => movementKeys.forEach(keybind => KeyBinding.func_74510_a(keybind, false))
export const repressMovementKeys = () => movementKeys.forEach(keybind => KeyBinding.func_74510_a(keybind, Keyboard.isKeyDown(keybind)))


// mc.field_71474_y.field_74312_F.func_151463_i()