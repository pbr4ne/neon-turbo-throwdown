import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import { CardKeys } from "../../CardKeys";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class Block extends CardType {
    protected chanceToDefend : number = 0.50;
    protected defenseDamage: number = 1;
    protected currentNumDefends: number = 1;
    protected numDefends = 1;

    constructor(key: CardKeys = CardKeys.BLOCK_1_BLOCK, upgradeKey: CardKeys | null = CardKeys.BLOCK_2_BETTER_BLOCK) {
        super(key, upgradeKey, ThrowdownPhase.DEFENSE);
    }

    resetTurn(): void {
        this.currentNumDefends = 0;
        super.resetTurn();
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        let defenseSuccess = false;
        if (this.getCurrentNumDefends() <= this.getNumDefends() && this.getChanceToDefend() >= Math.random()) {
            member.showFloatingAction(this.getName());

            if (canRetaliate) {
                attacker.reduceHP(this.getDefenseDamage());
            }
            
            defenseSuccess = true;
        }

        if (defenseSuccess) {
            GameSounds.playBlock();
        }
        
        this.currentNumDefends++;
        log("Block has been used " + this.currentNumDefends + " times.");

        return defenseSuccess;
    }

    getName(): string {
        return "block";
    }

    getIcon(): string {
        return "block";
    }

    getChanceToDefend(): number {
        return this.chanceToDefend;
    }

    getDefenseDamage(): number {
        return this.defenseDamage;
    }

    getCurrentNumDefends(): number {
        return this.currentNumDefends;
    }

    getNumDefends(): number {
        return this.numDefends;
    }

    getDescription(): string {
        const niceChanceToDefend = this.getNicePercentage(this.getChanceToDefend());
        return `Blocks ${this.getNumDefends()}. ${niceChanceToDefend}% effective. If successful, rebound ${this.getDefenseDamage()} damage.`;
    }
}