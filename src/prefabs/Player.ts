
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
		this.deck.renderDeck(100, 840);
        this.deck.on("deckClicked", this.onDeckClick.bind(this));

        this.createEndTurnButton();
        this.checkEndTurnButtonVisibility();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	private throwdownButton!: Phaser.GameObjects.Image;
    private selectedThrowMember: Member | null = null;
    private intendedTarget: Member | null = null;
    private targetArc: Phaser.GameObjects.Graphics | null = null;

	addMembers() {
        const member1 = new Member(this.scene, 720, 459, 'player', true, this);
        const member2 = new Member(this.scene, 950, 583, 'player', true, this);
        const member3 = new Member(this.scene, 1211, 453, 'player', true, this);

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

    handleMemberClick(member: Member) {
        this.hand.assignCardToMember(member);
        super.handleMemberClick(member);

        // Check if the selected member has a THROW card
        if (member.getAssignedCards().includes("THROW")) {
            this.selectedThrowMember = member;
        } else {
            this.selectedThrowMember = null;
        }

        this.checkEndTurnButtonVisibility();
    }

    createEndTurnButton() {
		this.throwdownButton = new Phaser.GameObjects.Image(this.scene, 1660, 940, 'throwdownButton')
			.setOrigin(0.5)
			.setInteractive()
			.setVisible(false)
			.on('pointerdown', () => (this.scene.scene.get('Game') as Game).endTurn());
        this.add(this.throwdownButton);
    }

    checkEndTurnButtonVisibility() {
        const allMembersHaveCards = this.members.every(member => member.getAssignedCards().length > 0);
        this.throwdownButton.setVisible(allMembersHaveCards);
    }

    handleEnemyClick(enemy: Member) {
        if (this.selectedThrowMember) {
            this.intendedTarget = enemy;
            this.drawTargetArc();
        }
    }

    drawTargetArc() {
        if (this.targetArc) {
            this.targetArc.clear();
        } else {
            this.targetArc = this.scene.add.graphics();
        }
    
        if (this.selectedThrowMember && this.intendedTarget) {
            const startX = this.selectedThrowMember.x;
            const startY = this.selectedThrowMember.y;
            const endX = this.intendedTarget.x;
            const endY = this.intendedTarget.y;
    
            this.targetArc.lineStyle(3, 0xffff00, 1);
            this.targetArc.beginPath();
    
            this.targetArc.moveTo(startX, startY);
            this.targetArc.lineTo(endX, endY);
            this.targetArc.strokePath();
        }
    }

    performThrow(thrower: Member, target: Member) {
        const damage = Phaser.Math.Between(1, 10);
        target.hit(damage);
        console.log(`Member ${thrower} throws at ${target} for ${damage} damage`);
    }

    executeTurn() {
        if (this.selectedThrowMember && this.intendedTarget) {
            this.performThrow(this.selectedThrowMember, this.intendedTarget);
            this.selectedThrowMember = null;
            this.intendedTarget = null;
            if (this.targetArc) {
                this.targetArc.clear();
            }
        }else {
            super.executeTurn();
        }
    }
    
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
