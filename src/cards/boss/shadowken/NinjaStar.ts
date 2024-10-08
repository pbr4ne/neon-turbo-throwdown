import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { ShadowkenCard } from "./ShadowkenCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class NinjaStar extends ShadowkenCard {

    protected offenseDamage: number = 3;
    protected currentNumDefends: number = 1;
    protected numDefends = 1;

    constructor() {
        super(CardKeys.NINJA_STAR, null, ThrowdownPhase.ATTACK);
    }

    resetTurn(): void {
        this.currentNumDefends = 0;
        super.resetTurn();
    }

    //todo does this need to have a chance to offend?
    attack(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {

        if (!target) {
            return false;
        }
        const targetCard = target.getAssignedCard();
        let defenseSuccess = false;
        if (targetCard != null) {
            //see if they successfully defend
            defenseSuccess = targetCard.getCardType().defense(target, member, opponentTeam, team, true);
        }
        if (!defenseSuccess) {
            //reduce their HP if they failed to defend
            member.showFloatingAction(this.getName());
            target.reduceHP(this.getOffenseDamage());
            GameSounds.playHit();
            return true;
        }

        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        let defenseSuccess = false;
        if (this.getCurrentNumDefends() <= this.getNumDefends()) {
            member.showFloatingAction(this.getName());
            defenseSuccess = true;
        }

        if (defenseSuccess) {
            GameSounds.playBlock();
        }
        this.currentNumDefends++;
        return defenseSuccess;
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        return "ninja star";
    }

    getIcon(): string {
        return "evade-turbo-ultra";
    }

    getDescription(): string {
        return `Throw for ${this.getOffenseDamage()} damage and evade.`;
    }

    getNumDefends(): number {
        return this.numDefends;
    }

    getCurrentNumDefends(): number {
        return this.currentNumDefends;
    }

    //todo - should this take in the attack damage modifiers?
    getOffenseDamage(): number {
        return this.offenseDamage;
    }
}