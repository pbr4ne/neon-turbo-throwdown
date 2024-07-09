
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";
import Team from "./Team";
/* END-USER-IMPORTS */

export default class Character extends Team {

	constructor() {
		super("Character", true);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

    private throwdownButton!: Phaser.GameObjects.Image;

	create() {
        super.create();

        const deckArea = this.deck.drawDeck(100, 840);
        deckArea.on("pointerdown", this.onDeckClick.bind(this));

        this.createEndTurnButton();
        this.checkEndTurnButtonVisibility();

        this.events.emit("characterReady");
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
        const player1 = new Player(this, 720, 459, 'player1a', true);
        this.add.existing(player1);
        player1.sprite.play('player1_anim');
        player1.on("pointerdown", () => this.handlePlayerClick(player1));
        this.players.push(player1);

        const player2 = new Player(this, 950, 583, 'player2a', true);
        this.add.existing(player2);
        player2.sprite.play('player2_anim');
        player2.on("pointerdown", () => this.handlePlayerClick(player2));
        this.players.push(player2);

        const player3 = new Player(this, 1211, 453, 'player3a', true);
        this.add.existing(player3);
        player3.sprite.play('player3_anim');
        player3.on("pointerdown", () => this.handlePlayerClick(player3));
        this.players.push(player3);
    }

    handlePlayerClick(player: Player) {
        super.handlePlayerClick(player);
        this.checkEndTurnButtonVisibility();
    }

    createEndTurnButton() {
        this.throwdownButton = this.add.image(1660, 940, 'throwdownButton')
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.endTurn());

        this.throwdownButton.setVisible(false);
    }

    checkEndTurnButtonVisibility() {
        const allPlayersHaveCards = this.players.every(player => player.getAssignedCards().length > 0);
        this.throwdownButton.setVisible(allPlayersHaveCards);
    }

    endTurn() {
        this.throwdownButton.setVisible(false);
        this.executeTurn();
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
