
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Game from "../scenes/Game";
import Member from "./Member";
import Team from "./Team";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
/* END-USER-IMPORTS */

export default class Player extends Team {

	constructor(scene: Phaser.Scene) {
		super(scene, true);

		/* START-USER-CTR-CODE */
        this.add(this.deck);
        this.deck.on("deckClicked", this.onDeckClick.bind(this));

        this.createEndTurnButton();
        //this.checkEndTurnButtonVisibility();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	public throwdownButton!: Phaser.GameObjects.Image;
    private selectedThrowMember: Member | null = null;
    private targetArc: Phaser.GameObjects.Graphics | null = null;

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
        if (currentStep == 0 && this.hand.getCards().length == 5) {
            console.log('go to next step');
            (this.scene.scene.get('Game') as Game).nextStep();
        }
    }

    handleMemberClick(member: Member) {
        var currentStep = (this.scene.scene.get('Game') as Game).getCurrentStep();

        if (currentStep == 1) {
            super.handleMemberClick(member);

            this.hand.assignCardToMember(member);

            // Check if all members have at least one card assigned
            const allMembersHaveCards = this.members.every(member => member.getAssignedCards().length > 0);

            // If all members have a card assigned, proceed to the next step
            if (allMembersHaveCards) {
                (this.scene.scene.get('Game') as Game).nextStep();
            }

        } else if (currentStep == 2) {
            super.handleMemberClick(member);

            if (member.getAssignedCards().includes("throw")) {
                this.selectedThrowMember = member;
            } else {
                this.selectedThrowMember = null;
            }
           
        } else {
            console.log("can't click on member now");
            return;
        }
    }

    createEndTurnButton() {
		this.throwdownButton = new Phaser.GameObjects.Image(this.scene, 1660, 940, 'throwdownButton')
			.setOrigin(0.5)
			.setInteractive()
			.setVisible(false)
			.on('pointerdown', () => (this.scene.scene.get('Game') as Game).nextStep());
        this.add(this.throwdownButton);
    }

    handleEnemyClick(enemy: Member) {
        var currentStep = (this.scene.scene.get('Game') as Game).getCurrentStep();

        if (currentStep != 2) {
            console.log("can't click on enemy now");
            return;
        }
        if (this.selectedThrowMember) {
            this.selectedThrowMember.setIntendedTarget(enemy);
            
            this.drawTargetArc(this.selectedThrowMember, enemy);

             if (this.checkAllThrowersHaveTargets()) {
                (this.scene.scene.get('Game') as Game).nextStep();
             }
        }
    }

    checkAllThrowersHaveTargets(): boolean {
        // Check if all members with a throw card have a selected target
        return this.members
        .filter(member => member.getAssignedCards().includes("throw"))
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
    
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
