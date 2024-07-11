
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Card from "./Card";
import { CardType } from "../enums/CardType";
/* END-USER-IMPORTS */

export default class Deck extends Phaser.GameObjects.Container {
    private cards: Card[];

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.cards = [];
        this.scene.add.existing(this);
    }

    buildDeck() {
        this.cards = [];

        // Define the specific makeup of the deck
        const deckMakeup = [
            { type: CardType.throw, count: 4 },
            { type: CardType.evade, count: 3 },
            { type: CardType.block, count: 2 },
            { type: CardType.catch, count: 1 },
        ];

        // Create the cards based on the deck makeup
        deckMakeup.forEach(cardType => {
            for (let i = 0; i < cardType.count; i++) {
                const card = new Card(this.scene, 0, 0, "front");
                card.setType(cardType.type);
                card.showName(false);
                card.showIcon(false);
                this.cards.push(card);
            }
        });

        this.shuffle();
        console.log("built deck");
    }

    drawCard(): Card | undefined {
        return this.cards.pop();
    }

    shuffle(): this {
        Phaser.Utils.Array.Shuffle(this.cards);
        return this;
    }

    renderDeck(x: number, y: number) {
        const offset = 5;

        this.cards.forEach((card, index) => {
            card.setTexture("back");
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

    removeCard(card: Card) {
        const index = this.cards.indexOf(card);
        if (index > -1) {
            this.cards.splice(index, 1);
        }
    }
}