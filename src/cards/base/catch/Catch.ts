import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import { CardKeys } from "../../CardKeys";
import Player from "../../../prefabs/Player";
import { CoachList } from "../../../throwdown/CoachList";

export class Catch extends CardType {
    protected chanceToDefend : number = 0.50;
    protected defenseDamage: number = 1;
    protected currentNumDefends: number = 1;
    protected reboundTargets: number = 1;
    protected numDefends = 1;

    constructor(key: CardKeys = CardKeys.CATCH, upgradeKey: CardKeys | null = CardKeys.TURBO_CATCH) {
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
        console.log("DEFENSE " + team);
        let defenseSuccess = false;
        log(`DEFENSE - this is the modifier: ${this.getChanceToDefend(team)}`);
        if (this.getCurrentNumDefends() <= 1 && this.getChanceToDefend(team) >= Math.random()) {
            member.showFloatingAction(this.getName());

            let membersToRebound = this.getRandomOtherAliveMembers(opponentTeam, attacker, this.getReboundTargets() - 1);
            membersToRebound.unshift(attacker);
            membersToRebound.forEach((enemyMember) => {
                enemyMember.showFloatingAction(this.getDefenseDamage().toString(), "#ff005a");
                enemyMember.reduceHP(this.getDefenseDamage(), attacker);
            });

            defenseSuccess = true;
        }

        if (defenseSuccess) {
            GameSounds.playBlock();
        }

        this.currentNumDefends++;
        log("Catch has been used " + this.currentNumDefends + " times.");
        return defenseSuccess;
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

    getChanceToDefend(team?: Team): number {
        if (team) {
            log("Returning chance to defend for team: " + team);
            log((this.chanceToDefend * team.getCatchChanceMultiplier()).toString());
            return this.chanceToDefend * team.getCatchChanceMultiplier();
        } else {
            log("Returning chance to defend for base player");
            const player = this.getPlayer();
            if (player) {
                return this.chanceToDefend * player.getCatchChanceMultiplier();
            }
            return this.chanceToDefend;
        }
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
        return `Blocks ${this.getNumDefends()}. ${niceChanceToDefend}% effective. If successful, rebound ${this.getDefenseDamage()} damage.`;
    }
}