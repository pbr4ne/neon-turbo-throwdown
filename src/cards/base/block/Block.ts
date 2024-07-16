import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import { CardKeys } from "../../CardKeys";

export class Block extends CardType {
    protected chanceToDefend : number = 0.50;
    protected defenseDamage: number = 1;
    protected currentNumDefends: number = 1;
    protected numDefends = 1;

    constructor(key: CardKeys = CardKeys.BLOCK, upgradeKey: CardKeys | null = CardKeys.BETTER_BLOCK) {
        super(key, upgradeKey);
    }

    resetTurn(): void {
        this.currentNumDefends = 0;
        super.resetTurn();
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean {
        let defenseSuccess = false;
        if (this.getCurrentNumDefends() <= 1 && this.getChanceToDefend() >= Math.random()) {
            member.showFloatingAction(this.getName());
            attacker.reduceHP(this.getDefenseDamage());
            defenseSuccess = true;
        }

        if (defenseSuccess) {
            GameSounds.playBlock();
        }
        
        this.currentNumDefends++;
        log("Block has been used " + this.currentNumDefends + " times.");

        return defenseSuccess;
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