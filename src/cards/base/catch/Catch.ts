import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import { CardKeys } from "../../CardKeys";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class Catch extends CardType {
    protected chanceToDefend : number = 0.50;
    protected defenseDamage: number = 2;
    protected ricochetDamage: number = 1;
    protected currentNumDefends: number = 0;
    protected reboundTargets: number = 1;
    protected numDefends = 1;

    constructor(key: CardKeys = CardKeys.CATCH_1, upgradeKey: CardKeys | null = CardKeys.CATCH_2) {
        super(key, upgradeKey, ThrowdownPhase.DEFENSE);
    }

    resetTurn(): void {
        this.currentNumDefends = 0;
        super.resetTurn();
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean, overrideName?: string): boolean {
        let defenseSuccess = false;
        if (this.getCurrentNumDefends() < this.getNumDefends() && this.getChanceToDefend(team) >= Math.random()) {
            member.showFloatingAction(overrideName ? overrideName : this.getName());

            if (canRetaliate) {
                let membersToRebound = this.getRandomAliveMembers(opponentTeam, attacker, this.getReboundTargets() - 1);

                //do defense damage to attacker
                attacker.reduceHP(this.getDefenseDamage());

                //do ricochet damage to rebounds
                membersToRebound.forEach((enemyMember) => {
                    enemyMember.reduceHP(this.getRicochetDamage());
                });
            }

            defenseSuccess = true;
        }

        if (defenseSuccess) {
            GameSounds.playCatch();
        }

        this.currentNumDefends++;
        log("Catch has been used " + this.currentNumDefends + " times.");
        return defenseSuccess;
    }

    getName(): string {
        return "catch";
    }

    getIcon(): string {
        return "catch";
    }

    getChanceToDefend(team?: Team): number {
        const modifiers = team?.getModifiers() || this.getPlayer()?.getModifiers();
        let chance = this.chanceToDefend;
    
        if (modifiers) {
            chance += modifiers.getCatchChanceMultiplier();
        }
    
        return Phaser.Math.Clamp(chance, 0, 1);
    }

    getDefenseDamage(): number {
        return this.defenseDamage;
    }

    getCurrentNumDefends(): number {
        return this.currentNumDefends;
    }

    getReboundTargets(): number {
        return this.reboundTargets;
    }

    getRicochetDamage(): number {
        return this.ricochetDamage;
    }

    getNumDefends(): number {
        return this.numDefends;
    }

    getDescription(): string {
        const niceChanceToDefend = this.getNicePercentage(this.getChanceToDefend());
        let description = `Catch ${this.getNumDefends()} attack${this.getNumDefends() !== 1 ? 's' : ''}. ${niceChanceToDefend}% effective. If successful, rebound ${this.getDefenseDamage()} damage to attacker.`;

        if (this.getReboundTargets() > 1) {
            const numEnemies = this.getReboundTargets() - 1;
            description += ` Also deal ${this.getRicochetDamage()} damage to ${numEnemies} random ${numEnemies > 1 ? 'enemies' : 'enemy'}.`;
        }
        return description;
    }
}