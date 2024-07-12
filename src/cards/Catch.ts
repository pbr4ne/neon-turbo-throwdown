import { CardType } from "./CardType";
import Member from "../prefabs/Member";

export class Catch extends CardType {
    private static chanceToDefend : number = 0.50;
    private static defenseDamage: number = 3;

    constructor() {
        super("catch", "catch");
    }

    offense(member: Member, target: Member): boolean {
        return false;
    }

    defense(member: Member, attacker: Member): boolean {
        if (Math.random() < Catch.chanceToDefend) {
            member.showFloatingAction(this.getName());
            attacker.showFloatingAction(Catch.defenseDamage.toString());
            attacker.reduceHP(Catch.defenseDamage);
            return true;
        }
        return false;
    }

    needsTarget(): boolean {
        return false;
    }
}