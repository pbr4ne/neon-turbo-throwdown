import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { Boss10Card } from "./Boss10Card";

export class JustAGame extends Boss10Card {

    constructor() {
        super(CardKeys.JUST_A_GAME, null);
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
        return "just a game";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "tbd";
    }
}