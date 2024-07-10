
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Member from "../prefabs/Member";
import Team from "./Team";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
/* END-USER-IMPORTS */

export default class Opponent extends Team {

	constructor() {
		super("Opponent", false);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		this.add.image(1674, 274, "opponentBorder");

		this.events.emit("scene-awake");
	}

	create(data: any) {
        super.create(data);

        for (let i = 0; i < 5; i++) {
            this.onDeckClick();
        }

        this.assignRandomCardsToMembers();

        this.add.image(1780, 140, "opponent1").setOrigin(1, 0);

        this.events.emit("opponentReady");
    }

    assignRandomCardsToMembers() {
        this.members.forEach(member => {
            if (this.hand.getCards().length > 0) {
                const randomIndex = Phaser.Math.Between(0, this.hand.getCards().length - 1);
                const randomCard = this.hand.getCards()[randomIndex];
                const cardType = randomCard.getCardType();
                const whiteIconTexture = randomCard.getWhiteIconTexture();

                member.assignCard(cardType, whiteIconTexture);

                this.hand.getCards().splice(randomIndex, 1);
            }
        });
    }

    addMembers() {
        const enemy1 = new Member(this, 730, 259, 'enemy', false, this);
        this.layer.add(enemy1);
        this.members.push(enemy1);

        const enemy2 = new Member(this, 950, 213, 'enemy', false, this);
        this.layer.add(enemy2);
        this.members.push(enemy2);

        const enemy3 = new Member(this, 1180, 253, 'enemy', false, this);
        this.layer.add(enemy3);
        this.members.push(enemy3);

        const floatingObjectMember1 = new FloatingObjectScript(enemy1);
        const floatingObjectMember2 = new FloatingObjectScript(enemy2);
        const floatingObjectMember3 = new FloatingObjectScript(enemy3);
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
