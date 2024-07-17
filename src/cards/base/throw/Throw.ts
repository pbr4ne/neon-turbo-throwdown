import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";
import { log } from "../../../utilities/GameUtils";

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
        if (this.getChanceToOffend(team) >= Math.random()) {
            const targetCard = target.getAssignedCard();
            let defenseSuccess = false;
            if (targetCard != null) {
                //see if they successfully defend
                defenseSuccess = targetCard.getCardType().defense(target, member, opponentTeam, team, canRetaliate);
            }
            if (!defenseSuccess) {
                //reduce their HP if they failed to defend
                target.reduceHP(this.getOffenseDamage(member, target, team));
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
        const description = `Target 1 enemy for ${this.getOffenseDamage()} damage. ${chancePercentage}% effective.`
        if (this.getNumTargets() > 1) {
            return description + ` Ricochets to ${this.getNumTargets() - 1} additional random target(s).`;
        }
        return description;
    }

    getChanceToOffend(team?: Team): number {
        const modifiers = team?.getModifiers() || this.getPlayer()?.getModifiers();
        let chance = this.chanceToOffend;
    
        if (modifiers) {
            chance += modifiers.getThrowEffectivenessMultiplier();
        }
    
        return Phaser.Math.Clamp(chance, 0, 1);
    }

    getOffenseDamage(member?: Member, target?: Member, team?: Team): number {
        if (!member || !target) {
            return this.offenseDamage;
        }
        const modifiers = team?.getModifiers() || this.getPlayer()?.getModifiers();
        let damage = this.offenseDamage;
    
        if (modifiers) {
            damage *= modifiers.getTurnDamageReceiveMultiplier(target);
            damage += modifiers.getCombatDamageDealtAddition(member);
        }

        if (damage < 0) {
            damage = 0;
        }

        return damage;
    }

    getNumTargets(): number {
        return this.numTargets;
    }
}