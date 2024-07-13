import { GameSounds } from "../GameSounds";

/* START OF COMPILED CODE */

import Phaser from "phaser";
import { StartSceneActionScript } from "@phaserjs/editor-scripts-core";

import { OnEventScript } from "@phaserjs/editor-scripts-core";
import { ExecActionScript } from "@phaserjs/editor-scripts-core";

import { OnPointerDownScript } from "@phaserjs/editor-scripts-core";
import { PushActionScript } from "@phaserjs/editor-scripts-simple-animations";
import { OnAwakeScript } from "@phaserjs/editor-scripts-core";
import { MoveInSceneActionScript } from "@phaserjs/editor-scripts-simple-animations";
import OnPointerDownOpenURLScript from "../script-nodes/ui/OnPointerDownOpenURLScript";
import { CallbackActionScript } from "@phaserjs/editor-scripts-core";
import SwitchImageActionScript from "../script-nodes/ui/SwitchImageActionScript";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Welcome extends Phaser.Scene {

	constructor() {
		super("Welcome");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// logo
		const logo = this.add.image(1000, 360, "logo");

		// start_button
		const playBtn = this.add.image(1000, 680, "start-button");

		// music2_on
		const musicBtn = this.add.image(1720, 960, "music2-on");

		// sound2_on
		const soundBtn = this.add.image(1840, 960, "sound2-on");

		const floatingObjectScript = new FloatingObjectScript(logo);
		floatingObjectScript.offset = 5;

		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(playBtn);

		// pushActionScript_2
		const pushActionScript_2 = new PushActionScript(onPointerDownScript);

		// startGameAction
		const startGameAction = new StartSceneActionScript(pushActionScript_2);

		// onKeydown_SPACE
		const onKeydown_SPACE = new OnEventScript(this);

		// startGame_2
		const startGame_2 = new ExecActionScript(onKeydown_SPACE);

		// onKeydown_ENTER
		const onKeydown_ENTER = new OnEventScript(this);

		// startGame_1
		const startGame_1 = new ExecActionScript(onKeydown_ENTER);

		// onKeydown_SPACE (prefab fields)
		onKeydown_SPACE.eventName = "keydown-SPACE";
		onKeydown_SPACE.eventEmitter = "scene.input.keyboard";

		// startGame_2 (prefab fields)
		startGame_2.targetAction = startGameAction;

		// onKeydown_ENTER (prefab fields)
		onKeydown_ENTER.eventName = "keydown-ENTER";
		onKeydown_ENTER.eventEmitter = "scene.input.keyboard";

		startGameAction.sceneKey = "Game";
		// startGame_1 (prefab fields)
		startGame_1.targetAction = startGameAction;

		// onPointerDownScript_3
		const onPointerDownScript_3 = new OnPointerDownScript(musicBtn);

		// toggleMusicAction
		const toggleMusicAction = new CallbackActionScript(onPointerDownScript_3);

		// pushActionScript_1
		const pushActionScript_1 = new PushActionScript(onPointerDownScript_3);

		// musicSwitchImageAction
		const musicSwitchImageAction = new SwitchImageActionScript(pushActionScript_1);

		// onPointerDownScript_2
		const onPointerDownScript_2 = new OnPointerDownScript(soundBtn);

		// toggleEffectsAction
		const toggleEffectsAction = new CallbackActionScript(onPointerDownScript_2);

		// pushActionScript_3
		const pushActionScript_3 = new PushActionScript(onPointerDownScript_2);

		// soundSwitchImageAction
		const soundSwitchImageAction = new SwitchImageActionScript(pushActionScript_3);

		// toggleMusicAction (prefab fields)
		toggleMusicAction.callback = () => GameSounds.toggleMusic();

		// musicSwitchImageAction (prefab fields)
		musicSwitchImageAction.onTexture = {"key":"music2-on","frame":"music2-on.png"};
		musicSwitchImageAction.offTexture = {"key":"music2-off","frame":"music2-off.png"};
		musicSwitchImageAction.isOn = true;
		musicSwitchImageAction.mementoKey = "music";

		// toggleEffectsAction (prefab fields)
		toggleEffectsAction.callback = () => GameSounds.toggleEffects();

		// soundSwitchImageAction (prefab fields)
		soundSwitchImageAction.onTexture = {"key":"sound2-on","frame":"sound2-on.png"};
		soundSwitchImageAction.offTexture = {"key":"sound2-off","frame":"sound2-off.png"};
		soundSwitchImageAction.isOn = true;
		soundSwitchImageAction.mementoKey = "effects";

		this.musicSwitchImageAction = musicSwitchImageAction;
		this.musicBtn = musicBtn;
		this.soundSwitchImageAction = soundSwitchImageAction;
		this.soundBtn = soundBtn;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	private musicSwitchImageAction!: SwitchImageActionScript;
	private musicBtn!: Phaser.GameObjects.Image;
	private soundSwitchImageAction!: SwitchImageActionScript;
	public soundBtn!: Phaser.GameObjects.Image;

	create() {

		this.editorCreate();

		GameSounds.init(this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
