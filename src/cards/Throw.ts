import { CardType } from "./CardType";
import Boss from "../prefabs/Boss";
import Member from "../prefabs/Member";
import Player from "../prefabs/Player";

export class Throw extends CardType {
    private static chanceToOffend : number = 0.75;
    private static offenseDamage: number = 1;

    constructor() {
        super("throw", "throw");
    }

    special(member: Member, player: Player, boss: Boss): boolean {
        return false;
    }

    offense(member: Member, target: Member, player: Player, boss: Boss): boolean {

        var offenseSuccess = true;
        if (Math.random() < Throw.chanceToOffend) {
            var targetCard = target.getAssignedCard();
            var defenseSuccess = false;
            if (targetCard != null) {
                defenseSuccess = targetCard.getCardType().defense(target, member, player, boss);
            }
            if (defenseSuccess) {
                offenseSuccess = false;
            } else {
                target.reduceHP(Throw.offenseDamage);
                target.showFloatingAction(Throw.offenseDamage.toString());
                offenseSuccess = true;
            }
        } else {
            member.showFloatingAction("miss");
            offenseSuccess = false;
        }
        return offenseSuccess;        
    }

    defense(member: Member, attacker: Member, player: Player, boss: Boss): boolean {
        return false;
    }

    needsTarget(): boolean {
        return true;
    }
}