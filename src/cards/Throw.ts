
import { CardType } from "./CardType";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";
import { Coach } from "../throwdown/Coach";
import { UltraTurboThrow } from "../trophies/card/UltraTurboThrow";
import { TurboThrow } from "../trophies/card/TurboThrow";
import { GameSounds } from "../GameSounds";


export class Throw extends CardType {
    protected chanceToOffend : number = 0.75;
    protected offenseDamage: number = 1;

    constructor(coach: Coach) {
        super(coach);
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        var offenseSuccess = true;
        if (Math.random() < this.chanceToOffend) {
            var targetCard = target.getAssignedCard();
            var defenseSuccess = false;
            if (targetCard != null) {
                defenseSuccess = targetCard.getCardType().defense(target, member, team, opponentTeam);
            }
            if (defenseSuccess) {
                offenseSuccess = false;
            } else {
                target.showFloatingAction(this.offenseDamage.toString());
                target.reduceHP(this.offenseDamage, member);
                offenseSuccess = true;
            }
        } else {
            member.showFloatingAction("miss");
            offenseSuccess = false;
        }

        if (offenseSuccess) {
            GameSounds.playHit();
        }
        return offenseSuccess;        
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        if (this.getTrophyTypes().some(trophy => trophy instanceof UltraTurboThrow)) {
            return "ultra turbo throw";
        }
        if (this.getTrophyTypes().some(trophy => trophy instanceof TurboThrow)) {
            return "turbo throw";
        }
        return "throw";
    }

    getIcon(): string {
        if (this.getTrophyTypes().some(trophy => trophy instanceof UltraTurboThrow)) {
            return "throw-turbo-ultra";
        }
        if (this.getTrophyTypes().some(trophy => trophy instanceof TurboThrow)) {
            return "throw-turbo";
        }
        return "throw";
    }

    getDescription(): string {
        const chancePercentage = (this.getChanceToOffend() * 100).toFixed(0); 
        return `${this.getOffenseDamage()} DMG. ${chancePercentage}% effective.`;
    }

    getChanceToOffend(): number {
        return this.chanceToOffend;
    }

    getOffenseDamage(): number {
        if (this.getTrophyTypes().some(trophy => trophy instanceof UltraTurboThrow)) {
            return this.offenseDamage + 2;
        }
        else if (this.getTrophyTypes().some(trophy => trophy instanceof TurboThrow)) {
            return this.offenseDamage + 1;
        }
        return this.offenseDamage;
    }
}