import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { TycoonCard } from "./TycoonCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class SupplyAndDemand extends TycoonCard {

    protected healthSteal: number = 1;

    constructor() {
        super(CardKeys.SUPPLY_AND_DEMAND, null, ThrowdownPhase.ATTACK);
    }

    attack(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        let offenseSuccess = false;
        if (target) {
            member.showFloatingAction(this.getName());
            const targetCard = target.getAssignedCard();
            let defenseSuccess = false;
            if (targetCard != null) {
                //see if they successfully defend
                defenseSuccess = targetCard.getCardType().defense(target, member, opponentTeam, team, true);
            }
            if (!defenseSuccess) {
                //reduce their HP if they failed to defend
                target.reduceHP(this.getHealthSteal());
                member.increaseHP(this.getHealthSteal());
                GameSounds.playHeal();
                offenseSuccess = true;
            }
        }

        return offenseSuccess;
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        return "supply & demand";
    }

    getIcon(): string {
        return "heal";
    }

    getDescription(): string {
        return "Steal 1 health from target.";
    }

    getHealthSteal(): number {
        return this.healthSteal;
    }
}