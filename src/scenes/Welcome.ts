import { GameSounds } from "../utilities/GameSounds";
import Phaser from "phaser";
import { StartSceneActionScript } from "@phaserjs/editor-scripts-core";
import { OnEventScript } from "@phaserjs/editor-scripts-core";
import { ExecActionScript } from "@phaserjs/editor-scripts-core";
import { OnPointerDownScript } from "@phaserjs/editor-scripts-core";
import { PushActionScript } from "@phaserjs/editor-scripts-simple-animations";
import { CallbackActionScript } from "@phaserjs/editor-scripts-core";
import SwitchImageActionScript from "../script-nodes/ui/SwitchImageActionScript";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
import { StorageManager } from "../utilities/StorageManager";
import { Library } from "../throwdown/Library";
import { log } from "../utilities/GameUtils";
import Credits from "../prefabs/Credits";

export default class Welcome extends Phaser.Scene {

	private musicBtn?: Phaser.GameObjects.Image;
	private soundBtn?: Phaser.GameObjects.Image;

	constructor() {
		super("Welcome");
	}

	editorCreate(): void {
		const logo = this.add.image(1000, 360, "logo");
		const playBtn = this.add.image(1000, 680, "start-button");
		this.musicBtn = this.add.image(1720, 960, "music2-on");
		this.soundBtn = this.add.image(1840, 960, "sound2-on");
		const creditsBtn = this.add.image(100, 960, "view-credits");

		const floatingObjectScript = new FloatingObjectScript(logo);
		floatingObjectScript.offset = 5;

		const onPointerDownScript = new OnPointerDownScript(playBtn);
		const pushActionScript_2 = new PushActionScript(onPointerDownScript);
		const startGameAction = new StartSceneActionScript(pushActionScript_2);

		const onKeydown_SPACE = new OnEventScript(this);
		const startGame_2 = new ExecActionScript(onKeydown_SPACE);
		const onKeydown_ENTER = new OnEventScript(this);
		const startGame_1 = new ExecActionScript(onKeydown_ENTER);

		onKeydown_SPACE.eventName = "keydown-SPACE";
		onKeydown_SPACE.eventEmitter = "scene.input.keyboard";
		startGame_2.targetAction = startGameAction;
		onKeydown_ENTER.eventName = "keydown-ENTER";
		onKeydown_ENTER.eventEmitter = "scene.input.keyboard";
		startGameAction.sceneKey = "Game";
		startGame_1.targetAction = startGameAction;

		const onPointerDownScript_3 = new OnPointerDownScript(this.musicBtn);
		const toggleMusicAction = new CallbackActionScript(onPointerDownScript_3);
		const pushActionScript_1 = new PushActionScript(onPointerDownScript_3);
		const musicSwitchImageAction = new SwitchImageActionScript(pushActionScript_1);

		const onPointerDownScript_2 = new OnPointerDownScript(this.soundBtn);
		const toggleEffectsAction = new CallbackActionScript(onPointerDownScript_2);
		const pushActionScript_3 = new PushActionScript(onPointerDownScript_2);
		const soundSwitchImageAction = new SwitchImageActionScript(pushActionScript_3);

		const onPointerDownScript_4 = new OnPointerDownScript(creditsBtn);
		const pushActionScript_4 = new PushActionScript(onPointerDownScript_4);
		const creditsSwitchImageAction = new SwitchImageActionScript(pushActionScript_4);

		musicSwitchImageAction.onTexture = {"key":"music2-on","frame":"music2-on.png"};
		musicSwitchImageAction.offTexture = {"key":"music2-off","frame":"music2-off.png"};
		musicSwitchImageAction.isOn = GameSounds.musicShouldBePlaying;
		musicSwitchImageAction.mementoKey = "music";

		soundSwitchImageAction.onTexture = {"key":"sound2-on","frame":"sound2-on.png"};
		soundSwitchImageAction.offTexture = {"key":"sound2-off","frame":"sound2-off.png"};
		soundSwitchImageAction.isOn = GameSounds.effectsEnabled;
		soundSwitchImageAction.mementoKey = "effects";

		creditsSwitchImageAction.onTexture = {"key":"view-credits","frame":"view-credits"};
		creditsSwitchImageAction.offTexture = {"key":"view-credits","frame":"view-credits"};
		creditsSwitchImageAction.isOn = true;
		creditsSwitchImageAction.mementoKey = "view-credits";

		toggleMusicAction.callback = () => GameSounds.toggleMusic();
		toggleEffectsAction.callback = () => GameSounds.toggleEffects();

		this.events.emit("scene-awake");

		this.setButtonInteractive(playBtn);
		this.setButtonInteractive(this.musicBtn);
		this.setButtonInteractive(this.soundBtn);
		this.setButtonInteractive(creditsBtn);

		creditsBtn.on('pointerdown', this.showCredits, this);

		const hardResetText = this.add.text(1710, 850, "hard reset", {
            fontFamily: '"Press Start 2P"',
            fontSize: '14px',
            color: '#ffffff'
        }).setInteractive({ useHandCursor: true });

        hardResetText.on('pointerdown', this.showHardResetPopup, this);

		if (Library.getTrophyTypes().length > 0) {
			const trophiesBtn = this.add.image(1000, 800, "trophies").setInteractive({ useHandCursor: true });
			trophiesBtn.on('pointerdown', this.showTrophies, this);
		}
	}

	private setButtonInteractive(button: Phaser.GameObjects.Image) {
		button.setInteractive({ useHandCursor: true })
			.on('pointerover', () => {
				this.input.setDefaultCursor('pointer');
			})
			.on('pointerout', () => {
				this.input.setDefaultCursor('default');
			});
	}

	async create() {
		await GameSounds.init(this);
		this.editorCreate();
	}

	private showCredits() {
		this.add.existing(new Credits(this));
	}

	private showHardResetPopup() {
		const blockInput = this.add.rectangle(960, 540, 1920, 1080, 0x000000, 0.5).setInteractive();
        const popup = this.add.container(960, 540);
    
        const background = this.add.rectangle(0, 0, 400, 200, 0x000000, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, 0x00ffff);
    
        const questionText = this.add.text(0, -60, "Are you sure?", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ffffff',
        }).setOrigin(0.5, 0.5);
    
        const yesButton = this.add.text(-80, 40, "Yes", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
    
        const noButton = this.add.text(80, 40, "No", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ff0000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
    
        yesButton.on('pointerdown', async () => {
            await StorageManager.clearAllData();
			this.scene.start("Preload");
            popup.destroy();
			blockInput.destroy();
        });
    
        noButton.on('pointerdown', () => {
            popup.destroy();
			blockInput.destroy();
        });
    
        popup.add([background, questionText, yesButton, noButton]);
    }

	private showTrophies() {
		const blockInput = this.add.rectangle(960, 540, 1920, 1080, 0x000000, 0.5).setInteractive();
		const popup = this.add.container(960, 540);
	
		const background = this.add.rectangle(0, 0, 900, 700, 0x000000, 0.8).setOrigin(0.5, 0.5);
		background.setStrokeStyle(4, 0x00ffff);
	
		const titleText = this.add.text(0, -320, "Trophies", {
			fontFamily: '"Press Start 2P"',
			fontSize: '24px',
			color: '#ffffff',
			align: 'center'
		}).setOrigin(0.5, 0.5);
	
		log("library trophy types");
		const trophies = Library.getTrophyTypes();
		log(trophies.toString());
		const sortedTrophies = trophies.slice().sort((a, b) => a.getName().localeCompare(b.getName()));
		log(sortedTrophies.toString());
	
		const maxPopupHeight = 700;
		const titleHeight = 40; 
		const closeButtonHeight = 40;
		const availableHeight = maxPopupHeight - titleHeight - closeButtonHeight - 60;
		const lineHeight = 30;
		const maxLines = Math.floor(availableHeight / lineHeight);
		
		//adjust font size if number of trophies is too long
		let fontSize = '18px';
		if (sortedTrophies.length > maxLines * 2) {
			fontSize = `${Math.floor((availableHeight / (sortedTrophies.length / 2)) * 0.6)}px`;
		}
	
		let yPos = -260;
		let leftColumn = true;
		const columnOffset = 400;
	
		sortedTrophies.forEach((trophy, index) => {
			log(`trophy: ${trophy.getName()}`);
			const xPos = leftColumn ? -columnOffset : 0;
			const trophyText = this.add.text(xPos, yPos, `${trophy.getName()}`, {
				fontFamily: '"Press Start 2P"',
				fontSize: fontSize,
				color: '#00ffff',
				wordWrap: { width: 380, useAdvancedWrap: true }
			}).setOrigin(0, 0);
			popup.add(trophyText);
			yPos += parseInt(fontSize) + 5;
	
			if (index === Math.floor(sortedTrophies.length / 2) - 1) {
				yPos = -260;
				leftColumn = false;
			}
		});
	
		const closeButton = this.add.text(0, 320, "Close", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#ff00ff',
			padding: { x: 10, y: 5 }
		}).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
	
		closeButton.on('pointerdown', () => {
			popup.destroy();
			blockInput.destroy();
		});
	
		closeButton.on('pointerover', () => {
			this.input.setDefaultCursor('pointer');
		});
	
		closeButton.on('pointerout', () => {
			this.input.setDefaultCursor('default');
		});
	
		popup.add([background, titleText, closeButton]);
		popup.sendToBack(background);
	}
}
