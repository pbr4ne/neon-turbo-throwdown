
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Deck from "../prefabs/Deck";
import Hand from "../prefabs/Hand";
import Player from "../prefabs/Player";
/* END-USER-IMPORTS */

export default class Character extends Phaser.Scene {

	constructor() {
		super("Character");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	private playerDeck!: Deck;
    private playerHand!: Hand;
	private players!: Player[];
	private drawCount: number = 0;

	create() {

		this.editorCreate();

		this.players = [];
		this.playerDeck = new Deck(this);
        this.playerHand = new Hand(this, 5);

		this.playerDeck.createDeck();

		const deckArea = this.playerDeck.drawDeck(100, 840);
        deckArea.on("pointerdown", this.onDeckClick.bind(this));

        this.createPlayerAnimations();
        this.addPlayers();
	}

	createPlayerAnimations() {
        this.anims.create({
            key: 'player1_anim',
            frames: [
                { key: 'player1a' },
                { key: 'player1b' },
                { key: 'player1c' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'player2_anim',
            frames: [
                { key: 'player2a' },
                { key: 'player2b' },
                { key: 'player2c' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'player3_anim',
            frames: [
                { key: 'player3a' },
                { key: 'player3b' },
                { key: 'player3c' }
            ],
            frameRate: 3,
            repeat: -1
        });
    }

	addPlayers() {
        const player1 = new Player(this, 720, 459, 'player1a');
        this.add.existing(player1);
        player1.sprite.play('player1_anim');
        player1.on("pointerdown", () => this.handlePlayerClick(player1));
        this.players.push(player1);

        const player2 = new Player(this, 950, 583, 'player2a');
        this.add.existing(player2);
        player2.sprite.play('player2_anim');
        player2.on("pointerdown", () => this.handlePlayerClick(player2));
        this.players.push(player2);

        const player3 = new Player(this, 1211, 453, 'player3a');
        this.add.existing(player3);
        player3.sprite.play('player3_anim');
        player3.on("pointerdown", () => this.handlePlayerClick(player3));
        this.players.push(player3);
    }

    handlePlayerClick(player: Player) {
        this.playerHand.assignCardToPlayer(player);
    }

    onDeckClick() {
        if (this.drawCount < 5) {
            const topCard = this.playerDeck.drawCard();
            if (topCard) {
                topCard.setTexture("cardFront");
                topCard.showName(true);
                topCard.showIcon(true);
                this.playerHand.addCard(topCard);
                this.drawCount++;
            }
        }
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
