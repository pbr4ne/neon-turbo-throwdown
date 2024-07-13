import { GameSounds } from "../GameSounds";
import Phaser from "phaser";
import { StartSceneActionScript } from "@phaserjs/editor-scripts-core";
import { OnEventScript } from "@phaserjs/editor-scripts-core";
import { ExecActionScript } from "@phaserjs/editor-scripts-core";
import { OnPointerDownScript } from "@phaserjs/editor-scripts-core";
import { PushActionScript } from "@phaserjs/editor-scripts-simple-animations";
import { CallbackActionScript } from "@phaserjs/editor-scripts-core";
import SwitchImageActionScript from "../script-nodes/ui/SwitchImageActionScript";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";

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

		const creditsText = this.add.text(-420, -320, "Credits:\n\nDeveloper: \nWriter: \nUI Artist: \nMusic: ", {
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
			backgroundColor: '#000000',
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

		popup.add([background, creditsText, closeButton]);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */
