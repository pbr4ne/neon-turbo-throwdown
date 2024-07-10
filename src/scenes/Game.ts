/* START OF COMPILED CODE */

import Phaser from "phaser";
import UILayerPrefab from "../prefabs/UILayerPrefab";
import GameplayScript from "../script-nodes/gameplay/GameplayScript";
import TextureInfoScript from "../script-nodes/gameplay/TextureInfoScript";
/* START-USER-IMPORTS */
import DialogBox from "../prefabs/DialogBox";
import Boss from "../prefabs/Boss";
import Player from "../prefabs/Player";
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {

	constructor() {
		super("Game");

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

		// uiLayer
		const uiLayer = new UILayerPrefab(this, 0, 0);
		this.add.existing(uiLayer);

		// gameplayScript
		const gameplayScript = new GameplayScript(this);

		// yellow
		const yellow = new TextureInfoScript(gameplayScript.textures);

		// orange
		const orange = new TextureInfoScript(gameplayScript.textures);

		// green
		const green = new TextureInfoScript(gameplayScript.textures);

		// yellow (prefab fields)
		yellow.texture = {"key":"ball-cyan"};

		// orange (prefab fields)
		orange.texture = {"key":"ball-yellow"};

		// green (prefab fields)
		green.texture = {"key":"ball-magenta"};

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */
	private player!: Player;
    private boss!: Boss;
	private dialogLayer!: Phaser.GameObjects.Layer;
	private playerLayer!: Phaser.GameObjects.Layer;

	create() {
		this.editorCreate();

		this.playerLayer = this.add.layer();
		this.dialogLayer = this.add.layer();

		this.player = new Player(this);
		this.boss = new Boss(this);
		this.player.opponent = this.boss;
		this.boss.opponent = this.player;

		this.playerLayer.add(this.player);
		this.playerLayer.add(this.boss);

		this.showDialog();
    }

	showDialog() {
        const dialog = new DialogBox(this, 960, 540);
		dialog.generateDialog( "Choose your dialogue option:", ["Option 1", "Option 2", "Option 3"]);

        dialog.on('optionSelected', (option: string) => {
            console.log(`Selected option: ${option}`);
        });

        //this.dialogLayer.add(dialog);
    }

	endTurn() {
		this.boss.executeTurn();
        this.player.executeTurn();
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
