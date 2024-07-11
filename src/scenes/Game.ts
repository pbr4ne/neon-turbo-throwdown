/* START OF COMPILED CODE */

import Phaser from "phaser";
import GameplayScript from "../script-nodes/gameplay/GameplayScript";
import TextureInfoScript from "../script-nodes/gameplay/TextureInfoScript";
/* START-USER-IMPORTS */
import DialogBox from "../prefabs/DialogBox";
import Boss from "../prefabs/Boss";
import Player from "../prefabs/Player";
import GameoverPrefab from "../prefabs/GameoverPrefab";
import { GameSteps } from '../enums/GameSteps';
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
    private startRoundImage: Phaser.GameObjects.Image | null = null;
    private pointerImage: Phaser.GameObjects.Image | null = null;
    private pointerImage2: Phaser.GameObjects.Image | null = null;
    private pointerImage3: Phaser.GameObjects.Image | null = null;

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

        this.startRoundImage = this.add.image(960, 1020, "start-round");
        this.startRoundImage.setVisible(false);

        this.pointerImage = this.add.image(265, 875, "pointer");
        this.pointerImage.setVisible(true);

        this.pointerImage2 = this.add.image(265, 875, "pointer");
        this.pointerImage2.setVisible(false);

        this.pointerImage3 = this.add.image(265, 875, "pointer");
        this.pointerImage3.setVisible(false);


		this.setupInitialState();
		this.startGameLoop();

		//this.showDialog();
    }

    clearAllInstructions() {
        this.drawCardsImage?.setVisible(false);
        this.selectCardImage?.setVisible(false);
        this.selectPlayerImage?.setVisible(false);
        this.targetOpponentImage?.setVisible(false);
        this.startRoundImage?.setVisible(false);
        this.pointerImage?.setVisible(false);
        this.pointerImage2?.setVisible(false);
        this.pointerImage3?.setVisible(false);
                
        this.player.throwdownButton.setVisible(false);

    }

    showDrawCardsImage() {
        this.clearAllInstructions();
        this.drawCardsImage?.setVisible(true);
        this.pointerImage?.setVisible(true);
        this.pointerImage?.setPosition(265, 875);
    }

    showSelectCardImage() {
        this.clearAllInstructions();
        this.selectCardImage?.setVisible(true);
        this.pointerImage?.setVisible(true);
        this.pointerImage?.setPosition(1500, 850);
    }

    showSelectPlayerImage() {
        this.clearAllInstructions();
        this.selectPlayerImage?.setVisible(true);
        this.player.getUnassignedMembers().forEach((member) => {
            if (member.getNumber() == 1) {
                this.pointerImage?.setPosition(650, 547);
                this.pointerImage?.setVisible(true);
            } else if (member.getNumber() == 2) {
                this.pointerImage2?.setPosition(1062, 654);
                this.pointerImage2?.setVisible(true);
            } else if (member.getNumber() == 3) {
                this.pointerImage3?.setPosition(1421, 550);
                this.pointerImage3?.setVisible(true);
            }
        });
    }

    showTargetOpponentImage() {
        this.clearAllInstructions();
        this.targetOpponentImage?.setVisible(true);
        this.boss.members.forEach((member) => {
            if (member.getNumber() == 4) {
                this.pointerImage?.setPosition(755, 297);
                this.pointerImage?.setVisible(true);
            } else if (member.getNumber() == 5) {
                this.pointerImage2?.setPosition(1041, 241);
                this.pointerImage2?.setVisible(true);
            } else if (member.getNumber() == 6) {
                this.pointerImage3?.setPosition(1319, 299);
                this.pointerImage3?.setVisible(true);
            }
        });
    }

    showThrowdown() {
        this.clearAllInstructions();
        this.player.throwdownButton.setVisible(true);
        this.startRoundImage?.setVisible(true);
        this.pointerImage?.setVisible(true);
        this.pointerImage?.setPosition(1730, 800);
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

    setStep(step: number) {
        this.currentStep = step;
        this.nextStep();
    }  

	nextStep() {
        switch (this.currentStep) {
            case GameSteps.DRAW_CARDS:
                this.drawCards();
                break;
            case GameSteps.BOSS_ASSIGN_AND_SELECT_CARDS:
                this.bossAssignAndSelectCards();
                break;
            case GameSteps.SELECT_CARD:
                this.selectCard();
                break;
            case GameSteps.SELECT_PLAYER_MEMBER:
                this.selectPlayerMember();
                break;
            case GameSteps.SELECT_ENEMY_MEMBER:
                this.selectEnemyMember();
                break;
            case GameSteps.START_TURN:
                this.startTurn();
                break;
            case GameSteps.DISCARD_REMAINING_CARDS:
                this.discardRemainingCards();
                break;
            case GameSteps.EXECUTE_TURN_ACTIONS:
                this.executeTurnActions();
                break;
            case GameSteps.CHECK_END_GAME_CONDITION:
                this.checkEndGameCondition();
                break;
            case GameSteps.LOOP_BACK:
                this.loopBack();
                break;
        }
    }

	drawCards() {
        console.log("on DRAW CARDS step");
        this.currentStep++;

        this.showDrawCardsImage();
        this.boss.drawCards();

        // wait for user to draw
    }

    bossAssignAndSelectCards() {
        console.log("on BOSS ASSIGN AND SELECT CARDS step");
        this.currentStep++;
        this.boss.assignCards();
        this.boss.targetMembers();
        this.nextStep();
    }

    selectCard() {
        console.log("on SELECT CARD step");
        this.currentStep++;

        this.showSelectCardImage();
        // wait for user to select card
    }

    selectPlayerMember() {
        console.log("on SELECT PLAYER MEMBER step");
        this.currentStep++;

        this.showSelectPlayerImage();
        // wait for user to select player
    }

    selectEnemyMember() {
        console.log("on SELECT ENEMY MEMBER step");
        this.currentStep++;

        this.showTargetOpponentImage();
        // wait for user to select enemy
    }

    startTurn() {
        console.log("on START TURN step");
        this.currentStep++;

        this.showThrowdown();
        // wait for user to click throwdown buton
    }

    discardRemainingCards() {
        console.log("on DISCARD REMAINING CARDS step");
        this.currentStep++;

        this.clearAllInstructions();
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
            this.clearAllInstructions();
            console.log("Game over");
            const msg = new GameoverPrefab(this, "Failure!");
		    this.add.existing(msg);
		    this.events.emit("scene-awake");
        } else if (this.boss.members.length === 0) {
            this.clearAllInstructions();
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
