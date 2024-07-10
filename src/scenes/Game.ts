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
	public currentStep: number = 0;

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

		this.setupInitialState();
		this.startGameLoop();

		//this.showDialog();
    }

    getCurrentStep(): number {
        return this.currentStep - 1;
    }

	startGameLoop() {
        this.currentStep = 0;
        this.nextStep();
    }

	setupInitialState() {
        this.player.deck.buildDeck();
        this.player.deck.renderDeck(100, 840);

        this.boss.deck.buildDeck();

        this.player.createEndTurnButton();
    }

	nextStep() {
        switch (this.currentStep) {
            case 0:
                this.drawCards();
                break;
            case 1:
                this.assignCards();
                break;
            case 2:
                this.targetMembers();
                break;
            case 3:
                this.startTurn();
                break;
            case 4:
                this.discardRemainingCards();
                break;
            case 5:
                this.executeTurnActions();
                break;
            case 6:
                this.loopBack();
                break;
        }
    }

	drawCards() {
        console.log("on DRAW CARDS step");
        this.currentStep++;
        this.boss.drawCards();
        // wait for user to draw
    }

    assignCards() {
        console.log("on ASSIGN CARDS step");
        this.currentStep++;
        this.boss.assignCards();
        // wait for user to assign
    }

    targetMembers() {
        console.log("on TARGET MEMBERS step");
        this.currentStep++;
        this.boss.targetMembers();
        // wait for user to target
    }

    startTurn() {
        this.player.throwdownButton.setVisible(true);
        console.log("on START TURN step");
        this.currentStep++;
        // wait for user to click throwdown buton
    }

    discardRemainingCards() {
        console.log("on DISCARD REMAINING CARDS step");
        this.currentStep++;
        this.player.hand.clear();
        this.boss.hand.clear();
        this.player.throwdownButton.setVisible(false);
        this.nextStep();
    }

    executeTurnActions() {
        console.log("on EXECUTE TURN ACTIONS step");
        this.player.executeTurn();
        this.boss.executeTurn();

        this.currentStep++;
        this.nextStep();
    }

    loopBack() {
        this.player.clearMembers();
        this.boss.clearMembers();
        this.currentStep = 0;
        this.nextStep();
    }

	showDialog() {
        const dialog = new DialogBox(this, 960, 540);
		dialog.generateDialog( "Choose your dialogue option:", ["Option 1", "Option 2", "Option 3"]);

        dialog.on('optionSelected', (option: string) => {
            console.log(`Selected option: ${option}`);
        });

        this.dialogLayer.add(dialog);
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
