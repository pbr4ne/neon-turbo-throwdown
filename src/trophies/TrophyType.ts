export abstract class TrophyType {
    private name: string;
    private description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }
}