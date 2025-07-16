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

const showTitle = (name, msg) => {
    const formattedMsg = formatMessage(msg);

    if (formattedMsg !== "") {
        let titleStyle = Settings.titleStyle === 0 ? "Pre Enter" : "Early Enter";  // Adjusted to match selector options order
        currentTitle.title = `&e${name} is At ${titleStyle} ${formattedMsg}`;
        if (msg.includes("!")) {
            currentTitle.title += "!!";
        } else {
            currentTitle.title += "!";
        }
        currentTitle.time = 2500;
        started = Date.now();
        World.playSound("random.orb", 3, 0.5);
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
