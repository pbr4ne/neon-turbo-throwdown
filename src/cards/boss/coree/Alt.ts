import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { CoreeCard } from "./CoreeCard";
import { CardFactory } from "../../../cards/CardFactory";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class Alt extends CoreeCard {

    cardType: CardType | undefined;

    constructor() {
        //todo this will need to accept more than one phase i guess
        super(CardKeys.ALT, null, ThrowdownPhase.SPECIAL);
    }

    resetTurn(): void {
        if (this.cardType) {
            this.cardType.resetTurn();
        }
        this.cardType = undefined;
        super.resetTurn();
    }

    //should be overridden if the card has a special effect
    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        
        if (Math.random() < 0.33) {
            this.cardType = CardFactory.getRandomCard();
            log("Alt subbed in " + this.cardType.getName());
            return this.cardType.special(member, target, team, opponentTeam);
        } else if (Math.random() < 0.33 && !this.cardType) {
            //todo this should happen in attack phase but attack phase won't happen based on the phase of this card
            this.cardType = CardFactory.getRandomCard();
            log("Alt subbed in " + this.cardType.getName());
            return this.cardType.attack(member, target, team, opponentTeam);
        }

        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        if (!this.cardType) {
            this.cardType = CardFactory.getRandomCard();
            log("Alt subbed in " + this.cardType.getName());
            return this.cardType.defense(member, attacker, team, opponentTeam, canRetaliate);
        } else {
            log("Alt didn't need a defense")
        }
        return false;
    }

    needsTarget(): boolean {
        return true;
    }


    getName(): string {
        return "ALT";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "Sub in 1 random card effect.";
    }
}