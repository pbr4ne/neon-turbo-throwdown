import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { TycoonCard } from "./TycoonCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class Monocle extends TycoonCard {

    protected chance: number = 0.1;

    constructor() {
        super(CardKeys.MONOCLE, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        team.getModifiers().addCombatThrowEffectivenessMultiplier(this.getChance());
        
        member.showFloatingAction(this.getName());

        return true;
    }

    getName(): string {
        return "monocle";
    }

    getIcon(): string {
        return "throw";
    }

    getDescription(): string {
        const chancePercentage = this.getNicePercentage(this.getChance());
        return `${chancePercentage}% throw effectiveness for the combat.`;
    }

    getChance(): number {
        return this.chance;
    }
}