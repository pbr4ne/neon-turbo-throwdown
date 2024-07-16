import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { SgtSteveCard } from "./StgSteveCard";

export class SoldierOn extends SgtSteveCard {

    protected healthMin: number = 1;
    protected healthMax: number = 3;

    constructor() {
        super(CardKeys.SOLDIER_ON, null);
    }

    resetTurn(): void {
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        //get a random integer between healthMin and healthMax
        const healthSteal = Math.floor(Math.random() * (this.getHealthMax() - this.getHealthMin() + 1)) + this.getHealthMin();

        member.showFloatingAction(`+${healthSteal}`, "#00ff00", 1);
        member.increaseHP(healthSteal);
        GameSounds.playHeal();
        return true;
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    needsTarget(): boolean {
        return false;
    }

    getName(): string {
        return "soldier on";
    }

    getIcon(): string {
        return "heal";
    }

    getHealthMin(): number {
        return this.healthMin;
    }

    getHealthMax(): number {
        return this.healthMax;
    }

    getDescription(): string {
        return `Heal ${this.getHealthMin()} - ${this.getHealthMax()} HP.`;
    }
}