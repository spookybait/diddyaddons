import Settings from "../../config";

let currentAnswer = null

const numberMap = { "A": 0, "B": 1, "C": 2 }
const questions = {
            "Which of these is NOT a pet?":
            "Slime",

            "What type of mob is exclusive to the Fishing Festival?":
            "Shark",

            "Where is Trevor the Trapper found?":
            "Mushroom Desert",

            "Who helps you apply Rod Parts?":
            "Roddy",

            "Which type of Gemstone has the lowest Breaking Power?":
            "Ruby",

            "Which item rarity comes after Mythic?":
            "Divine",

            "How do you obtain the Dark Purple Dye?":
            "Dark Auction",

            "Who runs the Chocolate Factory?":
            "Hoppity",

            "How many floors are there in The Catacombs?":
            "7",

            "What is the first type of slayer Maddox offers?":
            "Zombie",

            "What item do you use to kill Pests?":
            "Vacuum",

            "Who owns the Gold Essence Shop?":
            "Marigold",
			
            "Which of these is NOT a type of Gemstone?":
            "Prismite",
			
            "What does Junker Joel collect?":
            "Junk",
			
			"Where is the Titanoboa found?":
			"Backwater Bayou",
}

register("chat", (message) => {
	if (!Settings().AutoSphinx) return;
	const fixedMessage = ChatLib.removeFormatting(message)
	getAnswer(fixedMessage)
}).setCriteria("${message}")

const chatTrigger = register("chat", (message) => {
	const fixedMessage = ChatLib.removeFormatting(message)
	if (!currentAnswer) return;
	clickAnswer(fixedMessage, currentAnswer)
	
	
}).setCriteria("${message}")

function getAnswer(message) {
	const answer = questions[message]
	if (!answer) return;
	currentAnswer = answer
}

function clickAnswer(message, answer) {
		const regex = new RegExp(`   ([A-C])\\) ${currentAnswer}`)
		if(!regex.test(message)) return;
		const commandNumber = numberMap[message.match(regex)[1]]
		ChatLib.command(`sphinxanswer ${commandNumber}`)
		currentAnswer = null
}

register("command", () => {
		const user = "   C) Ruby"
		currentAnswer = "Ruby"
		const regex = new RegExp(`   ([A-C])\\) ${currentAnswer}`)
		console.log(user.match(regex))  // ["C) Ruby", "C"]
		currentAnswer = null
}).setName("sphinxtest")