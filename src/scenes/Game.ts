/* START OF COMPILED CODE */

import Phaser from "phaser";
import GameplayScript from "../script-nodes/gameplay/GameplayScript";
import TextureInfoScript from "../script-nodes/gameplay/TextureInfoScript";
/* START-USER-IMPORTS */
import { Coach } from "../dialogue/Coach";
import DialogBox from "../dialogue/DialogBox";
import Boss from "../prefabs/Boss";
import Player from "../prefabs/Player";
import GameoverPrefab from "../prefabs/GameoverPrefab";
import { GameSteps } from '../enums/GameSteps';
import { DialogueConversation } from "../dialogue/Dialogue";
import { DialogueStorage } from "../dialogue/DialogueStorage";
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {

	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		this.courtImage = this.add.image(953, 443, "court");
		this.scoreImage = this.add.image(80, 110, "score");
		this.forfeitImage = this.add.image(77, 243, "forfeit");

		this.coachCornerImage = this.add.image(1625, 193, "coach-corner");
		this.difficultyImage = this.add.image(1747, 411, "difficulty-1");
        this.cardSlot1 = this.add.image(556, 848, "empty");
        this.cardSlot2 = this.add.image(758, 848, "empty");
        this.cardSlot3 = this.add.image(960, 848, "empty");
        this.cardSlot4 = this.add.image(1162, 848, "empty");
        this.cardSlot5 = this.add.image(1364, 848, "empty");

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

    private courtImage!: Phaser.GameObjects.Image;
    private scoreImage!: Phaser.GameObjects.Image;
    private forfeitImage!: Phaser.GameObjects.Image;
    private coachCornerImage!: Phaser.GameObjects.Image;
    private difficultyImage!: Phaser.GameObjects.Image;
    private cardSlot1!: Phaser.GameObjects.Image;
    private cardSlot2!: Phaser.GameObjects.Image;
    private cardSlot3!: Phaser.GameObjects.Image;
    private cardSlot4!: Phaser.GameObjects.Image;
    private cardSlot5!: Phaser.GameObjects.Image;

    private drawCardsImage: Phaser.GameObjects.Image | null = null;
    private selectCardImage: Phaser.GameObjects.Image | null = null;
    private selectPlayerImage: Phaser.GameObjects.Image | null = null;
    private targetOpponentImage: Phaser.GameObjects.Image | null = null;
    private startRoundImage: Phaser.GameObjects.Image | null = null;
    private pointerImage: Phaser.GameObjects.Image | null = null;
    private pointerImage2: Phaser.GameObjects.Image | null = null;
    private pointerImage3: Phaser.GameObjects.Image | null = null;

    private gameOverPrefab!: GameoverPrefab;

    private dialogBox!: DialogBox;
    private dialogueStorage!: DialogueStorage;

    private currentState = "dialog";
    private currentCoach: Coach = Coach.getCoach("primo");
    private coachName!: Phaser.GameObjects.Text;

	create() {
		this.editorCreate();

		this.playerLayer = this.add.layer();
		this.dialogLayer = this.add.layer();

        this.coachName = new Phaser.GameObjects.Text(this, 1720, 340, this.currentCoach.getName(), {
			fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
			fontSize: '16px',
			color: '#000000',
            stroke: '#000000',
            strokeThickness: 1,
			padding: { x: 5, y: 5 },
			align: 'left'
		});
		this.playerLayer.add(this.coachName);
		this.coachName.setOrigin(0.5, 0.5);

        this.drawCardsImage = this.add.image(960, 1020, "draw-cards");
        this.selectCardImage = this.add.image(960, 1020, "select-card");
        this.selectPlayerImage = this.add.image(960, 1020, "select-player");
        this.targetOpponentImage = this.add.image(960, 1020, "target-opponent");
        this.startRoundImage = this.add.image(960, 1020, "start-round");
        this.pointerImage = this.add.image(265, 875, "pointer");
        this.pointerImage2 = this.add.image(265, 875, "pointer");
        this.pointerImage3 = this.add.image(265, 875, "pointer");

        this.clearAllGymStuff();
        this.clearAllInstructions();

        this.dialogueStorage = new DialogueStorage();
        this.doDialogue(this.dialogueStorage.introDialogue);
    }

    doDialogue(dialogueConversation: DialogueConversation) {
        
        const dialog = new DialogBox(this, 960, 542, dialogueConversation);

        this.dialogBox = this.dialogLayer.add(dialog);
    }

    finishDialogue() {
        this.dialogBox.destroyEverything();
        this.dialogBox.destroy();
        this.setupInitialState();
        this.startGameLoop();
    }

    clearAllGymStuff() {
        this.scoreImage.setVisible(false);
        this.forfeitImage.setVisible(false);
        this.coachCornerImage.setVisible(false);
        this.coachName.setVisible(false);
        this.difficultyImage.setVisible(false);
        this.cardSlot1.setVisible(false);
        this.cardSlot2.setVisible(false);
        this.cardSlot3.setVisible(false);
        this.cardSlot4.setVisible(false);
        this.cardSlot5.setVisible(false);
    }

    clearAllInstructions() {
        this.drawCardsImage?.setVisible(false);
        this.selectCardImage?.setVisible(false);
        this.selectPlayerImage?.setVisible(false);
        this.targetOpponentImage?.setVisible(false);
        this.startRoundImage?.setVisible(false);
        this.pointerImage?.setVisible(false);
        this.pointerImage?.setAngle(0);
        this.pointerImage2?.setVisible(false);
        this.pointerImage3?.setVisible(false);
        
        if (this.player) {
            this.player.throwdownButton.setVisible(false);
        }
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
        this.pointerImage?.setPosition(1715, 775);
        this.pointerImage?.setAngle(-90);
    }

    getCurrentStep(): number {
        return this.currentStep - 1;
    }

	startGameLoop() {
        this.currentStep = 0;
        this.nextStep();
    }

	setupInitialState() {
        this.courtImage.setVisible(true);
        this.scoreImage.setVisible(true);
        this.forfeitImage.setVisible(true);
        this.coachCornerImage.setVisible(true);
        this.coachName.setVisible(true);
        this.difficultyImage.setVisible(true);
        this.cardSlot1.setVisible(true);
        this.cardSlot2.setVisible(true);
        this.cardSlot3.setVisible(true);
        this.cardSlot4.setVisible(true);
        this.cardSlot5.setVisible(true);

        this.gameOverPrefab?.setVisible(false);

        this.player = new Player(this);
		this.boss = new Boss(this, this.currentCoach);
		this.player.opponent = this.boss;
		this.boss.opponent = this.player;

		this.playerLayer.add(this.player);
		this.playerLayer.add(this.boss);

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
            this.gameOverPrefab = new GameoverPrefab(this, "FAILURE!");
            this.gameOverPrefab.setVisible(true);
            this.add.existing(this.gameOverPrefab);

		    this.events.emit("scene-awake");
        } else if (this.boss.members.length === 0) {
            this.clearAllGymStuff();
            this.clearAllInstructions();
            this.player.clearMembers();
            this.boss.clearMembers();
            this.player.hand.clear();
            this.boss.hand.clear();
            this.boss.destroy();

            console.log("You win!");
            this.gameOverPrefab = new GameoverPrefab(this, "VICTORY!");
            this.gameOverPrefab.setVisible(true);
            this.add.existing(this.gameOverPrefab);

		    this.events.emit("scene-awake");
            
            this.doDialogue(this.dialogueStorage.primoWinDialogue);
        } else {
            this.nextStep();
        }
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
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
