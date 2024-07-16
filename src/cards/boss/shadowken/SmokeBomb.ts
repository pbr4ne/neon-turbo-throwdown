import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { ShadowkenCard } from "./ShadowkenCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class SmokeBomb extends ShadowkenCard {
    protected evadeChance: number = 0.9;

    constructor() {
        super(CardKeys.SMOKE_BOMB, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        team.getModifiers().setTurnEvadeChanceOverride(this.getEvadeChance());
        
        member.showFloatingAction(this.getName());

        return true;
    }

    getName(): string {
        return "smoke bomb";
    }

    getIcon(): string {
        return "evade-triple";
    }

    getEvadeChance(): number {
        return this.evadeChance;
    }

    getDescription(): string {
        const niceEvadeChance = this.getNicePercentage(this.getEvadeChance());
        return `Your team members have ${niceEvadeChance}% evade this turn.`;
    }
}