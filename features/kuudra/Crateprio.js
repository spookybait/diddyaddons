import Settings from "../../config"
import { data } from "../utils/Data"

const missingHud = new Gui()
const COLOR = '&d&l'
const base = '&d'

let missing = ""
let pre = undefined
let hudText = new Text("").setShadow(true).setAlign('CENTER')




// Finding what pre
register("chat", () => {
  const x = Player.getX()
  const y = Player.getY()
  const z = Player.getZ()
  if(Settings().crateprio) {
    if (z > -100){
      if(x > -90){
        pre = 'EQUALS';
      }
      if(x < -90){
        pre = 'SLASH';
      }
    }
    if ( z < -100){
      if ( x > -90){
        pre = 'TRI';
      }
      if ( x < -90){
        pre = 'X';
      }
        
    }
    ChatLib.chat(`&c PRE = ${ pre }`)
    Client.showTitle(`${COLOR}PRE = ${pre}`, "", 0, 40, 0,)
	missingCrateTrigger.register()
  }
}).setCriteria("[NPC] Elle: Head over to the main platform, I will join you when I get a bite!")

// Finding what is missing and notify
const missingCrateTrigger = register("chat", (player, crate) => {
  if(Settings().crateprio) {
      missing = crate
      // Shop Missing
	  switch (missing.toLowerCase()) {
		 default:
		 ChatLib.chat("someone probably has like a weird no pre message so u got it on your own surely") 
		 break;
		case "shop":
        if (pre == 'TRI'){
          Client.showTitle(`${COLOR}GO X Cannon`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
        }
        if (pre == 'X'){
          Client.showTitle(`${COLOR}GO X Cannon`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
        }
        if (pre == 'EQUALS'){
          Client.showTitle(`${COLOR}GO SQUARE`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SQUARE`)
        }
        if (pre == 'SLASH'){
          Client.showTitle(`${COLOR}GO SQUARE`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SQUARE`)
        }
		break;
      // Tri Missing
		case "triangle": 
        if (pre == 'TRI'){
			if(Settings().pro) {
		  Client.showTitle(`${COLOR}PULL SQUARE AND X CANNON`, `${base}Next: GRAB SHOP`, 0, 80, 0,)
          ChatLib.chat(`${COLOR}PULL SQUARE AND X CANNON \n${COLOR}NEXT: GRAB SHOP`)
			} else {
          Client.showTitle(`${COLOR}PULL SQUARE`, `${base}Next: GRAB SHOP`, 0, 80, 0,)
          ChatLib.chat(`${COLOR}PULL SQUARE \n${COLOR}NEXT: GRAB SHOP`)
			}
        }
        if (pre == 'X'){
          Client.showTitle(`${COLOR}GO X CANNON`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
        }
        if (pre == 'EQUALS'){
			if(Settings().pro) {
		  Client.showTitle(`${COLOR}GO SHOP`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SHOP`)
			} else {
          Client.showTitle(`${COLOR}GO X CANNON`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
			}
        }
        if (pre == 'SLASH'){
          Client.showTitle(`${COLOR}GO SQUARE`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SQUARE`)
        }
		break;
      //Equals Missing
		case "equals":
        if (pre == 'TRI'){
			if(Settings().pro) {
		  Client.showTitle(`${COLOR}GO SHOP`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SHOP`)
			} else {
          Client.showTitle(`${COLOR}GO X CANNON`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
			}
		}
        if (pre == 'X'){
          Client.showTitle(`${COLOR}GO X CANNON`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
        }
        if (pre == 'EQUALS'){
			if(Settings().pro) {
		  Client.showTitle(`${COLOR}PULL SQUARE AND X CANNON`, `${base}Next: GRAB SHOP`, 0, 80, 0,)
          ChatLib.chat(`${COLOR}PULL SQUARE AND X CANNON \n${COLOR}NEXT: GRAB SHOP`)
			} else {
          Client.showTitle(`${COLOR}PULL SQUARE`, `${base}Next: GRAB SHOP`, 0, 80, 0,)
          ChatLib.chat(`${COLOR}PULL SQUARE \n${COLOR}NEXT: GRAB SHOP`)
			}
        }
        if (pre == 'SLASH'){
          Client.showTitle(`${COLOR}GO SQUARE`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SQUARE`)
        }
		break;
      // Slash Missing
      case "slash":
        if (pre == 'TRI'){
          Client.showTitle(`${COLOR}GO SQUARE`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SQUARE`)
        }
        if (pre == 'X'){
          Client.showTitle(`${COLOR}GO X CANNON`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
        }
        if (pre == 'EQUALS'){
		  Client.showTitle(`${COLOR}GO SHOP`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SHOP`)
			} else {
          Client.showTitle(`${COLOR}GO X CANNON`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
			}
        
        if (pre == 'SLASH'){
			if(Settings().pro) {
		  Client.showTitle(`${COLOR}PULL SQUARE AND X CANNON`, `${base}Next: GRAB SHOP`, 0, 80, 0,)
          ChatLib.chat(`${COLOR}PULL SQUARE AND X CANNON \n${COLOR}NEXT: GRAB SHOP`)
			} else {
          Client.showTitle(`${COLOR}PULL SQUARE`, `${base}Next: GRAB SHOP`, 0, 80, 0,)
          ChatLib.chat(`${COLOR}PULL SQUARE \n${COLOR}NEXT: GRAB SHOP`)
			}
        }
		break;
      // Square Missing
      case "square":
        if (pre == 'TRI'){
          Client.showTitle(`${COLOR}GO SHOP`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SHOP`)
        }
        if (pre == 'X'){
          Client.showTitle(`${COLOR}GO X CANNON`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
        }
        if (pre == 'EQUALS'){
          Client.showTitle(`${COLOR}GO SHOP`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SHOP`)
        }
        if (pre == 'SLASH'){
          Client.showTitle(`${COLOR}GO X CANNON`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
        }
		break;
      // X Cannon Missing
		case "x cannon":
		case "xcannon":
        if (pre == 'TRI'){
          Client.showTitle(`${COLOR}GO SHOP`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SHOP`)
        }
        if (pre == 'X'){
          Client.showTitle(`${COLOR}GO SQUARE`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SQUARE`)
        }
        if (pre == 'EQUALS'){
          Client.showTitle(`${COLOR}GO SHOP`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SHOP`)
        }
        if (pre =='SLASH'){
          Client.showTitle(`${COLOR}GO SQUARE`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SQUARE`)
        }
		break;
      // X Missing
      case "x":
        if (pre == 'TRI'){
          Client.showTitle(`${COLOR}GO X CANNON`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
        }
        if (pre == 'X'){
			if(Settings().pro) {
		  Client.showTitle(`${COLOR}PULL SQUARE AND X CANNON`, `${base}Next: GRAB SHOP`, 0, 80, 0,)
          ChatLib.chat(`${COLOR}PULL SQUARE AND X CANNON \n${COLOR}NEXT: GRAB SHOP`)
			} else {
          Client.showTitle(`${COLOR}PULL SQUARE`, `${base}Next: GRAB SHOP`, 0, 80, 0,)
          ChatLib.chat(`${COLOR}PULL SQUARE \n${COLOR}NEXT: GRAB SHOP`)
			}
	    }
        if (pre == 'EQUALS'){
			if(Settings().pro) {
		  Client.showTitle(`${COLOR}GO SHOP`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SHOP`)
			} else {
          Client.showTitle(`${COLOR}X CANNON`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO X CANNON`)
			}
		}
        if (pre == 'SLASH'){
          Client.showTitle(`${COLOR}GO SQUARE`, "", 0, 60, 0,)
          ChatLib.chat(`${COLOR}GO SQUARE`)
        }
		break;
    }
	  ChatLib.chat(`&c MISSING = ${ missing }`)
	  if (Settings().MissingCrateHud) {
		  missingHudRender.register()
	  }
  }
}).setCriteria('Party > ${player}: No ${crate}!').unregister()

const missingHudRender = register("renderOverlay", () => {
	hudText.setScale(data.hudTextCoords.scale)
	hudText.setString(`&cMissing: &b${missing}&r`)
	hudText.draw(data.hudTextCoords.x, data.hudTextCoords.y)
}).unregister()

register("worldLoad", () => {
	missingHudRender.unregister()
	missingCrateTrigger.unregister()
})

const editHudTrigger = register("renderOverlay", () => {
	    hudText.setScale(data.hudTextCoords.scale)
        hudText.setString(`&cMissing: &bbackshots?&r`)
        hudText.draw(data.hudTextCoords.x, data.hudTextCoords.y)
}).unregister()

const dragTrigger = register("dragged", (dx, dy, x, y, bn) => {
	if (bn == 2) return
	data.hudTextCoords.x = x
	data.hudTextCoords.y = y
	data.save()
}).unregister()

const scrollTrigger = register("scrolled", (x, y, dir) => {
	if (dir == 1) data.hudTextCoords.scale += 0.05
	else data.hudTextCoords.scale -= 0.05
	data.save()
}).unregister()

const guiClosedTrigger = register("guiClosed", () => {
	editHudTrigger.unregister()
	dragTrigger.unregister()
	scrollTrigger.unregister()
	guiClosedTrigger.unregister()
}).unregister()

function enableMissingHudEdit() {
	editHudTrigger.register()
	dragTrigger.register()
	scrollTrigger.register()
	missingHud.open()
	setTimeout( () => { guiClosedTrigger.register() }, 50)
}

register("command", () => {
	enableMissingHudEdit()
}).setName("editmissinghud")