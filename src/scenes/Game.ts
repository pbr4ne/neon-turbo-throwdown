/* START OF COMPILED CODE */

import Phaser from "phaser";
import UILayerPrefab from "../prefabs/UILayerPrefab";
import GameplayScript from "../script-nodes/gameplay/GameplayScript";
import TextureInfoScript from "../script-nodes/gameplay/TextureInfoScript";
import Team from "./Team";
/* START-USER-IMPORTS */
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
	private characterReady: boolean = false;
    private opponentReady: boolean = false;

	create() {
		this.editorCreate();

        this.scene.launch("Character");
        this.scene.launch("Opponent");

		this.scene.get('Character').events.on('characterReady', this.onCharacterReady, this);
        this.scene.get('Opponent').events.on('opponentReady', this.onOpponentReady, this);
    }

	onCharacterReady() {
        this.characterReady = true;
        this.checkBothReady();
    }

    onOpponentReady() {
        this.opponentReady = true;
        this.checkBothReady();
    }

	//todo - this is stupid
    checkBothReady() {
        if (this.characterReady && this.opponentReady) {
            const character = this.scene.get('Character') as Team;
            const opponent = this.scene.get('Opponent') as Team;
            character.opponent = opponent;
            opponent.opponent = character;
        }
    }

	endTurn() {
        const character = this.scene.get('Character') as Team;
        const opponent = this.scene.get('Opponent') as Team;

		opponent.executeTurn();
        character.executeTurn();
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
