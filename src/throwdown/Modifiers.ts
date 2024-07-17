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
    private combatDamageDealtAdditions: Map<Member, number> = new Map();
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

    addCombatCatchChanceMultiplier(multiplier: number): void {
        this.combatCatchChanceMultiplier += multiplier;
    }

    addTurnCatchChanceMultiplier(multiplier: number): void {
        this.turnCatchChanceMultiplier += multiplier;
    }

    resetCombatCatchChanceMultiplier(): void {
        this.combatCatchChanceMultiplier = 0;
    }

    resetTurnCatchChanceMultiplier(): void {
        this.turnCatchChanceMultiplier = 0;
    }

    // Block chance
    getBlockChanceMultiplier(): number {
        return this.combatBlockChanceMultiplier + this.turnBlockChanceMultiplier;
    }

    addCombatBlockChanceMultiplier(multiplier: number): void {
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

    resetCombatBlockChanceMultiplier(): void {
        this.combatBlockChanceMultiplier = 0;
    }

    resetTurnBlockChanceMultiplier(): void {
        this.turnBlockChanceMultiplier = 0;
    }

    resetCombatBlockNumberAddition(): void {
        this.combatBlockNumberAddition = 0;
    }

    resetTurnBlockNumberAddition(): void {
        this.turnBlockNumberAddition = 0;
    }

    // Damage receive
    addTurnDamageReceiveMultiplier(member: Member, multiplier: number): void {
        const currentMult = this.turnDamageReceiveMultipliers.get(member) ?? 1;
        this.turnDamageReceiveMultipliers.set(member, currentMult * multiplier);
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

    // Damage dealt
    addCombatDamageDealtAddition(member: Member, addition: number): void {
        const currentAdd = this.combatDamageDealtAdditions.get(member) ?? 0;
        this.combatDamageDealtAdditions.set(member, currentAdd + addition);
    }

    getCombatDamageDealtAddition(member: Member): number {
        return this.combatDamageDealtAdditions.get(member) ?? 0;
    }

    resetCombatDamageDealtAddition(member: Member): void {
        this.combatDamageDealtAdditions.set(member, 0);
    }

    resetAllCombatDamageDealtAdditions(): void {
        this.combatDamageDealtAdditions.clear();
    }

    // Throw effectiveness
    getThrowEffectivenessMultiplier(): number {
        return this.combatThrowEffectivenessMultiplier;
    }

    addCombatThrowEffectivenessMultiplier(multiplier: number): void {
        this.combatThrowEffectivenessMultiplier += multiplier;
    }

    resetCombatThrowEffectivenessMultiplier(): void {
        this.combatThrowEffectivenessMultiplier = 0;
    }

    // Reset all
    resetAllCombatModifiers(): void {
        log("Resetting all combat modifiers.");
        this.resetCombatCatchChanceMultiplier();
        this.resetCombatThrowEffectivenessMultiplier();
        this.resetCombatBlockChanceMultiplier();
        this.resetCombatBlockNumberAddition();
        this.resetAllCombatDamageDealtAdditions();
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
