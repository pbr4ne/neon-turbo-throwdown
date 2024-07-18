import { CardKeys } from "../cards/CardKeys";
import { TrophyKey } from "./TrophyKey";

export abstract class TrophyType {
    private key: TrophyKey;
    private name: string;
    private description: string;
    private prerequisites: TrophyType[] = [];
    private cardKey: CardKeys | null = null;

    constructor(key: TrophyKey, name: string, description: string, prerequisites: TrophyType[] = [], cardKey: CardKeys | null = null) {
        this.key = key;
        this.name = name;
        this.description = description;
        this.prerequisites = prerequisites;
        this.cardKey = cardKey;
    }

    public getKey(): TrophyKey {
        return this.key;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPrerequisites(): TrophyType[] {
        return this.prerequisites;
    }

    public getCardKey(): CardKeys | null {
        return this.cardKey;
    }

    public equals(other: TrophyType): boolean {
        return this.key === other.key;
    }

    toString(): string {
        return `${this.key} - ${this.name} - ${this.cardKey}`;
    }
}