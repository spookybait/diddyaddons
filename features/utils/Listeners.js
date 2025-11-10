import { S32PacketConfirmTransaction, Prefix } from "./Utils"
// thanks sashimi

global.soshimee ??= {};
global.soshimee.events ??= {};
global.soshimee.events.tick ??= {};

const listeners = global.soshimee.events.tick.listeners ??= [];

const listenersByClass = new Map();

const trigger = register("packetReceived", packet => {
    try {
        if (!packet) return;
        const packetClass = packet.getClass().getName();

        const listeners = listenersByClass.get(packetClass);
        if (!listeners) return;

        // Special case for S32PacketConfirmTransaction
        if (packetClass === "net.minecraft.network.play.server.S32PacketConfirmTransaction") {
            if (packet.func_148890_d() >= 0) return;
        }

 
        for (const listener of [...listeners]) {
            listener(packet);
        }
    } catch (e) {
        console.log("Packet processing error:", e);
    }
}).unregister();

export function addListener(listener, packetClass = "net.minecraft.network.play.server.S32PacketConfirmTransaction") {
    if (!packetClass) return;

    if (!listenersByClass.has(packetClass)) {
        listenersByClass.set(packetClass, []);
    }

    const list = listenersByClass.get(packetClass);
    list.push(listener);

    trigger.register();
}

export function removeListener(listener, packetClass = "net.minecraft.network.play.server.S32PacketConfirmTransaction") {
    const list = listenersByClass.get(packetClass);
    if (!list) return false;

    const index = list.indexOf(listener);
    if (index === -1) return false;

    list.splice(index, 1);

    if (list.length === 0) {
        listenersByClass.delete(packetClass);
        if (listenersByClass.size === 0) {
            trigger.unregister();
        }
    }

    return true;
}

// packetClass needs to be a string because fuck you
export function schedule(packets, callback, timeoutTicks = null, packetClass = "net.minecraft.network.play.server.S32PacketConfirmTransaction", timeoutCallback = null) {
    let completed = false;

    const onPacket = () => {
        if (completed) return;
        --packets;
        if (packets <= 0) {
            completed = true;
            removeListener(onPacket, packetClass);
            if (timeoutTrigger) timeoutTrigger.unregister();
            callback();
        }
    };

    let timeoutTrigger = null;

    if (typeof timeoutTicks === "number" && timeoutTicks > 0) {
        timeoutTrigger = register("tick", () => {
            if (completed) return;
            --timeoutTicks;
            if (timeoutTicks <= 0) {
                completed = true;
                removeListener(onPacket, packetClass);
                timeoutTrigger.unregister();
                if (typeof timeoutCallback === "function") {
                    timeoutCallback();
                } else ChatLib.chat(`${Prefix}Timeout triggered`)
            }
        });
    }

    addListener(onPacket, packetClass);
}

export function simulatePacket(packetType, count, ping = 1) {
	packet = packetType
	setTimeout( () => {
	for (i = 0; i < count; i++) {
	    try {
        if (!packet) return;
        const className = packet

        const listeners = listenersByClass.get(className);
        if (!listeners) return;
		
        for (const listener of [...listeners]) {
            listener(packet);
        }
    } catch (e) {
        console.log("Packet processing error:", e);
    }
	}}, ping)
}

export default { addListener, removeListener, schedule, simulatePacket };