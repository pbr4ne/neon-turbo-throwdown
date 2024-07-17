import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { log } from "../../../utilities/GameUtils";
import { CardKeys } from "../../CardKeys";
import { GameSounds } from "../../../utilities/GameSounds";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class Evade extends CardType {
    protected chanceToDefend : number = 0.75;
    protected currentNumDefends: number = 1;
    protected numDefends = 1;

    constructor(key: CardKeys = CardKeys.EVADE_1_EVADE, upgradeKey: CardKeys | null = CardKeys.EVADE_2_DOUBLE_EVADE) {
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
            defenseSuccess = true;
        }

        if (defenseSuccess) {
            GameSounds.playDodge();
        }
        this.currentNumDefends++;
        return defenseSuccess;
    }

    getName(): string {
        return "evade";
    }

    getIcon(): string {
        return "evade";
    }

    getChanceToDefend(team?: Team): number {
        const modifiers = team?.getModifiers() || this.getPlayer()?.getModifiers();
    
        let chance = this.chanceToDefend;
        
        if (modifiers) {
            if (modifiers.getEvadeDisable()) {
                return 0;
            }
            chance = modifiers.getEvadeChanceOverride() ?? this.chanceToDefend;
        }
    
        return Phaser.Math.Clamp(chance, 0, 1);
    }

    getNumDefends(): number {
        return this.numDefends;
    }

    getCurrentNumDefends(): number {
        return this.currentNumDefends;
    }

    getDescription(): string {
        const niceChanceToDefend = this.getNicePercentage(this.getChanceToDefend());
        return `Evade ${this.getNumDefends()} attack(s). ${niceChanceToDefend}% effective.`;
    }
}