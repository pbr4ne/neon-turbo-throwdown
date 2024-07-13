export abstract class TrophyType {
    private key: string;
    private name: string;
    private description: string;

    constructor(key: string, name: string, description: string) {
        this.key = key;
        this.name = name;
        this.description = description;
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
}