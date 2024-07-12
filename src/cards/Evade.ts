import { CardType } from "./CardType";
import Member from "../prefabs/Member";

export class Evade extends CardType {
    constructor() {
        super("evade", "dodge");
    }

    offense(member: Member, target: Member): boolean {
        return false;
    }

    defense(member: Member, attacker: Member): boolean {
        if (Math.random() < 0.75) {
            member.showFloatingAction(this.getName());
            return true;
        }
        return false;
    }

    needsTarget(): boolean {
        return false;
    }
}