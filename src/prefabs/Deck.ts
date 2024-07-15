
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Card from "./Card";
import { CardType } from "../cards/CardType";
import Team from "./Team";
import Player from "./Player";
import { log } from "../utilities/GameUtils";
/* END-USER-IMPORTS */

export default class Deck extends Phaser.GameObjects.Container {
    private cards: Card[];

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.cards = [];
        this.scene.add.existing(this);
    }

    initializeDeck(cardTypes: CardType[], team: Team) {
        log(`initializeDeck: cards to add:`);
        cardTypes.forEach(cardType => {
            log(`${cardType}`);
        });
        this.cards = [];

        const cardState = team instanceof Player ? "playerDeck" : "bossDeck";

        cardTypes.forEach(cardType => {
            const card = new Card(this.scene, cardType, cardState, 0, 0, "front");
            this.cards.push(card);
        });

        this.shuffle();
        log(`built ${cardState}`);
    }

    drawCard(): Card | undefined {
        return this.cards.pop();
    }

    shuffle(): this {
        Phaser.Utils.Array.Shuffle(this.cards);
        return this;
    }

    hideDeck() {
        this.cards.forEach(card => {
            card.changeState("playerDeckHidden");
        });
    }

    arrangeCardPositions(x: number, y: number) {
        const offset = 60 / this.cards.length;

        this.cards.forEach((card, index) => {
            card.setPosition(x + index * offset, y + index * offset);
            this.add(card);
        });

        this.updateTopCardInteraction();
    }

    updateTopCardInteraction() {
        if (this.cards.length > 0) {
            const topCard = this.cards[this.cards.length - 1];
            topCard.setInteractive();
            topCard.on('pointerdown', () => {
                this.emit('deckClicked');
            });
        }
    }

    getCards(): Card[] {
        return this.cards;
    }

    addCard(card: Card) {
        log(`adding card to deck: ${card.toString()}`);
        this.cards.push(card);
    }

    clear() {
        log(`cleared deck`);
        this.cards = [];
    }

    resetCards() {
        this.cards.forEach(card => {
            card.getCardType().resetTurn();
        });
    }
}