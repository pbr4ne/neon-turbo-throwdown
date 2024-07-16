import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { BetsyCard } from "./BetsyCard";

export class DeadOrAlive extends BetsyCard {

    protected chanceToSucceed: number = 0.5;
    protected offenseDamage: number = 5;

    constructor() {
        super(CardKeys.DEAD_OR_ALIVE, null);
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {

        let offenseSuccess = false;
        //check chance to hit
        if (this.getChanceToSucceed() >= Math.random()) {
            member.showFloatingAction(this.getName());
            const targetCard = target.getAssignedCard();
            let defenseSuccess = false;
            if (targetCard != null) {
                //see if they successfully defend
                defenseSuccess = targetCard.getCardType().defense(target, member, opponentTeam, team, false);
            }
            if (!defenseSuccess) {
                //reduce their HP if they failed to defend
                target.reduceHP(this.getOffenseDamage());
                offenseSuccess = true;
            }
        } else {
            //backfire
            const currentHP = member.getHP();
            member.reduceHP(currentHP);
        }

        if (offenseSuccess) {
            GameSounds.playHit();
        }
        return offenseSuccess;    
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        return "dead or alive";
    }

    getIcon(): string {
        return "throw-turbo";
    }

    getChanceToSucceed(): number {
        return this.chanceToSucceed;
    }

    getOffenseDamage(): number {
        return this.offenseDamage;
    }

    getDescription(): string {
        const chancePercentage = this.getNicePercentage(this.getChanceToSucceed());
        return `${chancePercentage}% chance to kill player, ${chancePercentage}% chance to deal ${this.getOffenseDamage()} damage to target.`;
    }
}