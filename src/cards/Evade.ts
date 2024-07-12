import { CardType } from "./CardType";
import Member from "../prefabs/Member";

export class Evade extends CardType {
    private static chanceToDefend : number = 0.75;

    constructor() {
        super("evade", "dodge");
    }

    offense(member: Member, target: Member): boolean {
        return false;
    }

    defense(member: Member, attacker: Member): boolean {
        if (Math.random() < Evade.chanceToDefend) {
            member.showFloatingAction(this.getName());
            return true;
        }
        return false;
    }

    needsTarget(): boolean {
        return false;
    }
}