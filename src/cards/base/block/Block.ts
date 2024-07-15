import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import { CardKeys } from "../../CardKeys";

export class Block extends CardType {
    protected chanceToDefend : number = 0.50;
    protected chanceToRebound: number = 0.50;
    protected defenseDamage: number = 1;
    protected currentNumDefends: number = 1;
    protected numDefends = 1;

    constructor(key: CardKeys = CardKeys.BLOCK, upgradeKey: CardKeys | null = CardKeys.BETTER_BLOCK) {
        super(key, upgradeKey);
    }

    resetTurn(): void {
        this.currentNumDefends = 0;
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
            if (this.getChanceToRebound() >= Math.random()) {
                attacker.showFloatingAction(this.getDefenseDamage().toString());
                attacker.reduceHP(this.getDefenseDamage(), attacker);
            }
            defenseSuccess = true;
        }
        log("Block has been used " + this.currentNumDefends + " times.");

        if (defenseSuccess) {
            GameSounds.playBlock();
        }
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

    getChanceToRebound(): number {
        return this.chanceToRebound;
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
        const niceChanceToRebound = this.getNicePercentage(this.getChanceToRebound());
        return `Blocks ${this.getNumDefends()}. ${niceChanceToDefend}% effective. If successful, ${niceChanceToRebound}% chance to rebound ${this.getDefenseDamage()} damage.`;
    }
}