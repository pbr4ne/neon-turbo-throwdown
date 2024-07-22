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
import { Library } from "../throwdown/Library";
import Credits from '../prefabs/Credits';
import Trophies from '../prefabs/Trophies';
import Settings from '../prefabs/Settings';
import TextFactory from "../utilities/TextUtils";

export default class Welcome extends Phaser.Scene {

	private musicBtn?: Phaser.GameObjects.Image;
	private soundBtn?: Phaser.GameObjects.Image;

	constructor() {
		super("Welcome");
	}

	editorCreate(): void {
		let playBtn;
		let logo;

		if (Library.getNumRuns() === 0) {
			logo = this.add.image(1000, 360, "logo");
			playBtn = this.add.image(1000, 680, "start-button");
		} else {
			logo = this.add.image(1000, 200, "logo-small");
			if(!Library.getWon()) {
				this.add.image(1000, 400, "pep-talk");
			}
			playBtn = this.add.image(1000, 630, "restart-button");
			const unlockText = TextFactory.createText(this, 1000, 670, "maintain your unlocks", { fontSize: '12px'});
			unlockText.setOrigin(0.5, 0.5);
		}

		this.musicBtn = this.add.image(1720, 960, "music2-on");
		this.soundBtn = this.add.image(1840, 960, "sound2-on");
		const creditsBtn = this.add.image(100, 960, "view-credits");
		const settingsBtn = this.add.image(1600, 952, "settings");

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

		const onPointerDownScript_5 = new OnPointerDownScript(settingsBtn);
		const pushActionScript_5 = new PushActionScript(onPointerDownScript_5);
		const settingsSwitchImageAction = new SwitchImageActionScript(pushActionScript_5);

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

		settingsSwitchImageAction.onTexture = {"key":"settings","frame":"settings.png"};
		settingsSwitchImageAction.offTexture = {"key":"settings","frame":"settings.png"};
		settingsSwitchImageAction.isOn = true;
		settingsSwitchImageAction.mementoKey = "settings";

		toggleMusicAction.callback = () => GameSounds.toggleMusic();
		toggleEffectsAction.callback = () => GameSounds.toggleEffects();

		this.events.emit("scene-awake");

		this.setButtonInteractive(playBtn);
		this.setButtonInteractive(this.musicBtn);
		this.setButtonInteractive(this.soundBtn);
		this.setButtonInteractive(creditsBtn);
		this.setButtonInteractive(settingsBtn);

		creditsBtn.on('pointerdown', this.showCredits, this);
		settingsBtn.on('pointerdown', this.showSettings, this);

		if (Library.getTrophyTypes().length > 0) {
			const trophiesBtn = this.add.image(1000, 500, "trophies").setInteractive({ useHandCursor: true });
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
		const creditsPopup = new Credits(this);
		this.add.existing(creditsPopup);
	}

	private showTrophies() {
		const trophiesPopup = new Trophies(this);
		this.add.existing(trophiesPopup);
	}

	private showSettings() {
		const settingsPopup = new Settings(this);
		this.add.existing(settingsPopup);
	}
}
