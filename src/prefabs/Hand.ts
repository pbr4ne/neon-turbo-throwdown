
// You can write more code here

/* START OF COMPILED CODE */

import Card from "./Card";
import Game from "../scenes/Game";
import Member from "./Member";
import { GameSteps } from '../throwdown/GameSteps';
import { log } from "../utilities/GameUtils";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Hand {
    private scene: Phaser.Scene;
    private cards: Card[];
    private cardsInPlay: Card[];
    private maxCards: number;
    private poppedUpCard: Card | null;
    private selectedCard: Card | null;

    constructor(scene: Phaser.Scene, maxCards: number = 5) {
        this.scene = scene;
        this.cards = [];
        this.cardsInPlay = [];
        this.maxCards = maxCards;
        this.poppedUpCard = null;
        this.selectedCard = null;
    }

    addCard(card: Card) {
        if (this.cards.length < this.maxCards) {
            this.cards.push(card);
            this.arrangeCardPositions();
        }
    }

    getCards(): Card[] {
        return this.cards;
    }

    getCardsInPlay(): Card[] {
        return this.cardsInPlay;
    }

    arrangeCardPositions() {
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

    handleCardClick(card: Card, members: Member[]) {
        log(`Clicking on ${card.toString()}`);
        var currentStep = (this.scene.scene.get('Game') as Game).throwdown.getCurrentStep();
        if (currentStep !== GameSteps.SELECT_CARD) {
            log("Not in the right step to select a card");
            return;
        }

        // Check if any member already has the card assigned
        const cardAlreadyAssigned = members.some(member => 
            member.getAssignedCard() == card
        );

        if (cardAlreadyAssigned) {
            log("Card is already assigned to a member");
            return;
        }

        card.setOrder(card.getNextOrder());
        card.incrementOrder();

        if (this.poppedUpCard) {
            this.poppedUpCard.togglePopUp();
            if (this.poppedUpCard === card) {
                this.poppedUpCard = null;
                this.selectedCard = null;
                return;
            }
        }
        card.togglePopUp();

        (this.scene.scene.get('Game') as Game).throwdown.nextStep();

        this.poppedUpCard = card;
        this.selectedCard = card;
    }

    assignCardToMember(member: Member) {
        if (this.poppedUpCard) {
            if (member.getAssignedCard() == null) {
                const cardType = this.poppedUpCard.getCardType();
                member.assignCard(this.poppedUpCard);
                this.cards = this.cards.filter(card => card !== this.poppedUpCard);
                this.cardsInPlay.push(this.poppedUpCard);
                this.poppedUpCard.togglePopUp(); 
                this.poppedUpCard = null;
            }
        }
    }
}