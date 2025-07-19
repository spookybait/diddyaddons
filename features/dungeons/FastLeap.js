import Settings from "../../config";
import leapHelper from "../utils/leapUtils"
import leapUtils from "../utils/leapUtils"
import { isPlayerInBox, rightClick, MouseEvent, getHeldItemID, getNameByClass, removeUnicode, Prefix } from "../utils/PlayerUtils";

let lastOpener

register("chat", (player, event) => {
    lastOpener = player
}).setCriteria(/^(\w+) opened a WITHER door!$/)




function getLeap() {
    let leapString = "";

    if (Settings().DoorOpener) {
        leapString = lastOpener;
    }
// this might be the worst way to do this but i do not give a fuck
    if (Settings().PositionalFastLeap) {
        if (isPlayerInBox(113, 160, 48, 89, 100, 122)) {
            let leapClass = getNameByClass(Settings().S1Leap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().S1Leap : leapClass;
        } else if (isPlayerInBox(91, 160, 145, 19, 100, 121)) {
            let leapClass = getNameByClass(Settings().S2Leap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().S2Leap : leapClass;
        } else if (isPlayerInBox(-6, 160, 123, 19, 100, 50)) {
            let leapClass = getNameByClass(Settings().S3Leap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().S3Leap : leapClass;
        } else if (isPlayerInBox(17, 160, 27, 90, 100, 50)) {
            let leapClass = getNameByClass(Settings().S4Leap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().S4Leap : leapClass;
		} else if (isPlayerInBox(36, 162, 54, 60, 190, 29)) {
            let leapClass = getNameByClass(Settings().GreenPillarLeap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().GreenPillarLeap : leapClass;
        } else if (isPlayerInBox(36, 162, 54, 60, 190, 76)) {
            let leapClass = getNameByClass(Settings().YellowPillarLeap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().YellowPillarLeap : leapClass;
 		} else if (isPlayerInBox(42, 162, 23, 21, 190, 0)) {
            let leapClass = getNameByClass(Settings().GreenPadLeap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().GreenPadLeap : leapClass;
        } else if (isPlayerInBox(45, 162, 81, 21, 190, 106)) {
            let leapClass = getNameByClass(Settings().YellowPadLeap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().YellowPadLeap : leapClass;
        } else if (isPlayerInBox(103, 244, 75, 43, 218, 31)) {
            let leapClass = getNameByClass(Settings().P1Leap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().P1Leap : leapClass;
        } else if (isPlayerInBox(105, 99, 25, 7, 54, 124)) {
            let leapClass = getNameByClass(Settings().P4Leap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().P4Leap : leapClass;
        } else if (isPlayerInBox(105, 25, 25, 7, 0, 150)) {
            let leapClass = getNameByClass(Settings().P5Leap);
            leapString = (leapClass === -1 || leapClass === "EMPTY") ? Settings().P5Leap : leapClass;
        }
    }

    return leapString;
}


register(MouseEvent, (event) => {

        
    const button = event.button
    const state = event.buttonstate

    if (!state) return
	if (getHeldItemID() !== "INFINITE_SPIRIT_LEAP") return;
    if (button === 1) {
    leapHelper.clearQueue()
	} else if (button === 0) {
	cancel(event)

    rightClick()

    let leapTo = getLeap()
    if (!leapTo || !leapTo.length) return;

    leapHelper.queueLeap(leapTo)
	}
})

let hasMelody = false
let melodyIGN = ""
const isNearPlate = () => Player.getY() == 127 && Player.getX() >= 62 && Player.getX() <= 65 && Player.getZ() >= 34 && Player.getZ() <= 37;

register("chat", (player, a, event) => {
    if (!Settings().Pre4ToggleLeap) return;
    if (!isNearPlate()) return;
    
    const rawMessage = ChatLib.getChatMessage(event);
    if (!rawMessage) return;
    
    const message = rawMessage.removeFormatting();
    if (message.includes("1/4") || message.includes("25%")) {
        hasMelody = true;
        melodyIGN = removeUnicode(player).trim();
    }

}).setCriteria(/\bParty\b .* (\w+): (.*)/)

register("worldLoad", () => {
    hasMelody = false
    melodyIGN = ""
})

register("chat", (player, message) => {
    if (!Settings().Pre4ToggleLeap) return;
    if (player !== Player.getName()) return;
    if (!isNearPlate()) return;

    let Pre4IGNLeap = Settings().Pre4IGNLeap; 
    let leapClass = getNameByClass(Pre4IGNLeap);
    let leapString = (leapClass === -1 || leapClass === "EMPTY") ? Pre4IGNLeap : leapClass; 

    if (hasMelody && Settings().Pre4LeapMelody) {
        leapString = melodyIGN
        hasMelody = false
        melodyIGN = ""
    }

    ChatLib.chat(Prefix + "&aDevice Complete");
    leapUtils.autoLeap(leapString);
}).setCriteria(/(\w+) completed a device! \((.*?)\)/);

