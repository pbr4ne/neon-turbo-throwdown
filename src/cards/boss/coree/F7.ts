import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { CoreeCard } from "./CoreeCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class F7 extends CoreeCard {

    protected numToResurrect: number = 1;
    protected healthToResurrect: number = 3;

    constructor() {
        super(CardKeys.F7, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        member.showFloatingAction(this.getName());
        this.getRandomDeadMembers(team, this.getNumToResurrect()).forEach((deadMember) => {
            deadMember.setHP(this.getHealthToResurrect());
            GameSounds.playHeal();
        });
        
        return true;
    }

    getName(): string {
        return "F7";
    }

    getIcon(): string {
        return "heal-turbo";
    }

    getNumToResurrect(): number {
        return this.numToResurrect;
    }

    getHealthToResurrect(): number {
        return this.healthToResurrect;
    }

    getDescription(): string {
        return `Resurrect ${this.getNumToResurrect()} dead member with ${this.getHealthToResurrect()} HP`;
    }
}