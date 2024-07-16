import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { BetsyCard } from "./BetsyCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class BLockOfAges extends BetsyCard {

    protected numTurns: number = 1;

    constructor() {
        super(CardKeys.BLOCK_OF_AGES, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        team.getModifiers().addCombatBlockNumberAddition(this.getNumTurns());
        
        member.showFloatingAction(this.getName());

        return true;
    }

    getName(): string {
        return "block of ages";
    }

    getIcon(): string {
        return "block-turbo-ultra";
    }

    getDescription(): string {
        return `Increase all block by ${this.getNumTurns()} this combat.`;
    }

    getNumTurns(): number {
        return this.numTurns;
    }
}