
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Deck from "../prefabs/Deck";
import Hand from "../prefabs/Hand";
import Player from "../prefabs/Player";
/* END-USER-IMPORTS */

export default class Opponent extends Phaser.Scene {

	constructor() {
		super("Opponent");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		this.add.image(1674, 274, "opponentBorder");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	private opponentDeck!: Deck;
    private opponentHand!: Hand;
    private opponentPlayers!: Player[];
    private opponentImage!: Phaser.GameObjects.Image;

	create() {

		this.editorCreate();

        this.opponentDeck = new Deck(this);
        this.opponentHand = new Hand(this, 5);
        this.opponentPlayers = [];

        this.opponentDeck.createDeck();

        for (let i = 0; i < 5; i++) {
            const card = this.opponentDeck.drawCard();
            if (card) {
                card.setTexture("cardBack");
                card.showName(false);
                card.showIcon(false);
                this.opponentHand.addCard(card);
            }
        }

		this.createEnemyAnimations();
        this.addEnemies();

        this.assignRandomCardsToPlayers();

        this.opponentImage = this.add.image(1780, 140, "opponent1").setOrigin(1, 0); 
    
	}

    assignRandomCardsToPlayers() {
        this.opponentPlayers.forEach(player => {
            if (this.opponentHand.getCards().length > 0) {
                const randomIndex = Phaser.Math.Between(0, this.opponentHand.getCards().length - 1);
                const randomCard = this.opponentHand.getCards()[randomIndex];
                const cardType = randomCard.getCardType();
                const whiteIconTexture = randomCard.getWhiteIconTexture();

                player.assignCard(cardType, whiteIconTexture);
                console.log("Assigned card to player: " + cardType);

                this.opponentHand.getCards().splice(randomIndex, 1);
            }
        });
    }

    addEnemies() {
        const enemy1 = new Player(this, 730, 259, 'enemy1a', false);
        this.add.existing(enemy1);
        enemy1.sprite.play('enemy1_anim');
        this.opponentPlayers.push(enemy1);

        const enemy2 = new Player(this, 950, 213, 'enemy2a', false);
        this.add.existing(enemy2);
        enemy2.sprite.play('enemy2_anim');
        this.opponentPlayers.push(enemy2);

        const enemy3 = new Player(this, 1180, 253, 'enemy3a', false);
        this.add.existing(enemy3);
        enemy3.sprite.play('enemy3_anim');
        this.opponentPlayers.push(enemy3);
    }

	createEnemyAnimations() {
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

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
