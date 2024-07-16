import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { TurbonerdCard } from "./TurbonerdCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class DidIDoThat extends TurbonerdCard {

    protected numTargetsMin: number = 1;
    protected numTargetsMax: number = 3;
    protected damageMin: number = 2;
    protected damageMax: number = 4;

    constructor() {
        super(CardKeys.DID_I_DO_THAT, null, ThrowdownPhase.ATTACK);
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        let anyOffenseSuccess = false;
        let membersToTarget = this.getRandomAliveMembers(opponentTeam, null, this.getRandomInteger(this.getNumTargetsMin(), this.getNumTargetsMax()));

        membersToTarget.forEach((enemyMember) => {
            let offenseSuccess = false;

            const targetCard = enemyMember.getAssignedCard();
            let defenseSuccess = false;
            if (targetCard != null) {
                //see if they successfully defend
                defenseSuccess = targetCard.getCardType().defense(enemyMember, member, opponentTeam, team, false);
            }
            if (!defenseSuccess) {
                //reduce their HP if they failed to defend
                enemyMember.reduceHP(this.getRandomInteger(this.getDamageMin(), this.getDamageMax()));
                offenseSuccess = true;
            }
    
            if (offenseSuccess) {
                anyOffenseSuccess = true;
            }
        });

        if (anyOffenseSuccess) {
            member.showFloatingAction(this.getName());
            GameSounds.playHit();
        } else {
            member.showFloatingAction("miss");
        }

        return anyOffenseSuccess;  
    }

    needsTarget(): boolean {
        return false;
    }

    getName(): string {
        return "did I do that?";
    }

    getIcon(): string {
        return "throw-turbo-ultra";
    }

    getDescription(): string {
        return `Does ${this.getDamageMin()}-${this.getDamageMax()} damage to ${this.getNumTargetsMin()}-${this.getNumTargetsMax()} enemies.`;
    }

    getNumTargetsMin(): number {
        return this.numTargetsMin;
    }

    getNumTargetsMax(): number {
        return this.numTargetsMax;
    }

    getDamageMin(): number {
        return this.damageMin;
    }

    getDamageMax(): number {
        return this.damageMax;
    }
}