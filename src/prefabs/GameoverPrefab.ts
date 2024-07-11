
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
import { OnAwakeScript } from "@phaserjs/editor-scripts-core";
import { FadeActionScript } from "@phaserjs/editor-scripts-simple-animations";
import { DurationConfigComp } from "@phaserjs/editor-scripts-simple-animations";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GameoverPrefab extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, message: string, x?: number, y?: number, font?: string) {
		super(scene);

		// floatingObjectScript
		new FloatingObjectScript(this);

		// onAwakeScript
		const onAwakeScript = new OnAwakeScript(this);

		// fadeActionScript
		const fadeActionScript = new FadeActionScript(onAwakeScript);

		// fadeActionScript (prefab fields)
		fadeActionScript.fadeDirection = "FadeIn";

		// fadeActionScript (components)
		const fadeActionScriptDurationConfigComp = new DurationConfigComp(fadeActionScript);
		fadeActionScriptDurationConfigComp.duration = 14000;

		this.gameOverText = new Phaser.GameObjects.Text(this.scene, 980, 500, message, {
			fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
			fontSize: '72px',
			color: '#ff00ff',
            stroke: '#00ffff',
            strokeThickness: 5,
			padding: { x: 5, y: 5 },
			align: 'center'
		});
		this.add(this.gameOverText);
		this.gameOverText.setOrigin(0.5, 0.5);

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private gameOverText!: Phaser.GameObjects.Text;

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
