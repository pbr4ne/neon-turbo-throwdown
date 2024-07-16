import { log } from "../utilities/GameUtils";

export class Modifiers {
    private roundCatchChanceMultiplier: number = 1;
    private turnCatchChanceMultiplier: number = 1;

    getCatchChanceMultiplier(): number {
        return this.roundCatchChanceMultiplier * this.turnCatchChanceMultiplier;
    }

    addRoundCatchChanceMultiplier(multiplier: number): void {
        this.roundCatchChanceMultiplier += multiplier;
        if (this.roundCatchChanceMultiplier < 0) {
            this.roundCatchChanceMultiplier = 0;
        }
    }

    addTurnCatchChanceMultiplier(multiplier: number): void {
        this.turnCatchChanceMultiplier += multiplier;
        if (this.turnCatchChanceMultiplier < 0) {
            this.turnCatchChanceMultiplier = 0;
        }
    }

    resetRoundCatchChanceMultiplier(): void {
        this.roundCatchChanceMultiplier = 1;
    }

    resetTurnCatchChanceMultiplier(): void {
        this.turnCatchChanceMultiplier = 1;
    }

    resetAllRoundMultipliers(): void {
        log("Resetting all round multipliers.");
        this.resetRoundCatchChanceMultiplier();
    }

    resetAllTurnMultipliers(): void {
        log("Resetting all turn multipliers.");
        this.resetTurnCatchChanceMultiplier();
    }
}