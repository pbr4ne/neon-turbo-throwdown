
// You can write more code here

/* START OF COMPILED CODE */

import Card from "./Card";
import Deck from "./Deck";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Hand {
    private scene: Phaser.Scene;
    private cards: Card[];
    private maxCards: number;
    private poppedUpCard: Card | null;

    constructor(scene: Phaser.Scene, maxCards: number = 5) {
        this.scene = scene;
        this.cards = [];
        this.maxCards = maxCards;
        this.poppedUpCard = null;
    }

    addCard(card: Card) {
        if (this.cards.length < this.maxCards) {
            card.setTexture("cardFront");
            card.showName(true); // Show the name text for hand cards
            card.showIcon(true); // Show the icon for hand cards
            this.cards.push(card);
            this.updateHandPositions();

            card.on("pointerdown", () => {
                this.handleCardClick(card);
            });
        }
    }

    getCards(): Card[] {
        return this.cards;
    }

    updateHandPositions() {
        const screenWidth = this.scene.scale.width;
        const screenHeight = this.scene.scale.height;
        const cardSpacing = 20; // Space between cards
        const cardWidth = 100; // Assuming a fixed card width
        const totalWidth = this.cards.length * cardWidth + (this.cards.length - 1) * cardSpacing;
        const startX = (screenWidth - totalWidth) / 2;
        const yPos = screenHeight - cardWidth - 50; // 50px margin from bottom

        this.cards.forEach((card, index) => {
            card.setPosition(startX + index * (cardWidth + cardSpacing), yPos);
        });
    }

    handleCardClick(card: Card) {
        if (this.poppedUpCard) {
            this.poppedUpCard.togglePopUp();
            if (this.poppedUpCard === card) {
                this.poppedUpCard = null;
                return;
            }
        }
        card.togglePopUp();
        this.poppedUpCard = card;
    }
}