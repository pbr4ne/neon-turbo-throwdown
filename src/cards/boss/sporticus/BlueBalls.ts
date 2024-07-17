import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { SporticusCard } from "./SporticusCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class BlueBalls extends SporticusCard {

    protected damageMultiplier: number = 2;

    constructor() {
        super(CardKeys.BLUE_BALLS, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        if (target) {
            member.showFloatingAction(this.getName());
            opponentTeam.getModifiers().addTurnDamageReceiveMultiplier(target, 2);
        }

        return true;
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        return "blue balls";
    }

    getIcon(): string {
        return "throw-turbo";
    }

    getDamageMultiplier(): number {
        return this.damageMultiplier;
    }

    getDescription(): string {
        return `Target opponent takes ${this.getDamageMultiplier()}x damage this turn.`;
    }
}