
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { Coach } from "../throwdown/Coach";
import Boss from "../prefabs/Boss";
import Player from "../prefabs/Player";
import GameoverPrefab from "../prefabs/GameoverPrefab";
import Game from '../scenes/Game';
import { GameSteps } from '../throwdown/GameSteps';
import { Library } from "../throwdown/Library";
import { getUrlParam, log } from "../utilities/GameUtils";
import Card from "./Card";
import { CoachList } from "../throwdown/CoachList";
import { GameSounds } from "../utilities/GameSounds";
/* END-USER-IMPORTS */

export default class Throwdown extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, coach: Coach, player: Player) {
		super(scene);

		/* START-USER-CTR-CODE */
		this.coach = coach;
		this.player = player;
		this.boss = new Boss(this.scene, this.coach);
        this.boss.addMembers();
        this.boss.setThrowdown(this);
		this.player.opponent = this.boss;
		this.boss.opponent = this.player;

        this.render();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	public currentStep: number = 0;
	private coach: Coach;
	private boss: Boss;
	private player: Player;
	private coachName!: Phaser.GameObjects.Text;

	private playerLayer!: Phaser.GameObjects.Layer;

	private scoreImage!: Phaser.GameObjects.Image;
    private scoreText!: Phaser.GameObjects.Text;
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

	render() {

		this.scoreImage = this.scene.add.image(80, 110, "score");
		this.forfeitImage = this.scene.add.image(77, 243, "forfeit");

		this.coachCornerImage = this.scene.add.image(1625, 193, "coach-corner");
		this.difficultyImage = this.scene.add.image(1747, 411, "difficulty-" + this.coach.getDifficulty() );
        if (this.coach.getDifficulty() == 4) {
            this.coachCornerImage.setTexture("coach-corner-boss");
        }
        this.cardSlot1 = this.scene.add.image(556, 848, "empty");
        this.cardSlot2 = this.scene.add.image(758, 848, "empty");
        this.cardSlot3 = this.scene.add.image(960, 848, "empty");
        this.cardSlot4 = this.scene.add.image(1162, 848, "empty");
        this.cardSlot5 = this.scene.add.image(1364, 848, "empty");

		this.playerLayer = this.scene.add.layer();

        let fontSize = "18px";
        if (this.coach == CoachList.betsy) {
            fontSize = "16px";
        }

        this.coachName = new Phaser.GameObjects.Text(this.scene, 1740, 340, this.coach.getName(), {
			fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
			fontSize,
			color: '#000000',
            stroke: '#000000',
            strokeThickness: 1,
			padding: { x: 5, y: 5 },
			align: 'left'
		});
		this.playerLayer.add(this.coachName);
		this.coachName.setOrigin(0.5, 0.5);

        this.scoreText = new Phaser.GameObjects.Text(this.scene, 150, 68, Library.getNumRuns().toString(), {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: "64px",
            color: '#ffff00',
            stroke: '#ffff00',
            strokeThickness: 1,
            padding: { x: 5, y: 5 },
            align: 'left'
        });
        this.playerLayer.add(this.scoreText);



        this.drawCardsImage = this.scene.add.image(960, 1020, "draw-cards");
        this.selectCardImage = this.scene.add.image(960, 1020, "select-card");
        this.selectPlayerImage = this.scene.add.image(960, 1020, "select-player");
        this.targetOpponentImage = this.scene.add.image(960, 1020, "target-opponent");
        this.startRoundImage = this.scene.add.image(960, 1020, "start-round");
        this.pointerImage = this.scene.add.image(265, 875, "pointer");
        this.pointerImage2 = this.scene.add.image(265, 875, "pointer");
        this.pointerImage3 = this.scene.add.image(265, 875, "pointer");

        this.hideAllInstructions();

		this.playerLayer.add(this.player);
		this.playerLayer.add(this.boss);

        this.player.deck.initializeDeck(CoachList.you.getBaseCards(), this.player);
        this.player.deck.arrangeCardPositions(100, 840);

        this.boss.deck.initializeDeck(this.coach.getBaseCards(), this.boss);

        this.player.createEndTurnButton();

        GameSounds.switchSong(this.scene, this.coach.getSong());

        this.startGameLoop();
	}

	hideAllGymStuff() {
        this.scoreImage.setVisible(false);
        this.scoreText.setVisible(false);
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

    hideAllInstructions() {
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
        this.hideAllInstructions();
        this.drawCardsImage?.setVisible(true);
        this.pointerImage?.setVisible(true);
        this.pointerImage?.setPosition(265, 875);
    }

    showSelectCardImage() {
        this.hideAllInstructions();
        this.selectCardImage?.setVisible(true);
        this.pointerImage?.setVisible(true);
        this.pointerImage?.setPosition(1500, 850);
    }

    showSelectPlayerImage() {
        this.hideAllInstructions();
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
        this.hideAllInstructions();
        this.targetOpponentImage?.setVisible(true);
        this.boss.getAliveMembers().forEach((member) => {
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

    destroy() {
        this.gameOverPrefab?.destroy();
        super.destroy();
    }
	showThrowdown() {
        this.hideAllInstructions();
        this.player.throwdownButton.setVisible(true);
        this.startRoundImage?.setVisible(true);
        this.pointerImage?.setVisible(true);
        this.pointerImage?.setPosition(1715, 775);
        this.pointerImage?.setAngle(-90);
    }

	renderGym() {
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
    }

    setStep(step: number) {
        this.currentStep = step;
        this.nextStep();
    }

	getCurrentStep(): number {
        return this.currentStep - 1;
    }

	startGameLoop() {
        this.currentStep = 0;
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
        log("on DRAW CARDS step");
        this.currentStep++;

        this.showDrawCardsImage();
        this.boss.drawCards();

        // wait for user to draw
    }

    bossAssignAndSelectCards() {
        log("on BOSS ASSIGN AND SELECT CARDS step");
        this.currentStep++;
        this.boss.showAssignedMemberStuff();
        this.boss.assignCards();
        this.boss.targetMembers();
        this.nextStep();
    }

    selectCard() {
        log("on SELECT CARD step");
        this.currentStep++;

        this.player.showAssignedMemberStuff();

        this.showSelectCardImage();
        // wait for user to select card
    }

    selectPlayerMember() {
        log("on SELECT PLAYER MEMBER step");
        this.currentStep++;

        this.showSelectPlayerImage();
        // wait for user to select player
    }

    selectEnemyMember() {
        log("on SELECT ENEMY MEMBER step");
        this.currentStep++;

        this.showTargetOpponentImage();
        // wait for user to select enemy
    }

    startTurn() {
        log("on START TURN step");
        this.currentStep++;

        this.showThrowdown();
        // wait for user to click throwdown button
    }

    discardRemainingCards() {
        log("on DISCARD REMAINING CARDS step");
        this.currentStep++;

        this.hideAllInstructions();
        this.nextStep();
    }

    async executeTurnActions() {
        log("on EXECUTE TURN ACTIONS step");
        this.currentStep++;

        const insta = getUrlParam("insta");
        if (insta === "win") {
            this.boss.members.forEach(member => member.destroyMember(member));
        } else if (insta === "lose") {
            this.player.members.forEach(member => member.destroyMember(member));
        } else {
            await this.player.executeTurn();
            await this.boss.executeTurn();
        }

        this.nextStep();
    }

    checkEndGameCondition() {
        log("on CHECK END GAME CONDITION step");
        this.currentStep++;

        if (this.player.allMembersDead() || this.boss.allMembersDead()) {
            this.hideAllGymStuff();
            this.hideAllInstructions();
            this.player.clearMembers();
            this.boss.clearMembers();
            this.player.clearHand();
            this.player.hideMembers();
            this.boss.clearHand();
            this.player.deck.hideDeck();
            this.player.discardPile.clear();
            this.boss.destroy();
            Card.resetOrder();
        }

        if (this.player.allMembersDead()) {
            
            log("Game over");

            Library.incrementNumRuns();
            this.gameOverPrefab = new GameoverPrefab(this.scene, this.coach.getLosePhrase());
            this.gameOverPrefab.setVisible(true);
            this.scene.add.existing(this.gameOverPrefab);
            GameSounds.playLose();

		    this.scene.events.emit("scene-awake");

            (this.scene.scene.get('Game') as Game).loseThrowdown();
        } else if (this.boss.allMembersDead()) {

            log("You win!");

            this.gameOverPrefab = new GameoverPrefab(this.scene, this.coach.getWinPhrase());
            this.gameOverPrefab.setVisible(true);
            this.scene.add.existing(this.gameOverPrefab);
            GameSounds.playWin();

		    this.scene.events.emit("scene-awake");
            
            (this.scene.scene.get('Game') as Game).winThrowdown();
        } else {
            this.nextStep();
        }
    }

    loopBack() {
        log("on LOOP BACK step");
        this.player.clearMembers();
        this.boss.clearMembers();
        this.player.clearHand();
        this.boss.clearHand();
        Card.resetOrder();

        if (this.player.deck.getCards().length < 5) {
            this.player.recombineDeck();
            this.player.deck.arrangeCardPositions(100, 840);
        }
        if (this.boss.deck.getCards().length < 5) {
            this.boss.recombineDeck();
        }

        this.currentStep = 0;
        this.nextStep();
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
