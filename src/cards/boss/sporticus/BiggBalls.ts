import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { SporticusCard } from "./SporticusCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class BiggBalls extends SporticusCard {

    protected chance: number = 0.2;

    constructor() {
        super(CardKeys.BIGG_BALLS, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        opponentTeam.getModifiers().addRoundCatchChanceMultiplier(this.getChance() * -1);
        
        member.showFloatingAction(this.getName());

        return true;
    }

    getName(): string {
        return "bigg balls";
    }

    getIcon(): string {
        return "catch";
    }

    getDescription(): string {
        const chancePercentage = this.getNicePercentage(this.getChance());
        return `Your balls are ${chancePercentage}% harder to catch for the remainder of the fight.`;
    }

    getChance(): number {
        return this.chance;
    }
}