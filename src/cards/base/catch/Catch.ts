import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import { CardKeys } from "../../CardKeys";
import Player from "../../../prefabs/Player";
import { CoachList } from "../../../throwdown/CoachList";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class Catch extends CardType {
    protected chanceToDefend : number = 0.50;
    protected defenseDamage: number = 1;
    protected currentNumDefends: number = 1;
    protected reboundTargets: number = 1;
    protected numDefends = 1;

    constructor(key: CardKeys = CardKeys.CATCH_1_CATCH, upgradeKey: CardKeys | null = CardKeys.CATCH_2_TURBO_CATCH) {
        super(key, upgradeKey, ThrowdownPhase.DEFENSE);
    }

    resetTurn(): void {
        this.currentNumDefends = 0;
        super.resetTurn();
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        let defenseSuccess = false;
        if (this.getCurrentNumDefends() <= this.getNumDefends() && this.getChanceToDefend(team) >= Math.random()) {
            member.showFloatingAction(this.getName());

            if (canRetaliate) {
                let membersToRebound = this.getRandomAliveMembers(opponentTeam, attacker, this.getReboundTargets() - 1);
                membersToRebound.unshift(attacker);
                membersToRebound.forEach((enemyMember) => {
                    enemyMember.reduceHP(this.getDefenseDamage());
                });
            }

            defenseSuccess = true;
        }

        if (defenseSuccess) {
            GameSounds.playBlock();
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

    getNumDefends(): number {
        return this.numDefends;
    }

    getDescription(): string {
        const niceChanceToDefend = this.getNicePercentage(this.getChanceToDefend());
        return `Catches ${this.getNumDefends()} attack(s). ${niceChanceToDefend}% effective. If successful, rebound ${this.getDefenseDamage()} damage to attacker and ${this.getReboundTargets() - 1} random enem(ies).`;
    }
}