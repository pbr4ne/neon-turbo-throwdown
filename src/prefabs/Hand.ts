
// You can write more code here

/* START OF COMPILED CODE */

import Card from "./Card";
import Deck from "./Deck";
import Game from "../scenes/Game";
import Member from "./Member";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Hand {
    private scene: Phaser.Scene;
    private cards: Card[];
    private maxCards: number;
    private poppedUpCard: Card | null;
    private selectedCard: Card | null;

    constructor(scene: Phaser.Scene, maxCards: number = 5) {
        this.scene = scene;
        this.cards = [];
        this.maxCards = maxCards;
        this.poppedUpCard = null;
        this.selectedCard = null;
    }

    addCard(card: Card) {
        if (this.cards.length < this.maxCards) {
            card.setTexture("front");
            card.showName(true);
            card.showIcon(true);
            this.cards.push(card);
            this.updateHandPositions();
        }
    }

    clear() {
        this.cards.forEach(card => card.destroy());
        this.cards = [];
    }

    getCards(): Card[] {
        return this.cards;
    }

    updateHandPositions() {
        const screenWidth = this.scene.scale.width;
        const screenHeight = this.scene.scale.height;
        const cardSpacing = 20;
        const cardWidth = 182;
        const totalWidth = this.cards.length * cardWidth + (this.cards.length - 1) * cardSpacing;
        const startX = 556;
        const yPos = screenHeight - cardWidth - 50;
    
        this.cards.forEach((card, index) => {
            const xPos = startX + index * (cardWidth + cardSpacing);
            card.setPosition(xPos, yPos);
        });
    }

    handleCardClick(card: Card) {
        var currentStep = (this.scene.scene.get('Game') as Game).getCurrentStep();
        if (currentStep !== 1) {
            console.log("Not in the right step to select a card");
            return;
        }
        if (this.poppedUpCard) {
            this.poppedUpCard.togglePopUp();
            if (this.poppedUpCard === card) {
                this.poppedUpCard = null;
                this.selectedCard = null;
                return;
            }
        }
        card.togglePopUp();
        this.poppedUpCard = card;
        this.selectedCard = card;
    }

    assignCardToMember(member: Member) {
        if (this.poppedUpCard) {
            if (member.getAssignedCards().length < 1) {
                const cardType = this.poppedUpCard.getCardType();
                const whiteIconTexture = this.poppedUpCard.getWhiteIconTexture();
                member.assignCard(this.poppedUpCard, whiteIconTexture);
                this.poppedUpCard.hide();
                this.cards = this.cards.filter(card => card !== this.poppedUpCard);
            }
            this.poppedUpCard.togglePopUp(); 
            this.poppedUpCard = null;
        }
    }
}