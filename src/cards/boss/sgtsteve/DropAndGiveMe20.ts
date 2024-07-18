import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { SgtSteveCard } from "./StgSteveCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class DropAndGiveMe20 extends SgtSteveCard {

    protected damageIncrease: number = 1;

    constructor() {
        super(CardKeys.DROP_AND_GIVE_ME_20, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        if (member) {
            member.showFloatingAction(this.getName());
            GameSounds.playBuff();
            team.getModifiers().addCombatDamageDealtAddition(member, this.getDamageIncrease());
        }
        return true;
    }

    getName(): string {
        return "drop & give me 20";
    }

    getIcon(): string {
        return "throw-turbo";
    }

    getDamageIncrease(): number {
        return this.damageIncrease;
    }

    getDescription(): string {
        return `Raise attack power by ${this.getDamageIncrease()} for this team member.`;
    }
}