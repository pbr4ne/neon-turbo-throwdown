
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
        const member1 = new Member(this.scene, 720, 459, 'player', true, this, 1);
        const member2 = new Member(this.scene, 950, 583, 'player', true, this, 2);
        const member3 = new Member(this.scene, 1211, 453, 'player', true, this, 3);

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
        if (this.hand.getCards().length == 5) {
            console.log('go to next step');
            (this.scene.scene.get('Game') as Game).nextStep();
        }
    }

    handleMemberClick(member: Member) {
        console.log((this.scene.scene.get('Game') as Game).getCurrentStep());

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

            if (member.getAssignedCards().includes("THROW")) {
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

    // checkEndTurnButtonVisibility() {
    //     const allMembersHaveCards = this.members.every(member => member.getAssignedCards().length > 0);
    //     this.throwdownButton.setVisible(allMembersHaveCards);
    // }

    handleEnemyClick(enemy: Member) {
        
        if (this.selectedThrowMember) {
            this.selectedThrowMember.setIntendedTarget(enemy);
            console.log(`${this.selectedThrowMember} targets ${enemy}`);
            this.drawTargetArc(this.selectedThrowMember, enemy);

             // Check if all members with a THROW card have a selected target
             const allThrowersHaveTargets = this.members
             .filter(member => member.getAssignedCards().includes("THROW"))
             .every(member => member.getIntendedTarget() !== null);

            // If all THROW members have a target, proceed to the next step
            if (allThrowersHaveTargets) {
                (this.scene.scene.get('Game') as Game).nextStep();
            }
        }
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

    performThrow(thrower: Member, target: Member) {
        const damage = 1;
        target.hit(damage);
        console.log(`${thrower} hits ${target} for ${damage} damage`);
    }

    executeTurn() {
        this.members.forEach(member => {
            const target = member.getIntendedTarget();
            console.log(`${member} intends to target ${target}`);
            if (target) {
                this.performThrow(member, target);
                member.setIntendedTarget(null); // Clear the target after the throw
            }
        });
    }
    
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
