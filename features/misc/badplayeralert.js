import Settings from "../../config"
import { data } from "../utils/data"

register("chat", (rank, name) => {
if(!Settings().BadPlayerAlert || data.badplayers.includes(name.toLowerCase())) return;
setTimeout( () => {ChatLib.chat(new TextComponent("&aClick to add &c&l" + name + " &r&ato the list.").setClick("run_command", "/badplayeralert " + name))}, 1);
}).setCriteria(/^(\[.+\]|)\s*(\w*)\shas been removed from the party\./)

register("command", (user) => {
if(data.badplayers.includes(user.toLowerCase())) {
ChatLib.chat("&a" + user + " is already on the list!")
return;
}
data.badplayers.push(user.toLowerCase())
ChatLib.chat(new TextComponent("&aAdded " + user + " to the list.").setClick("run_command", "/badplayeralertremove " + user));
data.save();
}).setName("badplayeralert")

register("command", (user) => {
let removed = data.badplayers.splice(data.badplayers.indexOf(user.toLowerCase()), 1)
if(removed == "") {
ChatLib.chat("&c" + user + " is not on the list!")
return;
}
ChatLib.chat("&aRemoved " + removed + " from the list.")
data.save();
}).setName("badplayeralertremove")

register("chat", (name) => {
if(!Settings().BadPlayerAlert) return;
if(data.badplayers.includes(name.toLowerCase())) {
setTimeout( () => {ChatLib.chat(new TextComponent("&c&l" + name + " &r&ais on the list! Click this message to kick them.").setClick("suggest_command", "/p kick " + name))}, 1);
World.playSound("random.orb", 1, 0.5);
}
}).setCriteria(/^Party Finder >\s(\w*).*/)
// [MVP+] OofieMunchkin has been removed from the party.
