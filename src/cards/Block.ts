import { CardType } from "./CardType";
import Member from "../prefabs/Member";

export class Block extends CardType {
    private static chanceToDefend : number = 0.50;
    private static defenseDamage: number = 1;
    
    constructor() {
        super("block", "block");
    }

    offense(member: Member, target: Member): boolean {
        return false;
    }

    defense(member: Member, attacker: Member): boolean {
        if (Math.random() < Block.chanceToDefend) {
            member.showFloatingAction(this.getName());
            attacker.showFloatingAction(Block.defenseDamage.toString());
            attacker.reduceHP(Block.defenseDamage);
            return true;
        }
        return false;
    }

    needsTarget(): boolean {
        return false;
    }
}