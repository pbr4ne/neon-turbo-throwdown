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

export default class Welcome extends Phaser.Scene {

	constructor() {
		super("Welcome");
	}

	editorCreate(): void {
		const logo = this.add.image(1000, 360, "logo");
		const playBtn = this.add.image(1000, 680, "start-button");
		const musicBtn = this.add.image(1720, 960, "music2-on");
		const soundBtn = this.add.image(1840, 960, "sound2-on");
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

		const onPointerDownScript_3 = new OnPointerDownScript(musicBtn);
		const toggleMusicAction = new CallbackActionScript(onPointerDownScript_3);
		const pushActionScript_1 = new PushActionScript(onPointerDownScript_3);
		const musicSwitchImageAction = new SwitchImageActionScript(pushActionScript_1);

		const onPointerDownScript_2 = new OnPointerDownScript(soundBtn);
		const toggleEffectsAction = new CallbackActionScript(onPointerDownScript_2);
		const pushActionScript_3 = new PushActionScript(onPointerDownScript_2);
		const soundSwitchImageAction = new SwitchImageActionScript(pushActionScript_3);

		const onPointerDownScript_4 = new OnPointerDownScript(creditsBtn);
		const pushActionScript_4 = new PushActionScript(onPointerDownScript_4);
		const creditsSwitchImageAction = new SwitchImageActionScript(pushActionScript_4);

		musicSwitchImageAction.onTexture = {"key":"music2-on","frame":"music2-on.png"};
		musicSwitchImageAction.offTexture = {"key":"music2-off","frame":"music2-off.png"};
		musicSwitchImageAction.isOn = true;
		musicSwitchImageAction.mementoKey = "music";

		soundSwitchImageAction.onTexture = {"key":"sound2-on","frame":"sound2-on.png"};
		soundSwitchImageAction.offTexture = {"key":"sound2-off","frame":"sound2-off.png"};
		soundSwitchImageAction.isOn = true;
		soundSwitchImageAction.mementoKey = "effects";

		creditsSwitchImageAction.onTexture = {"key":"view-credits","frame":"view-credits"};
		creditsSwitchImageAction.offTexture = {"key":"view-credits","frame":"view-credits"};
		creditsSwitchImageAction.isOn = true;
		creditsSwitchImageAction.mementoKey = "view-credits";

		toggleMusicAction.callback = () => GameSounds.toggleMusic();
		toggleEffectsAction.callback = () => GameSounds.toggleEffects();

		this.events.emit("scene-awake");

		this.setButtonInteractive(playBtn);
		this.setButtonInteractive(musicBtn);
		this.setButtonInteractive(soundBtn);
		this.setButtonInteractive(creditsBtn);

		creditsBtn.on('pointerdown', this.showCredits, this);

		const hardResetText = this.add.text(1710, 850, "hard reset", {
            fontFamily: '"Press Start 2P"',
            fontSize: '14px',
            color: '#ffffff'
        }).setInteractive({ useHandCursor: true });

        hardResetText.on('pointerdown', this.showHardResetPopup, this);
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

	create() {
		this.editorCreate();
		GameSounds.init(this);
	}

	private showCredits() {
		const popup = this.add.container(960, 540);
	
		const background = this.add.rectangle(0, 0, 900, 700, 0x000000, 0.8).setOrigin(0.5, 0.5);
		background.setStrokeStyle(4, 0x00ffff);
	
		const creditsText = this.add.text(-420, -320, "Credits:", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#ffffff',
			align: 'left',
			wordWrap: { width: 860, useAdvancedWrap: true }
		});
	
		const developerText = this.add.text(-420, -270, "Code Jockey: pbrane", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#00ffff',
			align: 'left',
			wordWrap: { width: 860, useAdvancedWrap: true }
		});

		const developerLink = this.add.text(0, -270, "github", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#ffff00',
		}).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
			window.open('https://github.com/pbr4ne', '_blank');
		});
	
		const writerText = this.add.text(-420, -220, "Verbs & Vibes: James Funfer", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#00ffff',
			align: 'left',
			wordWrap: { width: 860, useAdvancedWrap: true }
		});

		const writerLink = this.add.text(150, -220, "author page", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#ffff00',
		}).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
			window.open('https://jamesfunfer.com', '_blank');
		});
	
		const uiArtistText = this.add.text(-420, -170, "Design Nerd: Blake Mann", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#00ffff',
			align: 'left',
			wordWrap: { width: 860, useAdvancedWrap: true }
		});
	
		const musicText = this.add.text(-420, -120, "Throwdown Tunes: terranaut1066", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#00ffff',
			align: 'left',
			wordWrap: { width: 860, useAdvancedWrap: true }
		});

		const musicLink = this.add.text(210, -120, "youtube", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#ffff00',
		}).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
			window.open('https://www.youtube.com/user/Kitchen1066', '_blank');
		});

		const artistText = this.add.text(-420, -70, "Rival Renderers:", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#00ffff',
			align: 'left',
			wordWrap: { width: 860, useAdvancedWrap: true }
		});

		const testerText = this.add.text(-420, -20, "Court Testers:", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#00ffff',
			align: 'left',
			wordWrap: { width: 860, useAdvancedWrap: true }
		});

		const thanksText = this.add.text(-420, 30, "Special Thanks:", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#00ffff',
			align: 'left',
			wordWrap: { width: 860, useAdvancedWrap: true }
		});
	
		const closeButton = this.add.text(0, 320, "Close", {
			fontFamily: '"Press Start 2P"',
			fontSize: '20px',
			color: '#ff00ff',
			padding: { x: 10, y: 5 }
		}).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
	
		closeButton.on('pointerdown', () => {
			popup.destroy();
		});
	
		closeButton.on('pointerover', () => {
			this.input.setDefaultCursor('pointer');
		});
	
		closeButton.on('pointerout', () => {
			this.input.setDefaultCursor('default');
		});
	
		popup.add([background, creditsText, developerText, developerLink, writerText, writerLink, uiArtistText, musicText, musicLink, artistText, testerText, thanksText, closeButton]);
	}

	private showHardResetPopup() {
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
            await StorageManager.clearAllData(); // Call the method to clear the database
            popup.destroy();
        });
    
        noButton.on('pointerdown', () => {
            popup.destroy();
        });
    
        popup.add([background, questionText, yesButton, noButton]);
    }
}
