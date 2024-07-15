import { CardType } from "./CardType";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";
import { GameSounds } from "../utilities/GameSounds";
import { log } from "../utilities/GameUtils";
import { CardKeys } from "./CardKeys";

export class Block extends CardType {
    private static chanceToDefend : number = 0.50;
    private static defenseDamage: number = 1;
    private numDefends: number = 0;

    constructor(key: CardKeys = CardKeys.BLOCK, upgradeKey: CardKeys | null = null) {
        super(key, upgradeKey);
    }

    resetTurn(): void {
        this.numDefends = 0;
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean {
        this.numDefends++;
        log("Block has been used " + this.numDefends + " times.");
        if (this.numDefends <= 1 && Math.random() < Block.chanceToDefend) {
            log("Block successful.");
            member.showFloatingAction(this.getName());
            attacker.showFloatingAction(Block.defenseDamage.toString());
            attacker.reduceHP(Block.defenseDamage, attacker);
            GameSounds.playBlock();
            return true;
        }
        log("Block failed.");
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