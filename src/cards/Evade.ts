import { CardType } from "./CardType";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";

export class Evade extends CardType {
    private static chanceToDefend : number = 0.75;

    constructor() {
        super("evade", "dodge");
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean {
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