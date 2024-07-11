
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Game from "../scenes/Game";
import Member from "./Member";
import Team from "./Team";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
import { GameSteps } from '../throwdown/GameSteps';
import { CardType } from "../throwdown/CardType";
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
    private selectedThrowMember: Member | null = null;
    private targetArc: Phaser.GameObjects.Graphics | null = null;
    private currentMember: Member | null = null;

	addMembers() {
        const member1 = new Member(this.scene, 558, 404, 'player1', true, this, 1);
        const member2 = new Member(this.scene, 947, 516, 'player2', true, this, 2);
        const member3 = new Member(this.scene, 1325, 404, 'player3', true, this, 3, true);

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

    onDeckClick() {
        super.onDeckClick();
        var currentStep = (this.scene.scene.get('Game') as Game).getCurrentStep();
        if (currentStep == GameSteps.DRAW_CARDS && this.hand.getCards().length == 5) {
            console.log('go to next step');
            (this.scene.scene.get('Game') as Game).nextStep();
        }
    }

    handleMemberClick(member: Member) {
        var currentStep = (this.scene.scene.get('Game') as Game).getCurrentStep();

        if (currentStep == GameSteps.SELECT_PLAYER_MEMBER) {
            super.handleMemberClick(member);

            this.hand.assignCardToMember(member);

            this.currentMember = member;
 
        } else {
            console.log("can't click on member now");
            return;
        }
    }

    createEndTurnButton() {
		this.throwdownButton = new Phaser.GameObjects.Image(this.scene, 1710, 850, 'throwdown-button')
			.setOrigin(0.5)
			.setInteractive()
			.setVisible(false)
			.on('pointerdown', () => (this.scene.scene.get('Game') as Game).nextStep());
        this.add(this.throwdownButton);
        this.throwdownButton.on('pointerover', () => { this.scene.input.setDefaultCursor('pointer'); });
        this.throwdownButton.on('pointerout', () => { this.scene.input.setDefaultCursor('default'); });
    }

    handleEnemyClick(enemy: Member) {
        var currentStep = (this.scene.scene.get('Game') as Game).getCurrentStep();

        if (currentStep != GameSteps.SELECT_ENEMY_MEMBER) {
            console.log("can't click on enemy now");
            return;
        }

        super.handleMemberClick(enemy);

        if (this.currentMember) {
            this.currentMember.setIntendedTarget(enemy);
            
            this.drawTargetArc(this.currentMember, enemy);

            const allMembersHaveCards = this.members.every(member => member.getAssignedCards().length > 0);
            if (allMembersHaveCards) {
                this.currentMember = null;
                (this.scene.scene.get('Game') as Game).nextStep();
            } else {
                this.currentMember = null;
                (this.scene.scene.get('Game') as Game).setStep(GameSteps.SELECT_CARD);
            }  
        }
    }

    checkAllThrowersHaveTargets(): boolean {
        // Check if all members with a throw card have a selected target
        return this.members
            .filter(member => member.getAssignedCards().some(card => card.cardType === CardType.throw))
            .every(member => member.getIntendedTarget() !== null);
    }

    drawTargetArc(thrower: Member, target: Member) {
        if (this.targetArc) {
            this.targetArc.clear();
        } else {
            this.targetArc = this.scene.add.graphics();
        }

        const startX = thrower.x;
        const startY = thrower.y;
        const endX = target.x;
        const endY = target.y;

        this.targetArc.lineStyle(3, 0xffff00, 1);
        this.targetArc.beginPath();

        this.targetArc.moveTo(startX, startY);
        this.targetArc.lineTo(endX, endY);
        this.targetArc.strokePath();
    }

    clearMembers() {
        super.clearMembers();
        this.targetArc?.clear();
    }

    getUnassignedMembers(): Member[] {
        return this.members.filter(member => member.getAssignedCards().length === 0);
    }
    
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
