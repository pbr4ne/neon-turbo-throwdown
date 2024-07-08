/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Game from "../scenes/Game";
/* END-USER-IMPORTS */

export default interface Ball {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Ball extends Phaser.GameObjects.Image {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 464, y ?? 192, texture || "ball-yellow", frame);

		scene.physics.add.existing(this, false);
		this.body.angularVelocity = 100;
		this.body.setSize(143, 146, false);

		/* START-USER-CTR-CODE */

		this.setInteractive();

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	animatePickBall(callback: () => void) {

		const scene = this.scene as Game;

		scene.add.tween({
			targets: this,
			props: {
				scaleX: 1.5,
				scaleY: 1.5,
				alpha: 0
			},
			duration: 250,
			onComplete: () => callback(),
			onCompleteScope: this
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
