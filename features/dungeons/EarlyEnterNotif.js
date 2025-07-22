import Settings from "../../config";

let inp3 = false;
const currentTitle = { title: null, time: null };
let started = null;

register("chat", () => inp3 = true).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?");
register("chat", () => inp3 = false).setCriteria("The Core entrance is opening!");

const _drawTitle = (title) => {
    const screenWidth = Renderer.screen.getWidth();
    const screenHeight = Renderer.screen.getHeight();
    const scale = 2.5;
    const titleWidth = Renderer.getStringWidth(title) * scale;
    const x = (screenWidth - titleWidth) / 2 / scale;
    const y = (screenHeight / 2 / scale) - 20;

    Renderer.scale(scale);
    Renderer.drawStringWithShadow(title, x, y);
    Renderer.scale(1 / scale);
};

function formatMessage(msg) {
    const lowerCaseMsg = msg.toLowerCase();

    if (lowerCaseMsg.match(/\b(early enter|pre enter|ee|pre|early entry) 2\b/i) || lowerCaseMsg.includes("at ee2")) {
        return "2";
    } else if (lowerCaseMsg.match(/\b(early enter|pre enter|ee|pre|early entry) 3\b/i) || lowerCaseMsg.includes("at ee3")) {
        return "3";
    } else if (lowerCaseMsg.match(/\b(early enter|pre enter|ee|pre|early entry) 4\b/i) || lowerCaseMsg.includes("at ee4") || lowerCaseMsg.includes("at core")) {
        return "4";
    }

    return "";
}

function formatMessagetest(msg) {
    const lowerCaseMsg = msg.toLowerCase();

    let regex = /\b(early enter|pre enter|ee|pre|early entry) *([234])\b/i
	let matches = regex.exec(lowerCaseMsg)
	if (lowerCaseMsg.includes("at core")) return "4";
	if (!matches) return "";
	console.log(matches[2])

    return matches[2];
}

register("command", (msg) => {
	console.log(formatMessagetest(msg))
}).setName("eetest")

const showTitle = (name, msg) => {
    const formattedMsg = formatMessagetest(msg);
	console.log(formattedMsg)
    if (formattedMsg !== "") {
		if (formattedMsg == "4") currentTitle.title = `&e${name} is At Core`;
        else currentTitle.title = `&e${name} is At Early Enter ${formattedMsg}`;
        
        currentTitle.time = 2500;
        started = Date.now();
		  	try {
        new net.minecraft.network.play.server.S29PacketSoundEffect("random.orb", Player.getX(), Player.getY(), Player.getZ(), 2, 0.5).func_148833_a(Client.getConnection())
			} catch (e) { 
				console.log(e)
    }
	}
};

register("chat", (rank, name, msg) => {
    if (!Settings().EarlyEnterNotif || !inp3) return;

    showTitle(name, msg);
}).setCriteria(/Party > (\[.+\])? ?(.+): (.+)/);

register("renderOverlay", () => {
    if (!currentTitle.time || !currentTitle.title) return;

    const elapsed = Date.now() - started;
    const remainingTime = currentTitle.time - elapsed;

    if (remainingTime <= 0) {
        currentTitle.title = null;
        currentTitle.time = null;
        return;
    }

    _drawTitle(currentTitle.title);
});
