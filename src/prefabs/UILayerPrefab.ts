
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
import OnPointerDownStartSceneScript from "../script-nodes/ui/OnPointerDownStartSceneScript";
import { OnEventScript } from "@phaserjs/editor-scripts-core";
import UpdateTextAction from "../script-nodes/gameplay/UpdateTextAction";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class UILayerPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// homeButton
		const homeButton = scene.add.image(90, 231, "buttons", "home.png");
		this.add(homeButton);

		// floatingObjectScript_1
		const floatingObjectScript_1 = new FloatingObjectScript(homeButton);

		// onPointerDownStartSceneScript
		const onPointerDownStartSceneScript = new OnPointerDownStartSceneScript(homeButton);

		// startsIcon
		const startsIcon = scene.add.container(91, 72);
		startsIcon.scaleX = 0.5591245841155765;
		startsIcon.scaleY = 0.5591245841155765;
		this.add(startsIcon);

		// ball_cyan
		const ball_cyan = scene.add.image(-15, -9, "ball-cyan");
		startsIcon.add(ball_cyan);

		// floatingObjectScript_4
		const floatingObjectScript_4 = new FloatingObjectScript(ball_cyan);

		// ball_yellow
		const ball_yellow = scene.add.image(2, 34, "ball-yellow");
		startsIcon.add(ball_yellow);

		// floatingObjectScript_3
		const floatingObjectScript_3 = new FloatingObjectScript(ball_yellow);

		// ball_magenta
		const ball_magenta = scene.add.image(27, 0, "ball-magenta");
		ball_magenta.scaleX = 0.7725992149498591;
		ball_magenta.scaleY = 0.7725992149498591;
		startsIcon.add(ball_magenta);

		// floatingObjectScript_2
		const floatingObjectScript_2 = new FloatingObjectScript(ball_magenta);

		// pointsCounter
		const pointsCounter = scene.add.bitmapText(206, 79, "turbo", "0");
		pointsCounter.setOrigin(0.5, 0.5);
		pointsCounter.tintFill = true;
		pointsCounter.tintTopLeft = 8504341;
		pointsCounter.tintTopRight = 8504341;
		pointsCounter.tintBottomLeft = 14790987;
		pointsCounter.tintBottomRight = 14790987;
		pointsCounter.text = "0";
		pointsCounter.fontSize = 100;
		this.add(pointsCounter);

		// floatingObjectScript_5
		const floatingObjectScript_5 = new FloatingObjectScript(pointsCounter);

		// onUpdatePoints
		const onUpdatePoints = new OnEventScript(pointsCounter);

		// updatePointsAction
		new UpdateTextAction(onUpdatePoints);

		// floatingObjectScript_1 (prefab fields)
		floatingObjectScript_1.offset = 5;

		// onPointerDownStartSceneScript.startSceneActionScript (prefab fields)
		onPointerDownStartSceneScript.startSceneActionScript.sceneKey = "Welcome";

		// floatingObjectScript_4 (prefab fields)
		floatingObjectScript_4.offset = 10;

		// floatingObjectScript_3 (prefab fields)
		floatingObjectScript_3.offset = 5;

		// floatingObjectScript_2 (prefab fields)
		floatingObjectScript_2.offset = 15;

		// floatingObjectScript_5 (prefab fields)
		floatingObjectScript_5.offset = 5;

		// onUpdatePoints (prefab fields)
		onUpdatePoints.eventName = "update-points";
		onUpdatePoints.eventEmitter = "scene.events";

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
