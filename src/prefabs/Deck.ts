
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
            card.showIcon(false);
            this.addCard(card);
        }

        this.shuffle();
    }

    drawDeck(x: number, y: number) {
        const offset = 5;
        //todo - this is hacky
        let cardWidth = 170; // Assuming card width
        let cardHeight = 240; // Assuming card height

        this.cards.forEach((card, index) => {
            card.setTexture("cardBack");
            card.setPosition(x + index * offset, y + index * offset);
            this.scene.add.existing(card);
        });

        // Draw a rectangle around the top card for debugging
        const deckArea = this.scene.add.rectangle(x, y, cardWidth, cardHeight);
        //deckArea.setStrokeStyle(2, 0x00ff00); // Set the border color to green for visibility
        //deckArea.setOrigin(0, 0); // Top-left corner origin
        deckArea.setInteractive();
        return deckArea;
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