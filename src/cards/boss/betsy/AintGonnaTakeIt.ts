import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { BetsyCard } from "./BetsyCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class AintGonnaTakeIt extends BetsyCard {

    protected numTurns: number = 1;

    constructor() {
        super(CardKeys.AINT_GONNA_TAKE_IT, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        team.getModifiers().addTurnBlockNumberAddition(this.getNumTurns());
        
        GameSounds.playBuff();
        member.showFloatingAction(this.getName());

        return true;
    }

    getName(): string {
        return "ain't gonna take it";
    }

    getIcon(): string {
        return "block-double";
    }

    getDescription(): string {
        return `Increase all block by ${this.getNumTurns()} this turn.`;
    }

    getNumTurns(): number {
        return this.numTurns;
    }
}