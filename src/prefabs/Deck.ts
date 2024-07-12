
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Card from "./Card";
import { CardType } from "../cards/CardType";
/* END-USER-IMPORTS */

export default class Deck extends Phaser.GameObjects.Container {
    private cards: Card[];

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.cards = [];
        this.scene.add.existing(this);
    }

    initializeStartingDeck(cardTypes: CardType[]) {
        this.cards = [];

        cardTypes.forEach(cardType => {
            const card = new Card(this.scene, cardType, 0, 0, "front");
            card.showName(false);
            card.showIcon(false);
            this.cards.push(card);
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

    addCard(card: Card) {
        this.cards.push(card);
    }

    clear() {
        this.cards = [];
    }
}