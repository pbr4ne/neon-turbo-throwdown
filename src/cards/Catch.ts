import { CardType } from "./CardType";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";

export class Catch extends CardType {
    private static chanceToDefend : number = 0.50;
    private static defenseDamage: number = 3;

    constructor() {
        super("catch", "catch");
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean {
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