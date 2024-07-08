
// You can write more code here

/* START OF COMPILED CODE */

import Card from "./Card";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Deck {
    private scene: Phaser.Scene;
    private cards: Card[];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.cards = [];
    }

    addCard(card: Card) {
        this.cards.push(card);
    }

    drawCard(): Card | undefined {
        return this.cards.pop();
    }

    shuffle() {
        Phaser.Utils.Array.Shuffle(this.cards);
    }

    createDeck() {
        const cardTypes = ["BLOCK", "DODGE", "CATCH", "THROW"];

        for (let i = 0; i < 10; i++) {
            const cardType = cardTypes[Phaser.Math.Between(0, cardTypes.length - 1)];
            const card = new Card(this.scene, 0, 0, "cardFront");
            card.setType(cardType);
            card.showName(false);
            this.addCard(card);
        }

        this.shuffle();
    }

    drawDeck(x: number, y: number) {
        const offset = 10;

        for (let index = this.cards.length - 1; index >= 0; index--) {
            const card = this.cards[index];
            card.setTexture("cardBack");
            card.setPosition(x + (this.cards.length - 1 - index) * offset, y + (this.cards.length - 1 - index) * offset);
            this.scene.add.existing(card);
        }
    }
}