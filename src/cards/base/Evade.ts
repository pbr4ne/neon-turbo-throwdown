import { CardType } from "../CardType";
import Member from "../../prefabs/Member";
import Team from "../../prefabs/Team";
import { log } from "../../utilities/GameUtils";
import { CardKeys } from "../CardKeys";

export class Evade extends CardType {
    private static chanceToDefend : number = 0.75;
    private numDefends: number = 0;

    constructor(key: CardKeys = CardKeys.EVADE, upgradeKey: CardKeys | null = null) {
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
        log("Evade has been used " + this.numDefends + " times.");
        if (this.numDefends <= 1 && Math.random() < Evade.chanceToDefend) {
            log("Evade successful.");
            member.showFloatingAction(this.getName());
            return true;
        }
        log("Evade failed.");
        return false;
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

    getDescription(): string {
        const chancePercentage = (Evade.chanceToDefend * 100).toFixed(0); 
        return `Evade 1 attack. ${chancePercentage}% effective.`;
    }
}