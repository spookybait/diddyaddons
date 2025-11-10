import Settings from "./config"
import { Prefix } from "./features/utils/Utils"
import { data } from "./features/utils/Data"
import hudElement from "./features/utils/hudelement"
import command from "./features/events/diddycommand"
/*
export const cooldownHud = new hudElement(data.cooldownHudCoords)
export const sfcdHud = new hudElement(data.sfcdHudCoords)
export const missingHud = new hudElement(data.hudTextCoords)
*/
export const huds = { 
		"cooldownhud": { instance: new hudElement(data.cooldownHudCoords), defaultText: `&6Wither Impact: &45.00\n&6Ice Spray: &e1.67\n&6Infinileap: &a0.61` },
		"sfcdhud": { instance: new hudElement(data.sfcdHudCoords), defaultText: `&6Shadow Fury:&a READY!&r` },
		"missinghud": { instance: new hudElement(data.hudTextCoords), defaultText: `&cMissing: &bbackshots?&r` }
		}

const lcmacFunctions = `
export function enable() {
	autoClicking = true
	clicker()
}
export function disable() {
	autoClicking = false
}`


command.addListener(undefined, () => Settings().getConfig().openGui());

command.addListener("dev", (...args) => {
	if (args[0] === "odinping") {
				data.fuckyouodin = !data.fuckyouodin
				ChatLib.chat(`${Prefix}Block odin ping command = ${data.fuckyouodin}`)
				data.save()
				return;
	} 
	if (args[0] === "lcmac") {
		if (args[1] === "push") {
			if (FileLib.exists("lcmac", "metadata.json")) {
				FileLib.append("lcmac", "index.js", lcmacFunctions)
				data.lcmacFixed = true
				data.save()
				return;
			}} 
			else {
			data.lcmac = !data.lcmac
			ChatLib.chat(`${Prefix}lcmac compatability = ${data.lcmac}`)
			data.save()
			return;
		}}
			ChatLib.chat(`${Prefix}Dev Commands:`)
			ChatLib.chat(`${Prefix}/diddy dev lcmac: Toggles lcmac compatability`)
			ChatLib.chat(`${Prefix}/diddy dev lcmac push: Only run this once, appends some function to lcmac so i can toggle the autoclicker`)
			ChatLib.chat(`${Prefix}/diddy dev odinping: Toggles blocking Odin's get ping command`)
		
		})
		
command.addListener("edit", (arg) => {
	try {
			const hud = huds[arg.toLowerCase()]
			hud.instance.edit(hud.defaultText)
		} catch (e) {
			ChatLib.chat(`${Prefix}Not a valid hud element!`)
		}
})

command.addListener("help", () => {
		ChatLib.chat(`${Prefix}Commands:`)
		ChatLib.chat(`${Prefix}/diddy: Opens settings gui`)
		ChatLib.chat(`${Prefix}/diddy dev: Lists dev commands`)
		ChatLib.chat(`${Prefix}/diddy edit (hudName): Opens the edit gui for the specified hud.`)
})
/*
register("command", (arg1, arg2, arg3) => {
	switch(arg1) {
		default:
			Settings().getConfig().openGui()
		break;
		case "dev":
			switch(arg2) {
				case "lcmac":
					switch(arg3) {
						case "push":
						if (FileLib.exists("lcmac", "metadata.json")) {
							FileLib.append("lcmac", "index.js", lcmacFunctions)
							data.lcmacFixed = true
							data.save()
							}
						default:
						data.lcmac = !data.lcmac
						ChatLib.chat(`${Prefix}lcmac compatability = ${data.lcmac}`)
						data.save()
						break;
						}
					case "odinping":
					data.fuckyouodin = !data.fuckyouodin
					ChatLib.chat(`${Prefix}Block odin ping command = ${data.fuckyouodin}`)
					data.save()
					break;
				default: 
					ChatLib.chat(`${Prefix}Dev Commands:`)
					ChatLib.chat(`${Prefix}/diddy dev lcmac: Toggles lcmac compatability`)
					ChatLib.chat(`${Prefix}/diddy dev lcmac push: Only run this once, appends some function to lcmac so i can toggle the autoclicker`)
					ChatLib.chat(`${Prefix}/diddy dev odinping: Toggles blocking Odin's get ping command`)
				break;
				
			}
		break;
		case "edit":
		try {
			const hud = huds[arg2.toLowerCase()]
			hud.instance.edit(hud.defaultText)
		} catch (e) {
			ChatLib.chat(`${Prefix}Not a valid hud element!`)
		}
		break;
		case "help":
		ChatLib.chat(`${Prefix}Commands:`)
		ChatLib.chat(`${Prefix}/diddy: Opens settings gui`)
		ChatLib.chat(`${Prefix}/diddy dev: Lists dev commands`)
		ChatLib.chat(`${Prefix}/diddy edit (hudName): Opens the edit gui for the specified hud.`)
		break;
		
		
		

	}
}).setName("diddy")
*/
