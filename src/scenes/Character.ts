
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";
import Team from "./Team";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
import Game from "./Game";
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

    addPlayers() {
        const player1 = new Player(this, 720, 459, 'player', true, this);
        this.add.existing(player1);
        player1.on("pointerdown", () => this.handlePlayerClick(player1));
        this.players.push(player1);

        const player2 = new Player(this, 950, 583, 'player', true, this);
        this.add.existing(player2);
        player2.on("pointerdown", () => this.handlePlayerClick(player2));
        this.players.push(player2);

        const player3 = new Player(this, 1211, 453, 'player', true, this);
        this.add.existing(player3);
        player3.on("pointerdown", () => this.handlePlayerClick(player3));
        this.players.push(player3);

        const floatingObjectPlayer1 = new FloatingObjectScript(player1);
        const floatingObjectPlayer2 = new FloatingObjectScript(player2);
        const floatingObjectPlayer3 = new FloatingObjectScript(player3);
    }

    handlePlayerClick(player: Player) {
        super.handlePlayerClick(player);
        this.checkEndTurnButtonVisibility();
    }

    createEndTurnButton() {
        this.throwdownButton = this.add.image(1660, 940, 'throwdownButton')
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => (this.scene.get('Game') as Game).endTurn());

        this.throwdownButton.setVisible(false);
    }

    checkEndTurnButtonVisibility() {
        const allPlayersHaveCards = this.players.every(player => player.getAssignedCards().length > 0);
        this.throwdownButton.setVisible(allPlayersHaveCards);
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
