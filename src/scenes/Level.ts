/* START OF COMPILED CODE */

import Phaser from "phaser";
import UILayerPrefab from "../prefabs/UILayerPrefab";
import Player from "../prefabs/Player";
import GameplayScript from "../script-nodes/gameplay/GameplayScript";
import TextureInfoScript from "../script-nodes/gameplay/TextureInfoScript";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */
import Deck from "../prefabs/Deck";
import Hand from "../prefabs/Hand";

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
		const background_5 = this.add.image(0, 0, "_MISSING");
		background_5.setOrigin(0, 0);

		// uiLayer
		const uiLayer = new UILayerPrefab(this, 0, 0);
		this.add.existing(uiLayer);

		// player1
		const player1 = new Player(this, 720, 459);
		this.add.existing(player1);

		// player2
		const player2 = new Player(this, 950, 583);
		this.add.existing(player2);

		// player3
		const player3 = new Player(this, 1211, 453);
		this.add.existing(player3);

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

	public id = 0;
	private myDeck: Deck | undefined;
    private myHand: Hand | undefined;
    private enemyDeck: Deck | undefined;
    private enemyHand: Hand | undefined;

	create() {
		this.id++;
		this.editorCreate();

		this.myDeck = new Deck(this);
        this.myHand = new Hand(this);
        this.enemyDeck = new Deck(this);
        this.enemyHand = new Hand(this);

        this.myDeck.createDeck();
        this.enemyDeck.createDeck();

        this.myHand.drawHand(this.myDeck, 5);
        //this.enemyHand.drawHand(this.enemyDeck, 5);

		this.myDeck.drawDeck(100, 900); 
        //this.enemyDeck.drawDeck(1500, 100);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
