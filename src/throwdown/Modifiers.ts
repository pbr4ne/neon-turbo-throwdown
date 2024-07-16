import { log } from "../utilities/GameUtils";
import Member from "../prefabs/Member";

export class Modifiers {
    private combatCatchChanceMultiplier: number = 0;
    private turnCatchChanceMultiplier: number = 0;
    private turnEvadeChanceOverride: number | null = null;
    private turnEvadeDisable: boolean = false;
    private turnDamageReceiveMultipliers: Map<Member, number> = new Map();
    private combatThrowEffectivenessMultiplier: number = 0;

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
        return this.combatCatchChanceMultiplier * this.turnCatchChanceMultiplier;
    }

    addRoundCatchChanceMultiplier(multiplier: number): void {
        this.combatCatchChanceMultiplier += multiplier;
    }

    addTurnCatchChanceMultiplier(multiplier: number): void {
        this.turnCatchChanceMultiplier += multiplier;
    }

    resetRoundCatchChanceMultiplier(): void {
        this.combatCatchChanceMultiplier = 0;
    }

    resetTurnCatchChanceMultiplier(): void {
        this.turnCatchChanceMultiplier = 0;
    }

    // Damage receive multiplier
    addTurnDamageReceiveMultiplier(member: Member, multiplier: number): void {
        const currentMult = this.turnDamageReceiveMultipliers.get(member) ?? 0;
        this.turnDamageReceiveMultipliers.set(member, currentMult);
    }

    getTurnDamageReceiveMultiplier(member: Member): number {
        return this.turnDamageReceiveMultipliers.get(member) ?? 0;
    }

    resetTurnDamageReceiveMultiplier(member: Member): void {
        this.turnDamageReceiveMultipliers.set(member, 0);
    }

    resetAllTurnDamageReceiveMultipliers(): void {
        this.turnDamageReceiveMultipliers.clear();
    }

    // Throw effectiveness
    getThrowEffectivenessMultiplier(): number {
        return this.combatThrowEffectivenessMultiplier;
    }

    addCombatThrowEffectivenessMultiplier(multiplier: number): void {
        
        this.combatThrowEffectivenessMultiplier += multiplier;
        log("ROUND THROW EFFECTIVENESS MULTIPLIER: " + this.combatThrowEffectivenessMultiplier);
    }

    resetCombatThrowEffectivenessMultiplier(): void {
        this.combatThrowEffectivenessMultiplier = 0;
    }

    // Reset all
    resetAllCombatModifiers(): void {
        log("Resetting all combat modifiers.");
        this.resetRoundCatchChanceMultiplier();
        this.resetCombatThrowEffectivenessMultiplier();
    }

    resetAllTurnModifiers(): void {
        log("Resetting all turn modifiers.");
        this.resetTurnCatchChanceMultiplier();
        this.resetTurnEvadeChanceOverride();
        this.resetTurnEvadeDisable();
        this.resetAllTurnDamageReceiveMultipliers();
    }
}