import { CardType } from "./CardType";
import Member from "../prefabs/Member";

export class Throw extends CardType {
    constructor() {
        super("throw", "throw");
    }

    offense(member: Member, target: Member): boolean {

        var offenseSuccess = true;
        if (Math.random() < 0.75) {
            var targetCard = target.getAssignedCard();
            var defenseSuccess = false;
            if (targetCard != null) {
                defenseSuccess = targetCard.getCardType().defense(target, member);
            }
            if (defenseSuccess) {
                offenseSuccess = false;
            } else {
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