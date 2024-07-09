
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";
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

        this.assignRandomCardsToPlayers();

        this.add.image(1780, 140, "opponent1").setOrigin(1, 0);

        this.events.emit("opponentReady");
    }

    assignRandomCardsToPlayers() {
        this.players.forEach(player => {
            if (this.hand.getCards().length > 0) {
                const randomIndex = Phaser.Math.Between(0, this.hand.getCards().length - 1);
                const randomCard = this.hand.getCards()[randomIndex];
                const cardType = randomCard.getCardType();
                const whiteIconTexture = randomCard.getWhiteIconTexture();

                player.assignCard(cardType, whiteIconTexture);

                this.hand.getCards().splice(randomIndex, 1);
            }
        });
    }

    addPlayers() {
        const enemy1 = new Player(this, 730, 259, 'enemy', false, this);
        this.layer.add(enemy1);
        this.players.push(enemy1);

        const enemy2 = new Player(this, 950, 213, 'enemy', false, this);
        this.layer.add(enemy2);
        this.players.push(enemy2);

        const enemy3 = new Player(this, 1180, 253, 'enemy', false, this);
        this.layer.add(enemy3);
        this.players.push(enemy3);

        const floatingObjectPlayer1 = new FloatingObjectScript(enemy1);
        const floatingObjectPlayer2 = new FloatingObjectScript(enemy2);
        const floatingObjectPlayer3 = new FloatingObjectScript(enemy3);
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
