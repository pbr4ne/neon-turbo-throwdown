import Phaser from "phaser";
import PreloadBarUpdaterScript from "../script-nodes/ui/PreloadBarUpdaterScript";
import assetPackUrl from "../../static/assets/asset-pack.json";
import WebFont from 'webfontloader';
import { checkUrlParam, log } from "../utilities/GameUtils";
import { StorageManager } from "../utilities/StorageManager";
import { DialogueStorage } from "../dialogue/DialogueStorage";
import { CoachList } from "../throwdown/CoachList";
import { CardFactory } from "../cards/CardFactory";
import { Library } from "../throwdown/Library";
import { TrophyFactory } from "../trophies/TrophyFactory";
import { CardKeys } from "../cards/CardKeys";
import { OutstandingTrophyList } from "../trophies/OutstandingTrophyList";

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");
	}

	editorCreate(): void {
		const loadingText = this.add.text(831.5, 509, "Turbocharging...", {
			color: "#ff00ff",
			fontFamily: '"Courier New", monospace',
			fontSize: "25px",
			strokeThickness: 2,
			stroke: "#ff00ff"
		});
	
		const textWidth = loadingText.width;
	
		const progressBarBg = this.add.rectangle(832.5, 541, textWidth, 20);
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 0x000000;
		progressBarBg.isStroked = true;
		progressBarBg.strokeColor = 0x000000;
	
		const progressBar = this.add.rectangle(832.5, 541, textWidth, 20);
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 0xff00ff;
	
		new PreloadBarUpdaterScript(progressBar);
	
		this.events.emit("scene-awake");
	}

	async preload() {

		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        WebFont.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                this.editorCreate();
            }
        }); 

		this.load.pack("asset-pack", assetPackUrl);

		CardFactory.registerCardTypes();
		TrophyFactory.registerTrophyTypes();

		//if (checkUrlParam("enableSaveLoad", "true")) {
			await StorageManager.initializeDB();
			await StorageManager.loadTrophyTypes();
			await StorageManager.loadRunCount();	
			await DialogueStorage.loadDialogues();
		//}

		new DialogueStorage();
        CoachList.setupCoachDecks();

		//if (checkUrlParam("enableSaveLoad", "true")) {
			await StorageManager.loadBaseDeck();
		//}

		if (checkUrlParam("mode", "easy")) {
			Library.setEasyMode(true);
		}

		if (checkUrlParam("idleMode", "true")) {
			Library.setIdleMode(true);
		}

		//set your base cards to the 'pure' deck for this permrun
		//CoachList.you.setBaseCards(Library.getPureDeck());
		Library.setPureDeck(CoachList.you.getBaseCards());
		//log every trophy in outstandingtrophylist
		log("Outstanding Trophies Before: " + OutstandingTrophyList.getTrophyTypes().map(t => t.getKey()).join(", "));
		OutstandingTrophyList.removeTrophies(Library.getTrophyTypes());
		log("Outstanding Trophies After: " + OutstandingTrophyList.getTrophyTypes().map(t => t.getKey()).join(", "));

		//all unlocks
		if (checkUrlParam("allTrophiesUnlocked", "true")) {
			Library.setTrophyTypes(TrophyFactory.getAllTrophyTypes());
			CoachList.you.setBaseCards([
				CardFactory.createCardType(CardKeys.THROW_6),
				CardFactory.createCardType(CardKeys.THROW_6),
				CardFactory.createCardType(CardKeys.THROW_6),
				CardFactory.createCardType(CardKeys.THROW_6),
				CardFactory.createCardType(CardKeys.THROW_6),
				CardFactory.createCardType(CardKeys.EVADE_4),
				CardFactory.createCardType(CardKeys.EVADE_4),
				CardFactory.createCardType(CardKeys.BLOCK_5),
				CardFactory.createCardType(CardKeys.BLOCK_5),
				CardFactory.createCardType(CardKeys.CATCH_3),
			]);
		}

		log("PRELOAD COMPLETE");
	}

	create() {
		this.loadFonts(() => {
			if (checkUrlParam("skipWelcome", "true")) {
				this.scene.start("Game");
			} else {
				this.scene.start("Welcome");
			}
		});
	}

	private loadFonts(callback: () => void) {
		WebFont.load({
			google: {
				families: ['Press Start 2P']
			},
			active: callback,
			inactive: () => {
				console.error('Failed to load fonts');
				callback();
			}
		});
	}
}
