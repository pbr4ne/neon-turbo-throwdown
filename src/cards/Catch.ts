import { CardType } from "./CardType";
import Member from "../prefabs/Member";

export class Catch extends CardType {
    constructor() {
        super("catch", "catch");
    }

    offense(member: Member, target: Member): boolean {
        return false;
    }

    defense(member: Member, attacker: Member): boolean {
        if (Math.random() < 0.50) {
            member.showFloatingAction(this.getName());
            attacker.showFloatingAction("3");
            attacker.reduceHP(3);
            return true;
        }
        return false;
    }

    needsTarget(): boolean {
        return false;
    }
}