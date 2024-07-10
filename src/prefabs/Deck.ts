
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import Card from "./Card";
/* END-USER-IMPORTS */

export default class Deck extends Phaser.GameObjects.Container {
    private cards: Card[];

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.cards = [];

        const cardTypes = ["BLOCK", "DODGE", "CATCH", "THROW"];

        for (let i = 0; i < 10; i++) {
            const cardType = cardTypes[Phaser.Math.Between(0, cardTypes.length - 1)];
            const card = new Card(this.scene, 0, 0, "cardFront");
            card.setType(cardType);
            card.showName(false);
            card.showIcon(false);
            this.cards.push(card);
        }

        this.shuffle();
        this.scene.add.existing(this);
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
            card.setTexture("cardBack");
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