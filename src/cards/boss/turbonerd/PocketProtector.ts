import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { TurbonerdCard } from "./TurbonerdCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class PocketProtector extends TurbonerdCard {

    protected chanceToDefend : number = 0.75;
    protected defenseDamage: number = 2;
    protected currentNumDefends: number = 1;
    protected numDefends = 1;

    constructor() {
        super(CardKeys.POCKET_PROTECTOR, null, ThrowdownPhase.DEFENSE);
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

        return defenseSuccess;
    }

    getName(): string {
        return "pocket protector";
    }

    getIcon(): string {
        return "unknown";
    }

    getChanceToDefend(team?: Team): number {
        const modifiers = team?.getModifiers() || this.getPlayer()?.getModifiers();
        let chance = this.chanceToDefend;
    
        if (modifiers) {
            chance += modifiers.getBlockChanceMultiplier();
        }
    
        return Phaser.Math.Clamp(chance, 0, 1);
    }

    getNumDefends(team?: Team): number {
        const modifiers = team?.getModifiers() || this.getPlayer()?.getModifiers();
        let numDefends = this.numDefends;
    
        if (modifiers) {
            numDefends += modifiers.getBlockNumberAddition();
        }
    
        if (numDefends < 0) {
            return 0;
        }
        return numDefends;
    }

    getDefenseDamage(): number {
        return this.defenseDamage;
    }

    getCurrentNumDefends(): number {
        return this.currentNumDefends;
    }

    getDescription(): string {
        const niceChanceToDefend = this.getNicePercentage(this.getChanceToDefend());
        return `Blocks ${this.getNumDefends()} attack(s). ${niceChanceToDefend}% effective. If successful, rebound ${this.getDefenseDamage()} damage.`;
    }
}