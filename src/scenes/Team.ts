
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
    protected opponentPlayers!: Player[];
	protected visibleCards!: boolean;

	create() {

		this.editorCreate();

		this.players = [];
        this.deck = new Deck(this);
        this.hand = new Hand(this, 5);

        this.deck.createDeck();
        

        this.createPlayerAnimations();
        this.addPlayers();
	}

	abstract createPlayerAnimations(): void;

    abstract addPlayers(): void;

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
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
