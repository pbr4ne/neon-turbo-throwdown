
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Card from "./Card";
import Deck from "./Deck";
import Hand from "./Hand";
import Member from "./Member";
import { GameSteps } from '../throwdown/GameSteps';
import Throwdown from "./Throwdown";
import Player from "./Player";
import { log } from "../utilities/GameUtils";
/* END-USER-IMPORTS */

export default abstract class Team extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, visibleCards: boolean) {
		super(scene);

		/* START-USER-CTR-CODE */
		this.visibleCards = visibleCards;
		this.members = [];
        this.deck = new Deck(scene, visibleCards);
        this.discardPile = new Deck(scene, false);
        this.hand = new Hand(scene, 5, visibleCards);
      	/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	public deck!: Deck;
    public discardPile!: Deck;
    public hand!: Hand;
    public members!: Member[];
    public opponent!: Team;
	protected visibleCards!: boolean;
    public layer!: Phaser.GameObjects.Layer;
    protected throwdown!: Throwdown;

    private catchChanceMultiplier: number = 1;

    getCatchChanceMultiplier(): number {
        return this.catchChanceMultiplier;
    }

    addCatchChanceMultiplier(multiplier: number): void {
        this.catchChanceMultiplier += multiplier;
        if (this.catchChanceMultiplier < 0) {
            this.catchChanceMultiplier = 0;
        }
    }

    resetCatchChanceMultiplier(): void {
        this.catchChanceMultiplier = 1;
    }

	abstract addMembers(): void;

    setThrowdown(throwdown: Throwdown) {
        this.throwdown = throwdown;
    }

    setOpponent(opponent: Team) {
        this.opponent = opponent;
    }

    getMembers(): Member[] {
        return this.members;
    }

    onDeckClick() {
        if (this.throwdown.getCurrentStep() != GameSteps.DRAW_CARDS) {
            log("can't draw cards now");
            return;
        }

        if (this.hand.getCards().length < 5) {
            const topCard = this.deck.drawCard();
            if (topCard) {
                topCard.changeState(this instanceof Player ? "playerHand" : "bossHand");

                this.hand.addCard(topCard);
                topCard.off("pointerdown");
                this.deck.updateTopCardInteraction();
                topCard.on("pointerdown", () => {
                    this.hand.handleCardClick(topCard, this.members);
                });
            }
        }
    }

    clearHand() {
        log(`CURRENT ${this} HAND SIZE BEFORE CLEAR HAND: ${this.hand.getCards().length}`);
        log(`CURRENT ${this} HAND IN PLAY SIZE BEFORE CLEAR HAND: ${this.hand.getCardsInPlay().length}`);
        while (this.hand.getCards().length > 0) {
            const card = this.hand.getCards().pop();
            if (card) {
                card.changeState(this instanceof Player ? "playerDiscard" : "bossDiscard");
                this.discardPile.addCard(card);
                
            }
        }
        while (this.hand.getCardsInPlay().length > 0) {
            const card = this.hand.getCardsInPlay().pop();
            if (card) {
                card.changeState(this instanceof Player ? "playerDiscard" : "bossDiscard");
                this.discardPile.addCard(card);
            }
        }
        log(`CURRENT ${this} DISCARD PILE SIZE AFTER CLEAR HAND: ${this.discardPile.getCards().length}`);
        this.discardPile.arrangeCardPositions(100, 840);
    }

    recombineDeck() {
        // todo - figure out how i don't have to recreate the cards
        while (this.discardPile.getCards().length > 0) {
            const card = this.discardPile.getCards().pop();
            if (card) {
                const cardState = this instanceof Player ? "playerDeck" : "bossDeck";
                const freshCard = new Card(this.scene, card.getCardType(), cardState, 0, 0, "front");
                this.deck.addCard(freshCard);
            }
        }
        //this.deck.shuffle();
        //log the size of the deck
        log(`CURRENT ${this} DISCARD PILE SIZE AFTER RECOMBINE: ${this.discardPile.getCards().length}`);
        log(`CURRENT ${this} DECK SIZE AFTER RECOMBINE: ${this.deck.getCards().length}`);
    }


    allMembersDead(): boolean {
        return this.members.every(member => member.getHP() <= 0);
    }

    getAliveMembers(): Member[] {
        return this.members.filter(member => member.getHP() > 0);
    }

    clearMembers() {
        this.members.forEach(member => {
            member.clearAssignedCards();
            member.setIntendedTarget(null);
        });
    }

    destroyMembers() {
        this.members.forEach(member => {
            member.setIntendedTarget(null);
            member.destroy();
        });
    }

    showAssignedMemberStuff() {
        this.members.forEach(member => {
            member.showAssignedStuff();
        });
    }

    async executeTurn() {
        await this.pause(500); 
        for (const member of this.members) {
            const card = member.getAssignedCard();
            if (card != null) {
                card.getCardType().special(member, this, this.opponent); 
                log(`SPECIAL: ${member}`);
            }
        }
        for (const member of this.members) {
            const card = member.getAssignedCard();
            const target = member.getIntendedTarget();
            if (target !== null && card != null) {
                await this.pause(500); 
                card.getCardType().offense(member, target, this, this.opponent); 
                log(`OFFENSE: ${member} attacks ${target}`);
                member.setIntendedTarget(null);             
            }
        }
        await this.pause(500); 
    }
    
    pause(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    removeMember(member: Member) {
        this.members = this.members.filter(p => p !== member);
    }

    toString(): string {
        return this instanceof Player ? "Player" : "Boss";
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
