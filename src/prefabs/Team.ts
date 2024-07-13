
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Card from "./Card";
import Deck from "./Deck";
import Hand from "./Hand";
import Member from "./Member";
import Game from "../scenes/Game"
import { GameSteps } from '../throwdown/GameSteps';
import Throwdown from "./Throwdown";
/* END-USER-IMPORTS */

export default abstract class Team extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, visibleCards: boolean) {
		super(scene);

		/* START-USER-CTR-CODE */
		this.visibleCards = visibleCards;
		this.members = [];
        this.deck = new Deck(scene);
        this.discardPile = new Deck(scene);
        this.hand = new Hand(scene, 5);
      
        this.addMembers();
        this.scene.input.on('pointerdown', this.handleGlobalClick, this);
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
    private selectedMember: Member | null = null;
    private memberClicked: boolean = false;
    protected throwdown!: Throwdown;

	abstract addMembers(): void;

    setThrowdown(throwdown: Throwdown) {
        this.throwdown = throwdown;
    }

    setOpponent(opponent: Team) {
        this.opponent = opponent;
    }

    handleMemberClick(member: Member) {
        this.memberClicked = true;

        if (this.selectedMember) {
            this.selectedMember.disableGlow();
        }

        if (this.selectedMember === member) {
            this.selectedMember = null;
        } else {
            this.selectedMember = member;
            this.selectedMember.enableGlow();
        }
    }

    handleGlobalClick(pointer: Phaser.Input.Pointer) {
        
        if (!this.memberClicked && this.selectedMember) {
            this.selectedMember.disableGlow();
            this.selectedMember = null;
        }

        this.memberClicked = false;
    }

    onDeckClick() {
        if (this.throwdown.getCurrentStep() != GameSteps.DRAW_CARDS) {
            console.log("can't draw cards now");
            return;
        }

        if (this.hand.getCards().length < 5) {
            const topCard = this.deck.drawCard();
            if (topCard) {
                topCard.setTexture("front");
                topCard.showName(this.visibleCards);
                topCard.showIcon(this.visibleCards);
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
        while (this.hand.getCards().length > 0) {
            const card = this.hand.getCards().pop();
            if (card) {
                this.discardPile.addCard(card);
                card.destroy();
            }
        }
        while (this.hand.getCardsInPlay().length > 0) {
            const card = this.hand.getCardsInPlay().pop();
            if (card) {
                this.discardPile.addCard(card);
                card.destroy();
            }
        } 
    }

    recombineDeck() {
        // todo - figure out how i don't have to recreate the cards
        this.discardPile.getCards().forEach(card => {
            const freshCard = new Card(this.scene, card.getCardType(), 0, 0, "front");
            freshCard.showName(false);
            freshCard.showIcon(false);
            this.deck.addCard(freshCard);
        });
        this.discardPile.clear();
        //log the size of the deck
        console.log("CURRENT DECK SIZE AFTER RECOMBINE: " + this.deck.getCards().length);
    }

    clearMembers() {
        this.members.forEach(member => {
            member.clearAssignedCards();
            member.setIntendedTarget(null);
        });
    }

    async executeTurn() {
        for (const member of this.members) {
            const card = member.getAssignedCard();
            const target = member.getIntendedTarget();
            if (target !== null && card != null) {
                await this.pause(500); 
                card.getCardType().offense(member, target, this, this.opponent); 
                console.log(`OFFENSE: ${member} attacks ${target}`);
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
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
