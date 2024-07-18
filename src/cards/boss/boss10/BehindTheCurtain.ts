import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { Boss10Card } from "./Boss10Card";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class BehindTheCurtain extends Boss10Card {

    constructor() {
        super(CardKeys.BEHIND_THE_CURTAIN, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        team.getModifiers().setTurnEvadeDisable(true);
        
        GameSounds.playBuff();
        member.showFloatingAction(this.getName());

        return true;
    }

    getName(): string {
        return "behind the curtain";
    }

    getIcon(): string {
        return "evade-triple";
    }

    getDescription(): string {
        return `Team's attacks ignore evade.`;
    }
}