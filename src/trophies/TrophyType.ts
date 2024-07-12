import Player from "../prefabs/Player";
import { IncreaseDamage } from "./IncreaseDamage";
import { IncreaseDefense } from "./IncreaseDefense";
import { IncreaseHP } from "./IncreaseHP";

export abstract class TrophyType {
    private name: string;
    private icon: string;

    constructor(name: string, icon: string) {
        this.name = name;
        this.icon = icon;
    }

    abstract applyChanges(player: Player): void;

    public getName(): string {
        return this.name;
    }

    public getIcon(): string {
        return this.icon;
    }
}