import { ScriptNode } from "@phaserjs/editor-scripts-core";
import Phaser from "phaser";

export default class PreloadBarUpdaterScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);
	}

	override get gameObject() {

		return super.gameObject as Phaser.GameObjects.Rectangle;
	}

	protected override awake(): void {

		const fullWidth = this.gameObject.width;

		this.scene.load.on(Phaser.Loader.Events.PROGRESS, (p:number) => {

			this.gameObject.width = fullWidth * p;
		});
	}
}
