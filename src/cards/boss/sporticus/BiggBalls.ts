import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";

export class BiggBalls extends CardType {

    protected chance: number = 0.2;

    constructor(key: CardKeys = CardKeys.THROW, upgradeKey: CardKeys | null = CardKeys.TURBO_THROW) {
        super(key, upgradeKey);
    }

    resetTurn(): void {
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        log("Adding catch chance multiplier of " + this.getChance() * -1 + " to " + (opponentTeam instanceof Player ? "player" : "boss") + " team.");
        opponentTeam.addCatchChanceMultiplier(this.getChance() * -1);
        log("New catch chance multiplier: " + opponentTeam.getCatchChanceMultiplier());
        
        member.showFloatingAction(this.getName());

        return true;
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
        return "bigg balls";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        const chancePercentage = this.getNicePercentage(this.getChance());
        return `Your balls are ${chancePercentage} harder to catch for the remainder of the fight.`;
    }

    getChance(): number {
        return this.chance;
    }
}