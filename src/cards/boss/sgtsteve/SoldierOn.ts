import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { SgtSteveCard } from "./StgSteveCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class SoldierOn extends SgtSteveCard {

    protected healthMin: number = 1;
    protected healthMax: number = 3;

    constructor() {
        super(CardKeys.SOLDIER_ON, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        member.showFloatingAction(this.getName());
        //get a random integer between healthMin and healthMax
        const healthSteal = this.getRandomInteger(this.getHealthMin(), this.getHealthMax());

        member.increaseHP(healthSteal);
        GameSounds.playHeal();
        return true;
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