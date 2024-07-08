import Ball from "../prefabs/Ball";


/* START OF COMPILED CODE */

import Phaser from "phaser";
import UILayerPrefab from "../prefabs/UILayerPrefab";
import GameplayScript from "../script-nodes/gameplay/GameplayScript";
import TextureInfoScript from "../script-nodes/gameplay/TextureInfoScript";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// background_1
		const background_1 = this.add.image(0, 0, "background-1");
		background_1.setOrigin(0, 0);

		// background_2
		const background_2 = this.add.image(0, 0, "background-2");
		background_2.setOrigin(0, 0);

		// background_3
		const background_3 = this.add.image(0, 0, "background-3");
		background_3.setOrigin(0, 0);

		// background_5
		const background_5 = this.add.image(0, 0, "background-5");
		background_5.setOrigin(0, 0);

		// uiLayer
		const uiLayer = new UILayerPrefab(this, 0, 0);
		this.add.existing(uiLayer);

		// gameplayScript
		const gameplayScript = new GameplayScript(this);

		// cyan
		const cyan = new TextureInfoScript(gameplayScript.textures);
		const yellow = new TextureInfoScript(gameplayScript.textures);
		const magenta = new TextureInfoScript(gameplayScript.textures);

		cyan.texture = {"key":"ball-cyan"};
		yellow.texture = {"key":"ball-yellow"};
		magenta.texture = {"key":"ball-magenta"};

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	public id = 0;

	create() {

		this.id++;
		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
