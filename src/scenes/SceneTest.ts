import Phaser from "phaser";
export default class SceneTest extends Phaser.Scene {

	constructor() {
		super("SceneTest");
	}

	editorCreate(): void {

		const rectangle_1 = this.add.rectangle(954, 877, 128, 128);
		rectangle_1.scaleX = 9.629789125151623;
		rectangle_1.scaleY = 2.5543332546562807;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 986895;
		rectangle_1.isStroked = true;
		rectangle_1.strokeColor = 16711935;

		this.add.image(953, 443, "court");

		this.events.emit("scene-awake");
	}

	create() {

		this.editorCreate();
	}
}