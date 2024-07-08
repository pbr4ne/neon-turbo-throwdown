
// You can write more code here

/* START OF COMPILED CODE */

import Card from "./Card";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Deck {
    private scene: Phaser.Scene;
    private cards: Card[];
    private isTopCardSelected: boolean;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.cards = [];
        this.isTopCardSelected = false;
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

    drawDeck(x: number, y: number, onTopCardClick: () => void) {
        const offset = 5;

        this.cards.forEach((card, index) => {
            card.setTexture("cardBack"); 
            card.setPosition(x + index * offset, y + index * offset);
            this.scene.add.existing(card);
        });

        if (this.cards.length > 0) {
            const topCard = this.cards[this.cards.length - 1];
            topCard.setInteractive();
            topCard.on("pointerdown", () => {
                if (!this.isTopCardSelected) {
                    this.isTopCardSelected = true;
                    onTopCardClick();
                }
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