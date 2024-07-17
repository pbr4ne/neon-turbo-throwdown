import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { CoreeCard } from "./CoreeCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class Delete extends CoreeCard {

    protected offenseDamage: number = 4;

    constructor() {
        super(CardKeys.DELETE, null, ThrowdownPhase.ATTACK);
    }

    //todo does this need to have a chance to offend?
    attack(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {

        if (!target) {
            return false;
        }
        const targetCard = target.getAssignedCard();
        let defenseSuccess = false;
        if (targetCard != null) {
            //see if they successfully defend
            defenseSuccess = targetCard.getCardType().defense(target, member, opponentTeam, team, true);
        }
        if (!defenseSuccess) {
            //reduce their HP if they failed to defend
            member.showFloatingAction(this.getName());
            target.reduceHP(this.getOffenseDamage());
            GameSounds.playHit();
            return true;
        }

        return false;
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        return "delete";
    }

    getIcon(): string {
        return "sniper";
    }

    //todo - should this take in the attack damage modifiers?
    getOffenseDamage(): number {
        return this.offenseDamage;
    }

    getDescription(): string {
        return "Attack with 4 damage.";
    }
}