import { log } from "../utilities/GameUtils";
import Member from "../prefabs/Member";

export class Modifiers {
    private roundCatchChanceMultiplier: number = 1;
    private turnCatchChanceMultiplier: number = 1;
    private turnEvadeChanceOverride: number | null = null;
    private turnEvadeDisable: boolean = false;
    private turnDamageReceiveMultipliers: Map<Member, number> = new Map();

    // Evade chance
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

    // Catch chance
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

    // Damage receive multiplier
    addTurnDamageReceiveMultiplier(member: Member, multiplier: number): void {
        const currentMult = this.turnDamageReceiveMultipliers.get(member) ?? 1;
        this.turnDamageReceiveMultipliers.set(member, currentMult);
    }

    getTurnDamageReceiveMultiplier(member: Member): number {
        return this.turnDamageReceiveMultipliers.get(member) ?? 1;
    }

    resetTurnDamageReceiveMultiplier(member: Member): void {
        this.turnDamageReceiveMultipliers.set(member, 1);
    }

    resetAllTurnDamageReceiveMultipliers(): void {
        this.turnDamageReceiveMultipliers.clear();
    }

    // Reset all
    resetAllRoundModifiers(): void {
        log("Resetting all round modifiers.");
        this.resetRoundCatchChanceMultiplier();
    }

    resetAllTurnModifiers(): void {
        log("Resetting all turn modifiers.");
        this.resetTurnCatchChanceMultiplier();
        this.resetTurnEvadeChanceOverride();
        this.resetTurnEvadeDisable();
        this.resetAllTurnDamageReceiveMultipliers();
    }
}