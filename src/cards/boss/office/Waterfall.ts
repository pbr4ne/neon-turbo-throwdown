import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { OfficeCard } from "./OfficeCard";

export class Waterfall extends OfficeCard {

    protected offenseDamage: number = 1;

    constructor() {
        super(CardKeys.WATERFALL, null);
    }

    resetTurn(): void {
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        let anyOffenseSuccess = false;
        let membersToTarget = this.getAllOtherAliveMembers(opponentTeam);

        log("waterfall members to target " + membersToTarget.length);
        membersToTarget.forEach((enemyMember) => {
            log("waterfalling");
            let offenseSuccess = false;

            member.showFloatingAction(this.getName());
            const targetCard = enemyMember.getAssignedCard();
            let defenseSuccess = false;
            if (targetCard != null) {
                //see if they successfully defend
                defenseSuccess = targetCard.getCardType().defense(enemyMember, member, opponentTeam, team);
            }
            if (!defenseSuccess) {
                //reduce their HP if they failed to defend
                enemyMember.reduceHP(this.getOffenseDamage());
                offenseSuccess = true;
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

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    needsTarget(): boolean {
        return false;
    }

    getName(): string {
        return "waterfall";
    }

    getIcon(): string {
        return "throw-turbo";
    }

    getOffenseDamage(): number {    
        return this.offenseDamage;
    }

    getDescription(): string {
        return "1 damage to each enemy.";
    }
}