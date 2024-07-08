
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

        for (let i = 0; i < 20; i++) { 
            const cardType = cardTypes[Phaser.Math.Between(0, cardTypes.length - 1)];
            const card = new Card(this.scene, 0, 0, "cardFront");
            card.setType(cardType);
            this.addCard(card);
        }

        this.shuffle();
    }

	drawDeck(x: number, y: number) {
        const offset = 5; // Offset in pixels for overlapping effect

        this.cards.forEach((card, index) => {
            card.setTexture("cardBack");
            card.setPosition(x + index * offset, y + index * offset);
            this.scene.add.existing(card);
        });
    }
}