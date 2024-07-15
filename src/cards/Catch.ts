import { CardType } from "./CardType";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";
import { GameSounds } from "../utilities/GameSounds";

export class Catch extends CardType {
    private static chanceToDefend : number = 0.50;
    private static defenseDamage: number = 3;

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
            attacker.reduceHP(Catch.defenseDamage, attacker);
            GameSounds.playBlock();
            return true;
        }
        return false;
    }

    needsTarget(): boolean {
        return false;
    }

    getName(): string {
        return "catch";
    }

    getIcon(): string {
        return "catch";
    }

    getDescription(): string {
        const chancePercentage = (Catch.chanceToDefend * 100).toFixed(0); 
        return `Catch 1 attack. ${chancePercentage}% effective. If successful, rebound ${Catch.defenseDamage} DMG.`;
    }
}