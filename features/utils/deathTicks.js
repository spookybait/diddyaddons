import { S32PacketConfirmTransaction, S03PacketTimeUpdate, S08PacketPlayerPosLook } from "./Utils";

export default new class deathTick {
    constructor() {
        this.ticks = -1;
        this.spawnPos = null;
		this.hudText = new Text("").setShadow(true).setAlign('CENTER')

        this.serverTick = register("packetReceived", () => {
            --this.ticks;
            if (this.ticks <= 0) this.ticks = 40;
        }).setFilteredClass(S32PacketConfirmTransaction).unregister();

        this.S08 = register('packetReceived', () => {

            this.S03 = register("packetReceived", (packet) => {
                const totalWorldTime = packet.func_149366_c();
                if (!totalWorldTime) return;

                this.ticks = 40 - (totalWorldTime % 40);
                this.serverTick.register();
                return;
            }).setFilteredClass(S03PacketTimeUpdate);

            this.S08.unregister();
            return;
        }).setFilteredClass(S08PacketPlayerPosLook);

        this.spawnPosition = register('packetReceived', (packet) => {
            const [px, py, pz] = [packet.func_148932_c(), packet.func_148928_d(), packet.func_148933_e()];
            if (py !== 75.5 && py !== 76.5) return;

            this.spawnPos = [px, py, pz];
            this.spawnPosition.unregister();
            return;
        }).setFilteredClass(S08PacketPlayerPosLook);

        this.worldChange = register("worldUnload", () => {
            this.ticks = -1;
            this.serverTick.register();
            this.S08.register();
            return;
        })

        this.chat = register("chat", (message) => {
            if (!message.includes("Sending to server")) return;
            this.ticks = -1;
            this.spawnPos = null;
            this.spawnPosition.register();
        }).setCriteria("${message}")
	/*
	register("renderOverlay", () => {
		this.hudText.setString(`${(this.ticks / 20).toFixed(2)}`)
		this.hudText.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 + 50)
})
*/
    }
}
