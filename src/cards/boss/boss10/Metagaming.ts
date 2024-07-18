import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { Boss10Card } from "./Boss10Card";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";
import { Throw } from "../../../cards/base/throw/Throw";
import { Evade } from "../../../cards/base/evade/Evade";
import { Block } from "../../../cards/base/block/Block";
import { Catch } from "../../../cards/base/catch/Catch";

export class Metagaming extends Boss10Card {

    //todo this only evades.
    protected offenseDamage: number = 3;
    protected currentNumDefends: number = 1;
    protected numDefends = 1;

    constructor() {
        super(CardKeys.METAGAMING, null, ThrowdownPhase.ATTACK);
    }

    resetTurn(): void {
        this.currentNumDefends = 0;
        super.resetTurn();
    }

    //todo does this need to have a chance to offend?
    attack(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {

        //todo get the highest level one?
        const throwCard = this.getCoachOrPlayer().getRandomCardOfType(Throw);

        //call throw
        return throwCard.attack(member, target, team, opponentTeam, this.getName());
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        
        const blockCard = this.getCoachOrPlayer().getRandomCardOfType(Block);
        const blockSuccess = blockCard.defense(member, attacker, team, opponentTeam, canRetaliate, this.getName());

        if (blockSuccess) {
            return true;
        }

        const evadeCard = this.getCoachOrPlayer().getRandomCardOfType(Evade);
        const evadeSuccess = evadeCard.defense(member, attacker, team, opponentTeam, canRetaliate, this.getName());

        if (evadeSuccess) {
            return true;
        }

        const catchCard = this.getCoachOrPlayer().getRandomCardOfType(Catch);
        return catchCard.defense(member, attacker, team, opponentTeam, canRetaliate, this.getName());
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        return "meta gaming";
    }

    getIcon(): string {
        return "evade-turbo-ultra";
    }
    
    getDescription(): string {
        return `Block, evade, catch and throw for ${this.getOffenseDamage()} damage.`;
    }

    getNumDefends(): number {
        return this.numDefends;
    }

    getCurrentNumDefends(): number {
        return this.currentNumDefends;
    }

    //todo - should this take in the attack damage modifiers?
    getOffenseDamage(): number {
        return this.offenseDamage;
    }
}