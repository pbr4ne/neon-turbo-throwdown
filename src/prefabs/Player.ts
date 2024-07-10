
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
		const deckArea = this.deck.drawDeck(100, 840);
        deckArea.on("pointerdown", this.onDeckClick.bind(this));

        this.createEndTurnButton();
        this.checkEndTurnButtonVisibility();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	private throwdownButton!: Phaser.GameObjects.Image;

	addMembers() {
        const member1 = new Member(this.scene, 720, 459, 'player', true, this);
        this.add(member1);
        member1.on("pointerdown", () => this.handleMemberClick(member1));
        this.members.push(member1);

        const member2 = new Member(this.scene, 950, 583, 'player', true, this);
        this.add(member2);
        member2.on("pointerdown", () => this.handleMemberClick(member2));
        this.members.push(member2);

        const member3 = new Member(this.scene, 1211, 453, 'player', true, this);
        this.add(member3);
        member3.on("pointerdown", () => this.handleMemberClick(member3));
        this.members.push(member3);

        const floatingObjectMember1 = new FloatingObjectScript(member1);
        const floatingObjectMember2 = new FloatingObjectScript(member2);
        const floatingObjectMember3 = new FloatingObjectScript(member3);
    }

    handleMemberClick(member: Member) {
        super.handleMemberClick(member);
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
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
