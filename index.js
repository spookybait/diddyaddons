import Settings from "./config";

import "./features/dungeons/NoInteract"
import "./features/dungeons/PearlGFSBind"
//import "./features/dungeons/ArmorReminder"
import "./features/dungeons/SwapStonk"
import "./features/dungeons/BonzoStop"
import "./features/dungeons/EarlyEnterNotif"
import "./features/dungeons/StackSpots"
import "./features/dungeons/AutoGrabPot"
import "./features/kuudra/Crateprio.js"
import "./features/qol/QuickBackpackBind"
import "./features/qol/AutoGFSDraft"
import "./features/qol/ShadowFuryCD"
import "./features/misc/funnies"
//import "./features/misc/badplayeralert"
import "./features/dungeons/AutoRag"
//import "./features/dungeons/bloodaimbot"
import "./features/dungeons/FastLeap"
import "./features/misc/Simulation"
import "./features/misc/meowclientstuff"
import "./features/utils/Data"
import "./features/utils/PlayerUtils"

 register("command", () => {
   Settings().getConfig().openGui()

}).setName("diddy");


/*
STUFF TO DO





*/