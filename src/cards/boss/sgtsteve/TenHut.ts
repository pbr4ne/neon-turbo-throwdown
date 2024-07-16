import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { SgtSteveCard } from "./StgSteveCard";

export class TenHut extends SgtSteveCard {

    constructor() {
        super(CardKeys.TEN_HUT, null);
    }

    resetTurn(): void {
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        return false;
    }

    needsTarget(): boolean {
        return false;
    }

    getName(): string {
        return "ten-hut!";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "tbd";
    }
}