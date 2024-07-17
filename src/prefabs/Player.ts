
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Game from "../scenes/Game";
import Member from "./Member";
import Team from "./Team";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
import { GameSteps } from '../throwdown/GameSteps';
import { log } from "../utilities/GameUtils";
import { CoachList } from "../throwdown/CoachList";
/* END-USER-IMPORTS */

export default class Player extends Team {

	constructor(scene: Phaser.Scene) {
		super(scene, true);

		/* START-USER-CTR-CODE */
        this.add(this.deck);
        this.deck.on("deckClicked", this.onDeckClick.bind(this));

        this.createEndTurnButton();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	public throwdownButton!: Phaser.GameObjects.Image;
    private currentMember: Member | null = null;

	addMembers() {
        log("adding new members");
        this.destroyMembers();

        const member1 = new Member(this.scene, 558, 404, 'player1', true, this, CoachList.you, 1);
        const member2 = new Member(this.scene, 947, 516, 'player2', true, this, CoachList.you, 2);
        const member3 = new Member(this.scene, 1325, 404, 'player3', true, this, CoachList.you, 3, true);

        this.add(member1);
        this.add(member2);
        this.add(member3);

        member1.on("pointerdown", () => this.handleMemberClick(member1));
        member2.on("pointerdown", () => this.handleMemberClick(member2));
        member3.on("pointerdown", () => this.handleMemberClick(member3));

        this.members.push(member1);
        this.members.push(member2);
        this.members.push(member3);

        const floatingObjectMember1 = new FloatingObjectScript(member1);
        const floatingObjectMember2 = new FloatingObjectScript(member2);
        const floatingObjectMember3 = new FloatingObjectScript(member3);
    }

    destroyMembers() {
        this.members.forEach(member => {
            member.destroyMember(member);
        });
    }

    hideMembers() {
        this.members.forEach(member => {
            member.hide();
        });
    }

    onDeckClick() {
        super.onDeckClick();
        var currentStep = this.throwdown.getCurrentStep();
        if (currentStep == GameSteps.DRAW_CARDS && this.hand.getCards().length == 5) {
            log('go to next step');
            (this.scene.scene.get('Game') as Game).throwdown.nextStep();
        }
    }

    handleMemberClick(member: Member): void {
        if (!this.throwdown) {
            log("throwdown not initialized");
            return;
        }
        var currentStep = this.throwdown.getCurrentStep();

        if (currentStep == GameSteps.SELECT_PLAYER_MEMBER) {

            this.hand.assignCardToMember(member);

            this.currentMember = member;
 
        } else {
            log("can't click on member now");
            return;
        }
    }

    createEndTurnButton() {
		this.throwdownButton = new Phaser.GameObjects.Image(this.scene, 1710, 850, 'throwdown-button')
			.setOrigin(0.5)
			.setInteractive()
			.setVisible(false)
			.on('pointerdown', () => this.throwdown.nextStep());
        this.add(this.throwdownButton);
        this.throwdownButton.on('pointerover', () => { this.scene.input.setDefaultCursor('pointer'); });
        this.throwdownButton.on('pointerout', () => { this.scene.input.setDefaultCursor('default'); });
    }

    handleEnemyClick(enemy: Member) {
        var currentStep = this.throwdown.getCurrentStep();

        if (currentStep != GameSteps.SELECT_ENEMY_MEMBER) {
            log("can't click on enemy now");
            return;
        }

        if (this.currentMember) {
            if (enemy.getHP() <= 0) {
                log("can't target a dead member");
                return;
            }
            this.currentMember.setIntendedTarget(enemy);

            const allMembersHaveCards = this.getAliveMembers().every(member => member.getAssignedCard() != null);
            if (allMembersHaveCards) {
                this.currentMember = null;
                this.throwdown.nextStep();
            } else {
                this.currentMember = null;
                this.throwdown.setStep(GameSteps.SELECT_CARD);
            }  
        } else {
            log("no current member selected");
        }
    }

    clearMembers() {
        super.clearMembers();
        this.members.forEach(member => {
            member.clearTargetArc();
        });
    }

    getUnassignedMembers(): Member[] {
        return this.getAliveMembers().filter(member => member.getAssignedCard() == null);
    }
    
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */
