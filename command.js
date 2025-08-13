import Settings from "./config"
import { Prefix } from "./features/utils/Utils"
import { data } from "./features/utils/Data"

register("command", (arg1, arg2, arg3) => {
	switch(arg1) {
		default:
			Settings().getConfig().openGui()
		break;
		case "dev":
			switch(arg2) {
				case "lcmac":
					data.lcmac = !data.lcmac
					ChatLib.chat(`${Prefix}lcmac compatability = ${data.lcmac}`)
					data.save()
				break;
				default: 
					ChatLib.chat(`${Prefix}Dev Commands:`)
					ChatLib.chat(`${Prefix}/diddy dev lcmac: Toggles lcmac compatability`)
				break;
				
			}
		break;
		case "help":
		ChatLib.chat(`${Prefix}Commands:`)
		ChatLib.chat(`${Prefix}/diddy: Opens settings gui`)
		ChatLib.chat(`${Prefix}/diddy dev: Lists dev commands`)
		break;
		
		
		

	}
}).setName("diddy")