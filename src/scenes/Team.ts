
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Deck from "../prefabs/Deck";
import Hand from "../prefabs/Hand";
import Player from "../prefabs/Player";
/* END-USER-IMPORTS */

export default abstract class Team extends Phaser.Scene {

	constructor(key: string, visibleCards: boolean) {
		super(key);

		/* START-USER-CTR-CODE */
		this.visibleCards = visibleCards;
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	protected deck!: Deck;
    protected hand!: Hand;
    public players!: Player[];
    public opponentPlayers!: Player[];
	protected visibleCards!: boolean;

	create() {

		this.editorCreate();

		this.players = [];
        this.deck = new Deck(this);
        this.hand = new Hand(this, 5);

        this.deck.createDeck();
        
        this.addPlayers();
	}

    abstract addPlayers(): void;

    setOpponentPlayers(opponentPlayers: Player[]) {
        this.opponentPlayers = opponentPlayers;
    }

    handlePlayerClick(player: Player) {
        this.hand.assignCardToPlayer(player);
    }

    onDeckClick() {
        if (this.hand.getCards().length < 5) {
            const topCard = this.deck.drawCard();
            if (topCard) {
                topCard.setTexture("cardFront");
                topCard.showName(this.visibleCards);
                topCard.showIcon(this.visibleCards);
                this.hand.addCard(topCard);
            }
        }
    }

    executeTurn() {
        const thrower = this.selectRandomPlayerWithCard("THROW", this.players);
        if (thrower) {
            const target = this.selectRandomPlayer(this.opponentPlayers);
            if (target) {
                const damage = Phaser.Math.Between(1, 10);
                target.hit(damage);
                console.log(`Player ${thrower} hits ${target} for ${damage} damage`);
            }
        }
    }

    selectRandomPlayerWithCard(cardType: string, players: Player[]): Player | null {
        const eligiblePlayers = players.filter(player => player.getAssignedCards().includes(cardType));
        if (eligiblePlayers.length > 0) {
            const randomIndex = Phaser.Math.Between(0, eligiblePlayers.length - 1);
            return eligiblePlayers[randomIndex];
        }
        return null;
    }

    selectRandomPlayer(players: Player[]): Player | null {
        if (players.length > 0) {
            const randomIndex = Phaser.Math.Between(0, players.length - 1);
            return players[randomIndex];
        }
        return null;
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
