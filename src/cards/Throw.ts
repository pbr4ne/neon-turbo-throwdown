import { CardType } from "./CardType";
import Member from "../prefabs/Member";

export class Throw extends CardType {
    private static chanceToOffend : number = 0.75;
    private static offenseDamage: number = 1;

    constructor() {
        super("throw", "throw");
    }

    offense(member: Member, target: Member): boolean {

        var offenseSuccess = true;
        if (Math.random() < Throw.chanceToOffend) {
            var targetCard = target.getAssignedCard();
            var defenseSuccess = false;
            if (targetCard != null) {
                defenseSuccess = targetCard.getCardType().defense(target, member);
            }
            if (defenseSuccess) {
                offenseSuccess = false;
            } else {
                target.reduceHP(Throw.offenseDamage);
                offenseSuccess = true;
            }
        } else {
            member.showFloatingAction("miss");
            offenseSuccess = false;
        }
        return offenseSuccess;        
    }

    defense(member: Member, attacker: Member): boolean {
        
        return false;
    }

    needsTarget(): boolean {
        return true;
    }
}