import { GameSounds } from "../GameSounds";

/* START OF COMPILED CODE */

import Phaser from "phaser";
import { OnPointerDownScript } from "@phaserjs/editor-scripts-core";
import { PushActionScript } from "@phaserjs/editor-scripts-simple-animations";
import { StartSceneActionScript } from "@phaserjs/editor-scripts-core";
import { OnAwakeScript } from "@phaserjs/editor-scripts-core";
import { MoveInSceneActionScript } from "@phaserjs/editor-scripts-simple-animations";
import OnPointerDownOpenURLScript from "../script-nodes/ui/OnPointerDownOpenURLScript";
import { CallbackActionScript } from "@phaserjs/editor-scripts-core";
import SwitchImageActionScript from "../script-nodes/ui/SwitchImageActionScript";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
import { OnEventScript } from "@phaserjs/editor-scripts-core";
import { ExecActionScript } from "@phaserjs/editor-scripts-core";
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

		// item1
		const item1 = this.add.image(0, 0, "item1");
		item1.setOrigin(0, 0);

		// item2
		const item2 = this.add.image(0, 0, "item2");
		item2.setOrigin(0, 0);

		// item3
		const item3 = this.add.image(0, 0, "item3");
		item3.setOrigin(0, 0);

		// item4
		const item4 = this.add.image(0, 0, "item4");
		item4.setOrigin(0, 0);

		// item5
		const item5 = this.add.image(0, 0, "item5");
		item5.setOrigin(0, 0);

		// decor
		const decor = this.add.image(0, 0, "decor");
		decor.setOrigin(0, 0);

		// playBtn
		const playBtn = this.add.image(960, 840, "buttons", "play.png");
		playBtn.scaleX = 2;
		playBtn.scaleY = 2;

		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(playBtn);

		// pushActionScript_2
		const pushActionScript_2 = new PushActionScript(onPointerDownScript);

		// startGameAction
		const startGameAction = new StartSceneActionScript(pushActionScript_2);

		// onAwakeScript
		const onAwakeScript = new OnAwakeScript(playBtn);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(onAwakeScript);

		// musicBtn
		const musicBtn = this.add.image(1560, 920, "buttons", "music-on.png");

		// onPointerDownScript_3
		const onPointerDownScript_3 = new OnPointerDownScript(musicBtn);

		// toggleMusicAction
		const toggleMusicAction = new CallbackActionScript(onPointerDownScript_3);

		// pushActionScript_1
		const pushActionScript_1 = new PushActionScript(onPointerDownScript_3);

		// musicSwitchImageAction
		const musicSwitchImageAction = new SwitchImageActionScript(pushActionScript_1);

		// soundBtn
		const soundBtn = this.add.image(1760, 920, "buttons", "sound-on.png");

		// onPointerDownScript_2
		const onPointerDownScript_2 = new OnPointerDownScript(soundBtn);

		// toggleEffectsAction
		const toggleEffectsAction = new CallbackActionScript(onPointerDownScript_2);

		// pushActionScript_3
		const pushActionScript_3 = new PushActionScript(onPointerDownScript_2);

		// soundSwitchImageAction
		const soundSwitchImageAction = new SwitchImageActionScript(pushActionScript_3);

		// bitmaptext
		const bitmaptext = this.add.bitmapText(960, 120, "turbo", "NEON\nTURBO\nTHROWDOWN");
		bitmaptext.setOrigin(0.5, 0);
		bitmaptext.text = "NEON\nTURBO\nTHROWDOWN";
		bitmaptext.fontSize = 150;
		bitmaptext.align = 1;

		// floatingObjectScript
		const floatingObjectScript = new FloatingObjectScript(bitmaptext);

		// onKeydown_SPACE
		const onKeydown_SPACE = new OnEventScript(this);

		// startGame_2
		const startGame_2 = new ExecActionScript(onKeydown_SPACE);

		// onKeydown_ENTER
		const onKeydown_ENTER = new OnEventScript(this);

		// startGame_1
		const startGame_1 = new ExecActionScript(onKeydown_ENTER);

		// startGameAction (prefab fields)
		startGameAction.sceneKey = "Game";

		// moveInSceneActionScript (prefab fields)
		moveInSceneActionScript.from = "BOTTOM";

		// toggleMusicAction (prefab fields)
		toggleMusicAction.callback = () => GameSounds.toggleMusic();

		// musicSwitchImageAction (prefab fields)
		musicSwitchImageAction.onTexture = {"key":"buttons","frame":"music-on.png"};
		musicSwitchImageAction.offTexture = {"key":"buttons","frame":"music-off.png"};
		musicSwitchImageAction.isOn = true;
		musicSwitchImageAction.mementoKey = "music";

		// toggleEffectsAction (prefab fields)
		toggleEffectsAction.callback = () => GameSounds.toggleEffects();

		// soundSwitchImageAction (prefab fields)
		soundSwitchImageAction.onTexture = {"key":"buttons","frame":"sound-on.png"};
		soundSwitchImageAction.offTexture = {"key":"buttons","frame":"sound-off.png"};
		soundSwitchImageAction.isOn = true;
		soundSwitchImageAction.mementoKey = "effects";

		// floatingObjectScript (prefab fields)
		floatingObjectScript.offset = 10;

		// onKeydown_SPACE (prefab fields)
		onKeydown_SPACE.eventName = "keydown-SPACE";
		onKeydown_SPACE.eventEmitter = "scene.input.keyboard";

		// startGame_2 (prefab fields)
		startGame_2.targetAction = startGameAction;

		// onKeydown_ENTER (prefab fields)
		onKeydown_ENTER.eventName = "keydown-ENTER";
		onKeydown_ENTER.eventEmitter = "scene.input.keyboard";

		// startGame_1 (prefab fields)
		startGame_1.targetAction = startGameAction;

		this.musicSwitchImageAction = musicSwitchImageAction;
		this.musicBtn = musicBtn;
		this.soundSwitchImageAction = soundSwitchImageAction;
		this.soundBtn = soundBtn;

		this.events.emit("scene-awake");
	}

	private musicSwitchImageAction!: SwitchImageActionScript;
	private musicBtn!: Phaser.GameObjects.Image;
	private soundSwitchImageAction!: SwitchImageActionScript;
	public soundBtn!: Phaser.GameObjects.Image;

	/* START-USER-CODE */

	create() {

		this.editorCreate();

		GameSounds.init(this);

		// if (this.musicBtn && this.soundBtn) {

		// 	this.musicSwitchImageAction.isOn = GameSounds.musicEnabled;
		// 	this.soundSwitchImageAction.isOn = GameSounds.effectsEnabled;
		// }
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
