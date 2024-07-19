import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { OfficeCard } from "./OfficeCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";
import { Library } from "../../../throwdown/Library";
import { Throw } from "../../../cards/base/throw/Throw";
import { CoachList } from "../../../throwdown/CoachList";
import { Evade } from "../../../cards/base/evade/Evade";

export class CircleBack extends OfficeCard {

    protected overrideDamage: number = 1;

    constructor() {
        super(CardKeys.CIRCLE_BACK, null, ThrowdownPhase.ATTACK);
    }

    attack(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        //todo get the highest level one?
        const throwCard = this.getCoachOrPlayer().getRandomCardOfType(Throw);

        //call throw
        return throwCard.attack(member, target, team, opponentTeam, this.getName(), this.getOverrideDamage());
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        const evadeCard = this.getCoachOrPlayer().getRandomCardOfType(Evade);

        //call evade
        return evadeCard.defense(member, attacker, team, opponentTeam, canRetaliate, this.getName());
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        return "circle back";
    }

    getIcon(): string {
        return "evade-turbo";
    }

    getDescription(): string {
        return "1 evade and 1 throw (1 damage)";
    }

    getOverrideDamage(): number {
        return this.overrideDamage;
    }
}
