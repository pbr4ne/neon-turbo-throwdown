import { SpriteScript } from "@phaserjs/editor-scripts-core";
import { ScriptNode } from "@phaserjs/editor-scripts-core";
import Phaser from "phaser";

export default class FloatingObjectScript extends SpriteScript {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);
	}

	public offset: number = 20;

	protected start() {

		this.gameObject.scene.add.tween({
			targets: this.gameObject,
			props: {
				y: "-=" + this.offset,
			},
			yoyo: true,
			repeat: -1,
			duration: Phaser.Math.Between(1000, 1500),
			delay: Phaser.Math.Between(100, 500)
		});
	}
}