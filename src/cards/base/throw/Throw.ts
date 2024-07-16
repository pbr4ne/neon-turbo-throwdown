import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class Throw extends CardType {
    protected chanceToOffend : number = 0.75;
    protected offenseDamage: number = 1;
    protected numTargets: number = 1;

    constructor(key: CardKeys = CardKeys.THROW_1_THROW, upgradeKey: CardKeys | null = CardKeys.THROW_2_TURBO_THROW) {
        super(key, upgradeKey, ThrowdownPhase.ATTACK);
    }

    attack(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {

        let anyOffenseSuccess = false;
        let membersToTarget = this.getRandomAliveMembers(opponentTeam, target, this.getNumTargets() - 1);

        if (target) {
            if(this.attackMember(member, target, team, opponentTeam, true)) {
                anyOffenseSuccess = true;
            }
        }
        
        membersToTarget.forEach((enemyMember) => {
            if(this.attackMember(member, enemyMember, team, opponentTeam, false)) {
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

    attackMember(member: Member, target: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        if (this.getChanceToOffend() >= Math.random()) {
            const targetCard = target.getAssignedCard();
            let defenseSuccess = false;
            if (targetCard != null) {
                //see if they successfully defend
                defenseSuccess = targetCard.getCardType().defense(target, member, opponentTeam, team, canRetaliate);
            }
            if (!defenseSuccess) {
                //reduce their HP if they failed to defend
                target.reduceHP(this.getOffenseDamage());
                return true;
            }
        }
        return false;
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        return "throw";
    }

    getIcon(): string {
        return "throw";
    }

    getDescription(): string {
        const chancePercentage = this.getNicePercentage(this.getChanceToOffend());
        return `Targets ${this.getNumTargets()} for ${this.getOffenseDamage()} damage. ${chancePercentage}% effective.`;
    }

    getChanceToOffend(): number {
        return this.chanceToOffend;
    }

    getOffenseDamage(): number {
        return this.offenseDamage;
    }

    getNumTargets(): number {
        return this.numTargets;
    }
}