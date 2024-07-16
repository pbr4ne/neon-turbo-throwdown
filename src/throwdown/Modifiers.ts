import { log } from "../utilities/GameUtils";
import Member from "../prefabs/Member";

export class Modifiers {
    //catch
    private combatCatchChanceMultiplier: number = 0;
    private turnCatchChanceMultiplier: number = 0;
    //evade
    private turnEvadeChanceOverride: number | null = null;
    private turnEvadeDisable: boolean = false;
    //block
    private turnBlockChanceMultiplier: number = 0;
    private combatBlockChanceMultiplier: number = 0;
    private turnBlockNumberAddition: number = 0;
    private combatBlockNumberAddition: number = 0;
    //throw
    private combatThrowEffectivenessMultiplier: number = 0;
    //damage
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
        return this.combatCatchChanceMultiplier + this.turnCatchChanceMultiplier;
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

    // Block chance
    getBlockChanceMultiplier(): number {
        return this.combatBlockChanceMultiplier + this.turnBlockChanceMultiplier;
    }

    addRoundBlockChanceMultiplier(multiplier: number): void {
        this.combatBlockChanceMultiplier += multiplier;
    }

    addTurnBlockChanceMultiplier(multiplier: number): void {
        this.turnBlockChanceMultiplier += multiplier;
    }

    getBlockNumberAddition(): number {
        return this.combatBlockNumberAddition + this.turnBlockNumberAddition;
    }

    addCombatBlockNumberAddition(addition: number): void {
        this.combatBlockNumberAddition += addition;
    }

    addTurnBlockNumberAddition(addition: number): void {
        this.turnBlockNumberAddition += addition;
    }

    resetRoundBlockChanceMultiplier(): void {
        this.combatBlockChanceMultiplier = 0;
    }

    resetTurnBlockChanceMultiplier(): void {
        this.turnBlockChanceMultiplier = 0;
    }

    resetRoundBlockNumberAddition(): void {
        this.combatBlockNumberAddition = 0;
    }

    resetTurnBlockNumberAddition(): void {
        this.turnBlockNumberAddition = 0;
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
        this.resetRoundBlockChanceMultiplier();
        this.resetRoundBlockNumberAddition();
    }

    resetAllTurnModifiers(): void {
        log("Resetting all turn modifiers.");
        this.resetTurnCatchChanceMultiplier();
        this.resetTurnEvadeChanceOverride();
        this.resetTurnEvadeDisable();
        this.resetAllTurnDamageReceiveMultipliers();
        this.resetTurnBlockChanceMultiplier();
        this.resetTurnBlockNumberAddition();
    }
}