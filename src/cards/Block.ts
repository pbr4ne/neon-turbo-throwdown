import { CardType } from "./CardType";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";
import { GameSounds } from "../utilities/GameSounds";

export class Block extends CardType {
    private static chanceToDefend : number = 0.50;
    private static defenseDamage: number = 1;

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean {
        if (Math.random() < Block.chanceToDefend) {
            member.showFloatingAction(this.getName());
            attacker.showFloatingAction(Block.defenseDamage.toString());
            attacker.reduceHP(Block.defenseDamage, attacker);
            GameSounds.playBlock();
            return true;
        }
        return false;
    }

    needsTarget(): boolean {
        return false;
    }

    getName(): string {
        return "block";
    }

    getIcon(): string {
        return "block";
    }

    getDescription(): string {
        const chancePercentage = (Block.chanceToDefend * 100).toFixed(0); 
        return `Block 1 attack. ${chancePercentage}% effective. If successful, rebound ${Block.defenseDamage} DMG.`;
    }
}