/* START OF COMPILED CODE */

import Phaser from "phaser";
import GameplayScript from "../script-nodes/gameplay/GameplayScript";
import TextureInfoScript from "../script-nodes/gameplay/TextureInfoScript";
/* START-USER-IMPORTS */
import DialogBox from "../prefabs/DialogBox";
import Boss from "../prefabs/Boss";
import Player from "../prefabs/Player";
import GameoverPrefab from "../prefabs/GameoverPrefab";
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {

	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// court
		this.add.image(953, 443, "court");

		// score
		this.add.image(80, 110, "score");

		// forfeit
		this.add.image(77, 243, "forfeit");

		// coach_corner
		this.add.image(1625, 193, "coach-corner");

		// difficulty_1
		this.add.image(1747, 411, "difficulty-1");

        this.add.image(556, 848, "empty");
        this.add.image(758, 848, "empty");
        this.add.image(960, 848, "empty");
        this.add.image(1162, 848, "empty");
        this.add.image(1364, 848, "empty");

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

    private drawCardsImage: Phaser.GameObjects.Image | null = null;
    private selectCardImage: Phaser.GameObjects.Image | null = null;
    private selectPlayerImage: Phaser.GameObjects.Image | null = null;
    private targetOpponentImage: Phaser.GameObjects.Image | null = null;
    private pointerImage: Phaser.GameObjects.Image | null = null;

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

        this.drawCardsImage = this.add.image(960, 1020, "draw-cards");
        this.drawCardsImage.setVisible(false);

        this.selectCardImage = this.add.image(960, 1020, "select-card");
        this.selectCardImage.setVisible(false);

        this.selectPlayerImage = this.add.image(960, 1020, "select-player");
        this.selectPlayerImage.setVisible(false);

        this.targetOpponentImage = this.add.image(960, 1020, "target-opponent");
        this.targetOpponentImage.setVisible(false);

        this.pointerImage = this.add.image(265, 875, "pointer");
        this.pointerImage.setVisible(false);


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
                this.checkEndGameCondition();
                break;
            case 7:
                this.loopBack();
                break;
        }
    }

	drawCards() {
        console.log("on DRAW CARDS step");
        this.currentStep++;

        this.drawCardsImage?.setVisible(true);
        this.selectCardImage?.setVisible(false);
        this.pointerImage?.setPosition(265, 875);
        this.pointerImage?.setVisible(true);
        this.boss.drawCards();
        // wait for user to draw
    }

    assignCards() {
        console.log("on ASSIGN CARDS step");
        this.currentStep++;

        this.drawCardsImage?.setVisible(false);
        this.selectCardImage?.setVisible(true);
        this.pointerImage?.setPosition(1500, 850);

        this.boss.assignCards();
        // wait for user to assign
    }

    targetMembers() {
        console.log("on TARGET MEMBERS step");
        this.currentStep++;
        this.boss.targetMembers();
        if (this.player.checkAllThrowersHaveTargets()) {
            this.nextStep();
        }
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
        
        this.player.throwdownButton.setVisible(false);
        this.nextStep();
    }

    async executeTurnActions() {
        console.log("on EXECUTE TURN ACTIONS step");
        this.currentStep++;
        await this.player.executeTurn();
        await this.boss.executeTurn();
        
        this.nextStep();
    }

    checkEndGameCondition() {
        console.log("on CHECK END GAME CONDITION step");
        this.currentStep++;

        if (this.player.members.length === 0) {
            console.log("Game over");
            const msg = new GameoverPrefab(this, "Failure!");
		    this.add.existing(msg);
		    this.events.emit("scene-awake");
        } else if (this.boss.members.length === 0) {
            console.log("You win!");
            const msg = new GameoverPrefab(this, "Victory!");
		    this.add.existing(msg);
		    this.events.emit("scene-awake");
        }

        this.nextStep();
    }

    loopBack() {
        console.log("on LOOP BACK step");
        this.player.clearMembers();
        this.boss.clearMembers();
        this.player.hand.clear();
        this.boss.hand.clear();

        if (this.player.deck.getCards().length < 5) {
            this.player.deck.buildDeck();
            this.player.deck.renderDeck(100, 840);
        }
        if (this.boss.deck.getCards().length < 5) {
            this.boss.deck.buildDeck();
        }

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
