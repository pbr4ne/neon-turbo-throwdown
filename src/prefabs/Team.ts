import Phaser from "phaser";
import Card from "./Card";
import Deck from "./Deck";
import Hand from "./Hand";
import Member from "./Member";
import { GameSteps } from '../throwdown/GameSteps';
import Throwdown from "./Throwdown";
import Player from "./Player";
import { log } from "../utilities/GameUtils";
import { GameSounds } from "../utilities/GameSounds";
import { Modifiers } from "../throwdown/Modifiers";
import { ThrowdownPhase } from "../throwdown/ThrowdownPhase";
import { Library } from "../throwdown/Library";
import { Resurrect1 } from "../trophies/member/Resurrect1";
import { HealthRegen1 } from "../trophies/member/HealthRegen1";
import { HealthRegen3 } from "../trophies/member/HealthRegen3";
import { HealthRegen2 } from "../trophies/member/HealthRegen2";
import { TrophyType } from "../trophies/TrophyType";
import Boss from "./Boss";

export default abstract class Team extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, visibleCards: boolean) {
		super(scene);

		this.visibleCards = visibleCards;
		this.members = [];
        this.deck = new Deck(scene, visibleCards);
        this.discardPile = new Deck(scene, false);
        this.hand = new Hand(scene, 5, visibleCards);
	}

	public deck!: Deck;
    public discardPile!: Deck;
    public hand!: Hand;
    public members!: Member[];
    public opponent!: Team;
	protected visibleCards!: boolean;
    public layer!: Phaser.GameObjects.Layer;
    protected throwdown!: Throwdown;
    protected modifiers: Modifiers = new Modifiers();

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

    getModifiers(): Modifiers {
        return this.modifiers;
    }

    async onDeckClick() {
        if (this.throwdown.getCurrentStep() != GameSteps.DRAW_CARDS) {
            log("can't draw cards now");
            return;
        }

        if (this.hand.getCards().length < 5) {
            const topCard = this.deck.drawCard();
            if (topCard) {
                topCard.changeState(this instanceof Player ? "playerHand" : "bossHand");

                GameSounds.playCard();
                this.hand.addCard(topCard);
                topCard.off("pointerdown");
                this.deck.updateTopCardInteraction();
                topCard.on("pointerdown", () => {
                    this.hand.handleCardClick(topCard, this.members);
                });
            }

            await this.pause(50);
            this.onDeckClick();
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
        this.discardPile.arrangeCardPositions(3000, 840);
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
        this.deck.shuffle();
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

    getDeadMembers(): Member[] {
        return this.members.filter(member => member.getHP() <= 0);
    }

    getMostInjuredMembers(numMembers: number): Member[] {
        return this.members
            .filter(member => member.getHP() > 0 && member.getHP() < member.getMaxHP())
            .sort((a, b) => a.getHP() - b.getHP())
            .slice(0, numMembers);
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

    hasTrophy(trophyClass: new () => TrophyType) {
        if (this instanceof Player) {
            return Library.hasTrophy(trophyClass);
        } else if (this instanceof Boss) {
            return this.getCoach().hasTrophy(trophyClass);
        }
    }

    async resurrectPhase() {
        log("Resurrect Phase");
        let numToResurrect = 0;
        if (this.hasTrophy(Resurrect1)) {
            numToResurrect = 1;
        }
        if (numToResurrect == 0) {
            return;
        }
        const deadMembers = this.getDeadMembers();
        if (deadMembers.length > 0) {
            for (let i = 0; i < numToResurrect; i++) {
                //10% chance to resurrect
                if (Math.random() > 0.1) {
                    return;
                }
                //randomly pick someone to resurrect
                const randomIndex = Math.floor(Math.random() * deadMembers.length);
                const deadMember = deadMembers[randomIndex];
                deadMember.showFloatingAction("resurrected!");
                deadMember.setHP(1);
                await this.pause(Library.getIdleTurnDelay());
            }
        }
    }

    async healPhase() {
        log("Heal Phase");
        let numToHeal = 0;
        if (this.hasTrophy(HealthRegen3)) {
            numToHeal = 3;
        } else if (this.hasTrophy(HealthRegen2)) {
            numToHeal = 2;
        } else if (this.hasTrophy(HealthRegen1)) {
            numToHeal = 1;
        }

        const membersToHeal = this.getMostInjuredMembers(numToHeal);
    
        for (const member of membersToHeal) {
            member.showFloatingAction("health regen!");
            member.increaseHP(1);
            await this.pause(Library.getIdleTurnDelay());
        }
    }

    async executeSpecialPhase() {
        log("Executing Special Phase");
        if (this instanceof Player) {
            await this.pause(Library.getIdleTurnDelay()/2); 
        }
        await this.resurrectPhase();
        await this.healPhase();
        for (const member of this.members) {
            const card = member.getAssignedCard();
            const target = member.getIntendedTarget();
            log(`Special Phase: ${card} phase: ${card?.getCardType().getPhase()}`);
            if (card != null) {
                const cardType = card.getCardType();
                log(cardType.getPhase());
                if (cardType.getPhase() == ThrowdownPhase.SPECIAL) {
                    cardType.special(member, target, this, this.opponent); 
                    log(`SPECIAL: ${member}`);
                    await this.pause(Library.getIdleTurnDelay()); 
                } else {
                    log(`No special for ${cardType.getName()}`);
                }
            }
        }
    }

    async executeAttackPhase() {
        log("Executing Attack Phase");
        for (const member of this.members) {
            const card = member.getAssignedCard();
            const target = member.getIntendedTarget();
            log(`Attack Phase: ${card}`);
            if (card != null) {
                const cardType = card.getCardType();
                if (cardType.getPhase() == ThrowdownPhase.ATTACK) {
                    //member.drawTargetArc(target, true, this);
                    card.getCardType().attack(member, target, this, this.opponent); 
                    log(`OFFENSE: ${member} attacks ${target}`);
                    member.setIntendedTarget(null);
                    await this.pause(Library.getIdleTurnDelay()); 
                }
            }
        }
        
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
}
