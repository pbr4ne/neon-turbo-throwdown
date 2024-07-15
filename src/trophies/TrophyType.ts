export abstract class TrophyType {
    private key: string;
    private name: string;
    private description: string;
    private num: number;
    private prerequisites: TrophyType[] = [];

    constructor(key: string, name: string, description: string, prerequisites: TrophyType[] = [], num: number = 0) {
        this.key = key;
        this.name = name;
        this.description = description;
        this.num = num;
        this.prerequisites = prerequisites
    }

    public getKey(): string {
        return this.key;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getNum(): number {
        return this.num;
    }

    public setNum(num: number): void {
        this.num = num;
    }

    public getPrerequisites(): TrophyType[] {
        return this.prerequisites;
    }

    public equals(other: TrophyType): boolean {
        return this.key === other.key;
    }
}