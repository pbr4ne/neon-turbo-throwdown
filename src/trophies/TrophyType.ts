import { CardType } from "~/cards/CardType";

export abstract class TrophyType {
    private key: string;
    private name: string;
    private description: string;
    private prerequisites: TrophyType[] = [];
    private card: CardType | null = null;

    constructor(key: string, name: string, description: string, prerequisites: TrophyType[] = [], card: CardType | null = null) {
        this.key = key;
        this.name = name;
        this.description = description;
        this.prerequisites = prerequisites;
        this.card = card;
    }

    public getKey(): string {
        return this.key;
    }

    public getName(): string {
        if (this.card) {
            return `${this.name} - ${this.card.getName()}`;
        }
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPrerequisites(): TrophyType[] {
        return this.prerequisites;
    }

    public getCard(): CardType | null {
        return this.card;
    }

    public equals(other: TrophyType): boolean {
        return this.key === other.key;
    }
}