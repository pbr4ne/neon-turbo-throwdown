
import { CardType } from "./CardType";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";


export class Throw extends CardType {
    protected chanceToOffend : number = 0.75;
    protected offenseDamage: number = 1;

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

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean {
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

    getChanceToOffend(): number {
        return this.chanceToOffend;
    }

    getOffenseDamage(): number {
        return this.offenseDamage;
    }
}