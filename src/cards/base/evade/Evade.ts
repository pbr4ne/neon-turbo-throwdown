import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { log } from "../../../utilities/GameUtils";
import { CardKeys } from "../../CardKeys";
import { GameSounds } from "../../../utilities/GameSounds";

export class Evade extends CardType {
    protected chanceToDefend : number = 0.75;
    protected currentNumDefends: number = 1;
    protected numDefends = 1;

    constructor(key: CardKeys = CardKeys.EVADE_1_EVADE, upgradeKey: CardKeys | null = CardKeys.EVADE_2_DOUBLE_EVADE) {
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

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        let defenseSuccess = false;
        if (this.getCurrentNumDefends() <= 1 && this.getChanceToDefend() >= Math.random()) {
            member.showFloatingAction(this.getName());
            defenseSuccess = true;
        }

        if (defenseSuccess) {
            GameSounds.playBlock();
        }
        this.currentNumDefends++;
        log("Evade has been used " + this.currentNumDefends + " times.");
        return defenseSuccess;
    }

    needsTarget(): boolean {
        return false;
    }

    getName(): string {
        return "evade";
    }

    getIcon(): string {
        return "evade";
    }

    getChanceToDefend(): number {
        return this.chanceToDefend;
    }

    getNumDefends(): number {
        return this.numDefends;
    }

    getCurrentNumDefends(): number {
        return this.currentNumDefends;
    }

    getDescription(): string {
        const niceChanceToDefend = this.getNicePercentage(this.getChanceToDefend());
        return `Evade ${this.getNumDefends()}. ${niceChanceToDefend}% effective.`;
    }
}