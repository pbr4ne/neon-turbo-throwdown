import { CardType } from "./CardType";
import Member from "../prefabs/Member";

export class Block extends CardType {
    constructor() {
        super("block", "block");
    }

    offense(member: Member, target: Member): boolean {
        return false;
    }

    defense(member: Member, attacker: Member): boolean {
        if (Math.random() < 0.50) {
            member.showFloatingAction(this.getName());
            attacker.showFloatingAction("1");
            attacker.reduceHP(1);
            return true;
        }
        return false;
    }

    needsTarget(): boolean {
        return false;
    }
}