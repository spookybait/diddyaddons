import Settings from "../../config";

let name = Player.getName();

register("chat", () => {
if(!Settings().AutoGFSDraft) return;
ChatLib.command("gfs architect's first draft")
}).setCriteria("PUZZLE FAIL! " + name).setStart();


// &r&c&lPUZZLE FAIL!