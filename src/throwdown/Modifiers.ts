import { log } from "../utilities/GameUtils";

export class Modifiers {
    private roundCatchChanceMultiplier: number = 1;
    private turnCatchChanceMultiplier: number = 1;
    private turnEvadeChanceOverride: number | null = null;
    private turnEvadeDisable: boolean = false;

    //evade chance
    getEvadeChanceOverride(): number | null {
        return this.turnEvadeChanceOverride;
    }

    getEvadeDisable(): boolean {
        return this.turnEvadeDisable;
    }

    setTurnEvadeChanceOverride(value: number): void {
        this.turnEvadeChanceOverride = value;
    }

    setTurnEvadeDisable(value: boolean): void {
        this.turnEvadeDisable = value;
    }

    resetTurnEvadeChanceOverride(): void {
        this.turnEvadeChanceOverride = null;
    }

    resetTurnEvadeDisable(): void {
        this.turnEvadeDisable = false;
    }

    //catch chance
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

    //reset all
    resetAllRoundModifiers(): void {
        log("Resetting all round modifiers.");
        this.resetRoundCatchChanceMultiplier();
    }

    resetAllTurnModifiers(): void {
        log("Resetting all turn modifiers.");
        this.resetTurnCatchChanceMultiplier();
        this.resetTurnEvadeChanceOverride();
        this.resetTurnEvadeDisable();
    }
}