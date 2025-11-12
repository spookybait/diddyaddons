// Make sure these go to the right directory 
import Settings from "../Amaterasu/core/Settings";
import DefaultConfig from "../Amaterasu/core/DefaultConfig";
const config = new DefaultConfig("diddyaddons", "data/settings.json")

config
.addSwitch({
    category: "Dungeons",
    configName: "ZeroPingDungeonbreaker",
    title: "Zero Ping Dungeonbreaker",
    description: "stupid dumbshit fuck you hypixel",
    subcategory: "General"
})
.addSwitch({
    category: "Dungeons",
    configName: "NoInteractPearl",
    title: "Cancel Pearl Interact",
    description: "Cancels interactions on all blocks while holding Ender Pearls. This allows them to be thrown while looking at blocks which Hypixel normally prevents.",
    subcategory: "General"
})
.addSwitch({
    category: "Dungeons",
    configName: "NoInteractAbility",
    title: "Cancel Ability Interact",
    description: "Cancels interactions on specific blocks while holding certain items with abilites. Currently only cancels using hoppers and fence gates while holding an AOTV.",
    subcategory: "General"
})
/*
.addSwitch({
    category: "Dungeons",
    configName: "ArmorReminder",
    title: "Armor Reminder",
    description: "Reminds you to change armor after dungeon run, Use /updatearmor while wearing the armor set you want to be reminded to swap to.",
    subcategory: "General"
})
*/
/*
.addSwitch({
    category: "Dungeons",
    configName: "SwapStonk",
    title: "Swap Stonk Bind",
    description: "Peforms a Swap Stonk with a single key press, Change slider below to configure how many ticks the mod will wait to swap back to your original item. Change bind in controls",
    subcategory: "General"
})
.addSlider({
    configName: "SwapStonkTicks",
    title: "Ticks to swap back",
    description: "backshots?",
    category: "Dungeons",
    subcategory: "General",
    options: [1, 5],
    value: 1,
    shouldShow: settings => {
	return settings.SwapStonk
    },
})
*/
.addSwitch({
    category: "Dungeons",
    configName: "PearlGFSBind",
    title: "Pearl GFS Bind",
    description: "Gets exact number of pearls missing from stack, Change bind in controls.",
    subcategory: "General"
})
.addSwitch({
    category: "Dungeons",
    configName: "AutoGFSDraft",
    title: "Auto Grab Draft",
    description: "Auto grab architect's first draft when failing a puzzle.",
    subcategory: "General"
})
.addSwitch({
    category: "Dungeons",
    configName: "AutoRag",
    title: "Auto Ragnarock Axe",
    description: "Automatically uses ragnarock axe at certain times.",
    subcategory: "General"
})
.addSwitch({
    category: "Dungeons",
    configName: "AutoBloodCamp",
    title: "Auto Blood Camp",
    description: "Automatically aims at blood mobs and kills them.",
    subcategory: "General"
})
.addSwitch({
    category: "Dungeons",
    configName: "AutoBloodCampRotations",
    title: "Client Side",
    description: "Shows rotations on your client",
    subcategory: "General",
	shouldShow: settings => {
	return settings.AutoBloodCamp
	},
}).addSwitch({
    category: "Dungeons",
    configName: "AutoFireFreeze",
    title: "Auto Fire Freeze",
    description: "Automatically casts fire freeze at the right time in the M3 boss.",
    subcategory: "M3"
})
/*
.addSwitch({
    category: "Dungeons",
    configName: "AutoBloodRush",
    title: "Auto Blood Rush",
    description: "Teleports you to blood room upon dungeon start. Stand still at dungeon start so it doesnt break.",
    subcategory: "General"
})
.addSlider({
    category: "Dungeons",
    configName: "AutoBRDeathTicks",
    title: "Tick Delay",
    description: "Threshold for death ticks. If you keep dying to the death barrier increase this setting.",
    subcategory: "General",
	options: [1, 40],
    value: 20,
    shouldShow: settings => {
	return settings.AutoBloodRush
    },
})
.addSlider({
    category: "Dungeons",
    configName: "AutoBRPearls",
    title: "Pearls to throw",
    description: "How many extra pearls to throw when clipping up into blood",
    subcategory: "General",
	options: [1, 3],
    value: 2,
    shouldShow: settings => {
	return settings.AutoBloodRush
    },
})
.addSwitch({
    category: "Dungeons",
    configName: "AutoBloodRushPing",
    title: "High Ping",
    description: "Makes pearling into blood work on high ping, Use this if you are 100+ ping",
    subcategory: "General",
	shouldShow: settings => {
	return settings.AutoBloodRush
    },
})
.addSwitch({
    category: "Dungeons",
    configName: "AutoGrabPot",
    title: "Auto Grab Pot (does not work)",
    description: "Automatically opens potion bag and grabs a pot at the start of every run",
    subcategory: "General"
})
.addTextInput({
	category: "Dungeons",
	configName: "AutoGrabPotFloors",
	title: "Valid Floors",
	description: "Define what floors you want Auto Grab Pot to work on, Should be written like: M7,M6,F7",
	subcategory: "General",
	value: "M7",
    placeHolder: "M7,M6,F7",
	shouldShow: settings => {
	return settings.AutoGrabPot
	},
})

.addSwitch({
    category: "Dungeons",
    configName: "BadPlayerAlert",
    title: "Party Finder Alert",
    description: "Alerts you when someone you have added to the list joins your party.",
    subcategory: "Party Finder",
})
.addSwitch({
    category: "Dungeons",
    configName: "bonzoStop",
    title: "Bonzo Stop",
    description: "Stops movement after clicking with bonzo staff for a short period",
    subcategory: "P3"
})
*/
.addSwitch({
    category: "Fast Leap",
    configName: "FastLeap",
    title: "Fast Leap",
    description: "Left click to leap",
    subcategory: "Fast Leap"
})
.addSwitch({
    category: "Fast Leap",
    configName: "DoorOpener",
    title: "Last Door",
    description: "Fast leap to last door opener",
    subcategory: "Fast Leap"
})
.addSwitch({
    category: "Fast Leap",
    configName: "PositionalFastLeap",
    title: "Custom Fast Leap",
    description: "Customizable Fast Leap",
    subcategory: "Fast Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "ClearLeap",
    title: "Clear Leap",
    description: "Leap to this player in Clear (Turn off leap to last door opener)",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "P1Leap",
    title: "P1 Leap",
    description: "Leap to this player in P1",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "GreenPadLeap",
    title: "Green Pad Leap",
    description: "Leap to this player when at Green Pad",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "YellowPadLeap",
    title: "Yellow Pad Leap",
    description: "Leap to this player when at Yellow Pad",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "GreenPillarLeap",
    title: "Green Pillar Leap",
    description: "Leap to this player when at Green Pillar",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "YellowPillarLeap",
    title: "Yellow Pillar Leap",
    description: "Leap to this player when at Yellow Pillar",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "P4Leap",
    title: "P4 Leap",
    description: "Leap to this player in P4",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "P5Leap",
    title: "P5 Leap",
    description: "Leap to this player in P5",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "S1Leap",
    title: "S1 Leap",
    description: "Leap to this player in S1",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "S2Leap",
    title: "S2 Leap",
    description: "Leap to this player in S2",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "S3Leap",
    title: "S3 Leap",
    description: "Leap to this player in S3",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addTextInput({
    category: "Fast Leap",
    configName: "S4Leap",
    title: "S4 Leap",
    description: "Leap to this player in S4",
    value: "",
    placeHolder: "",
    subcategory: "Leap"
})
.addSwitch({
    category: "Fast Leap",
    configName: "Pre4ToggleLeap",
    title: "Pre4 Auto Leap",
    description: "Toggle",
    subcategory: "I4"
})
.addTextInput({
    category: "Fast Leap",
    configName: "Pre4IGNLeap",
    title: "Pre4 Auto Leap",
    description: "Leap to IGN / Class",
    value: "",
    placeHolder: "",
    subcategory: "I4"
})
.addSwitch({
    category: "Fast Leap",
    configName: "Pre4LeapMelody",
    title: "Auto Leap to Melody",
    description: "Toggle",
    subcategory: "I4"
})
.addSwitch({
    category: "Singleplayer",
    configName: "SingleplayerLavaBounce",
    title: "Lava Bounce",
    description: "Simulates Lava Bounce in singleplayer",
    subcategory: "Simulation"
})
.addSwitch({
    category: "Singleplayer",
    configName: "SingleplayerSuperbounce",
    title: "Super Bounce",
    description: "Simulates Super Bounce in singleplayer",
    subcategory: "Simulation"
})
.addSwitch({
    category: "Singleplayer",
    configName: "SingleplayerBonzo",
    title: "Bonzo Staff",
    description: "Simulates Bonzo Staff in singleplayer",
    subcategory: "Simulation"
})
.addSwitch({
    category: "Singleplayer",
    configName: "SingleplayerJerrychine",
    title: "Jerry-chine",
    description: "Simulates Jerry-chine in singleplayer",
    subcategory: "Simulation"
})
.addSwitch({
    category: "Singleplayer",
    configName: "SingleplayerTerminals",
    title: "Terminals",
    description: "Opens a terminal when you click on a command block in singleplayer, Requires Odin",
    subcategory: "Simulation"
})
.addSwitch({
    category: "Singleplayer",
    configName: "SimonSays",
    title: "Simon Says",
    description: "Simulates First device in P3 (only works with an f7 world download rn sorry)",
    subcategory: "Simulation"
})
.addSwitch({
    category: "Singleplayer",
    configName: "ssSkip",
    title: "Simon Says Skip",
    description: "Turn on for SS Skip",
    subcategory: "Simulation",
		shouldShow: settings => {
	return settings.SimonSays
	},
})
.addSwitch({
    category: "Singleplayer",
    configName: "CreativeEnderPearls",
    title: "Creative Ender Pearls",
    description: "Allows you to throw Ender Pearls in creative mode and attempts to simulate Hypixel Ender Pearls",
    subcategory: "Simulation"
})
.addSwitch({
    category: "Dungeons",
    configName: "EarlyEnterNotif",
    title: "Early Enter Notifications",
    description: "Displays a title when someone is at an early enter spot.",
    subcategory: "P3"
})
.addSwitch({
    category: "Dungeons",
    configName: "StackSpots",
    title: "Stack Spots",
    description: "Shows stack spots in p5",
    subcategory: "P5"
})
/*
.addSwitch({
    category: "Dungeons",
    configName: "LBMacro",
    title: "Last Breath Macro",
    description: "Automatically releases Last Breath after a certain amount of client/server ticks. Left click to fire",
    subcategory: "P5"
})
.addSlider({
    category: "Dungeons",
    configName: "LBTicks",
    title: "Ticks",
    description: "How many ticks to wait to release.",
    subcategory: "P5",
	options: [5, 20],
    value: 8,
    shouldShow: settings => {
	return settings.LBMacro
    },
})
.addDropDown({
    configName: "LBTickType",
    title: "Tick Type",
    description: "Whether to use client or server ticks",
    category: "Dungeons",
    subcategory: "P5",
    options: ["Client", "Server"],
    value: 0,
	shouldShow: settings => {
	return settings.LBMacro
    },
})
.addSwitch({
    category: "Dungeons",
    configName: "AutoDebuff",
    title: "Auto Debuff Swap",
    description: "Auto swaps to Ice Spray and then Soul Whip/Flaming Flay upon a dragon spawning.",
    subcategory: "P5"
})
*/
.addSwitch({
    category: "QoL",
    configName: "QuickBackpackBind",
    title: "Quick Backpack Bind",
    description: "Quickly editable backpack bind, Change backpack with /bpset (number) and change bind in controls.",
    subcategory: "General"
})
.addSwitch({
    category: "QoL",
    configName: "sfcd",
    title: "Shadow Fury Cooldown Display",
    description: "Shows Shadow Fury cooldown, change location with /diddy edit sfcdhud",
    subcategory: "General"
})
/*
.addSwitch({
    category: "QoL",
    configName: "cooldownHud",
    title: "Global Cooldown Display",
    description: "Shows all cooldowns, change location with /diddy edit cooldownhud",
    subcategory: "General"
})
*/
.addSwitch({
    category: "QoL",
    configName: "NoHitDelay",
    title: "No Hit Delay",
    description: "Removes the hit delay when not clicking on an entity",
    subcategory: "General"
})
.addSwitch({
    category: "QoL",
    configName: "MiningAbilityAlert",
    title: "Mining Ability Alert",
    description: "Plays a sound when your pickaxe ability comes off cooldown",
    subcategory: "General"
})
.addSwitch({
    category: "QoL",
    configName: "AutoFeroSwap",
    title: "Auto Ferocity Swap",
    description: "Swaps to Daedalus blade when ferocity procs from huntaxe to get Gdrag MF",
    subcategory: "Diana"
})
.addSwitch({
    category: "QoL",
    configName: "AutoSphinx",
    title: "Auto Sphinx Answer",
    description: "Automatically answers sphinx questions",
    subcategory: "Diana"
})
.addSwitch({
    category: "Kuudra",
    configName: "crateprio",
    title: "Crate Priority",
    description: "Says what to do if a crate doesnt spawn, requires a no pre message from all members",
    subcategory: "Supplies"
})
.addSwitch({
    category: "Kuudra",
    configName: "pro",
    title: "Pro mode",
    description: "Select if the player whose crate is missing also drags in x cannon",
    subcategory: "Supplies",
    shouldShow: settings => {
	return settings.crateprio
    },
})
.addSwitch({
    category: "Kuudra",
    configName: "MissingCrateHud",
    title: "Missing Crate HUD",
    description: "Shows the missing supply crate on screen, Change location and scale with /diddy edit missinghud",
    subcategory: "Supplies"
})

const setting = new Settings("diddyaddons", config, "data/scheme-nwjn.json") // make sure to set your command with [.setCommand("commandname")]


export default () => setting.settings
