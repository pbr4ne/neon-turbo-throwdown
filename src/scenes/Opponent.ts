
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";
import Team from "./Team";
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

	create() {
        super.create();
        this.opponentPlayers = (this.scene.get('Character') as Team).players; // Access character players

        for (let i = 0; i < 5; i++) {
            this.onDeckClick();
        }

        this.assignRandomCardsToPlayers();
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

    createPlayerAnimations() {
        this.anims.create({
            key: 'enemy1_anim',
            frames: [
                { key: 'enemy1a' },
                { key: 'enemy1b' },
                { key: 'enemy1c' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy2_anim',
            frames: [
                { key: 'enemy2a' },
                { key: 'enemy2b' },
                { key: 'enemy2c' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy3_anim',
            frames: [
                { key: 'enemy3a' },
                { key: 'enemy3b' },
                { key: 'enemy3c' }
            ],
            frameRate: 3,
            repeat: -1
        });
    }

    addPlayers() {
        const enemy1 = new Player(this, 730, 259, 'enemy1a', false);
        this.add.existing(enemy1);
        enemy1.sprite.play('enemy1_anim');
        this.players.push(enemy1);

        const enemy2 = new Player(this, 950, 213, 'enemy2a', false);
        this.add.existing(enemy2);
        enemy2.sprite.play('enemy2_anim');
        this.players.push(enemy2);

        const enemy3 = new Player(this, 1180, 253, 'enemy3a', false);
        this.add.existing(enemy3);
        enemy3.sprite.play('enemy3_anim');
        this.players.push(enemy3);
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
