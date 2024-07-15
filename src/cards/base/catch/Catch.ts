import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import { CardKeys } from "../../CardKeys";

export class Catch extends CardType {
    private static chanceToDefend : number = 0.50;
    private static defenseDamage: number = 3;
    private numDefends: number = 0;

    constructor(key: CardKeys = CardKeys.CATCH, upgradeKey: CardKeys | null = null) {
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
        log("Catch has been used " + this.numDefends + " times.");
        if (this.numDefends <= 1 && Math.random() < Catch.chanceToDefend) {
            log("Catch successful.");
            member.showFloatingAction(this.getName());
            attacker.showFloatingAction(Catch.defenseDamage.toString());
            attacker.reduceHP(Catch.defenseDamage, attacker);
            GameSounds.playBlock();
            return true;
        }
        log("Catch failed.");
        return false;
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

    getDescription(): string {
        const chancePercentage = (Catch.chanceToDefend * 100).toFixed(0); 
        return `Catch 1 attack. ${chancePercentage}% effective. If successful, rebound ${Catch.defenseDamage} DMG.`;
    }
}