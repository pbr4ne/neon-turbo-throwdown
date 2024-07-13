import { CardType } from "./CardType";
import Boss from "../prefabs/Boss";
import Member from "../prefabs/Member";
import Player from "../prefabs/Player";
import { Library } from "../throwdown/Library";
import { TurboThrow } from "../trophies/TurboThrow";

export class Throw extends CardType {
    private chanceToOffend : number = 0.75;
    private offenseDamage: number = 1;

    special(member: Member, player: Player, boss: Boss): boolean {
        return false;
    }

    offense(member: Member, target: Member, player: Player, boss: Boss): boolean {

        var offenseSuccess = true;
        if (Math.random() < this.chanceToOffend) {
            var targetCard = target.getAssignedCard();
            var defenseSuccess = false;
            if (targetCard != null) {
                defenseSuccess = targetCard.getCardType().defense(target, member, player, boss);
            }
            if (defenseSuccess) {
                offenseSuccess = false;
            } else {
                target.reduceHP(this.offenseDamage);
                target.showFloatingAction(this.offenseDamage.toString());
                offenseSuccess = true;
            }
        } else {
            member.showFloatingAction("miss");
            offenseSuccess = false;
        }
        return offenseSuccess;        
    }

    getChanceToOffend(): number {
        return this.chanceToOffend;
    }

    getOffenseDamage(): number {
        if (Library.getTrophyTypes().some(trophy => trophy instanceof TurboThrow)) {
            return this.offenseDamage + 1;
        }
        return this.offenseDamage;
    }

    defense(member: Member, attacker: Member, player: Player, boss: Boss): boolean {
        return false;
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        return "throw";
    }

    getIcon(): string {
        return "throw";
    }

    getDescription(): string {
        const chancePercentage = (this.getChanceToOffend() * 100).toFixed(0); 
        return `${this.offenseDamage} DMG. ${chancePercentage}% effective.`;
    }
}