import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";

export class Throw extends CardType {
    protected chanceToOffend : number = 0.75;
    protected offenseDamage: number = 1;
    protected numTargets: number = 1;

    constructor(key: CardKeys = CardKeys.THROW, upgradeKey: CardKeys | null = CardKeys.TURBO_THROW) {
        super(key, upgradeKey);
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {

        let anyOffenseSuccess = false;
        let membersToTarget = this.getRandomOtherAliveMembers(opponentTeam, target, this.getNumTargets() - 1);
        membersToTarget.unshift(target);

        membersToTarget.forEach((enemyMember) => {
            let offenseSuccess = false;
            //check chance to hit
            if (this.getChanceToOffend() >= Math.random()) {
                const targetCard = enemyMember.getAssignedCard();
                let defenseSuccess = false;
                if (targetCard != null) {
                    //see if they successfully defend
                    defenseSuccess = targetCard.getCardType().defense(enemyMember, member, opponentTeam, team);
                }
                if (!defenseSuccess) {
                    //reduce their HP if they failed to defend
                    enemyMember.showFloatingAction(this.getOffenseDamage().toString());
                    enemyMember.reduceHP(this.getOffenseDamage(), member);
                    offenseSuccess = true;
                }
            } else {
                //show miss
                member.showFloatingAction("miss");
            }
    
            if (offenseSuccess) {
                anyOffenseSuccess = true;
            }
        });

        if (anyOffenseSuccess) {
            GameSounds.playHit();
        }
        return anyOffenseSuccess;     
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean {
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