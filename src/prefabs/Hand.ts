
// You can write more code here

/* START OF COMPILED CODE */

import Card from "./Card";
import Deck from "./Deck";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Hand {
    private scene: Phaser.Scene;
    private cards: Card[];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.cards = [];
    }

    addCard(card: Card) {
        this.cards.push(card);
    }

    drawHand(deck: Deck, numberOfCards: number) {
        const screenWidth = this.scene.scale.width;
        const screenHeight = this.scene.scale.height;
        const cardSpacing = 20; // Space between cards
        const cardWidth = 100; // Assuming a fixed card width
        const totalWidth = numberOfCards * cardWidth + (numberOfCards - 1) * cardSpacing;
        const startX = (screenWidth - totalWidth) / 2;
        const yPos = screenHeight - cardWidth - 50; // 50px margin from bottom

        for (let i = 0; i < numberOfCards; i++) {
            const card = deck.drawCard();
            if (card) {
                card.setTexture("cardFront"); // Set the texture to the front of the card
                card.showName(true); // Show the name text for hand cards
                this.addCard(card);
                card.setPosition(startX + i * (cardWidth + cardSpacing), yPos);
                this.scene.add.existing(card);

                card.on("pointerdown", () => {
                    console.log(`Card clicked: ${card.cardType}`);
                    // Handle card click logic here
                });
            }
        }
    }
}