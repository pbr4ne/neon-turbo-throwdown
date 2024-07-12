import Member from "../prefabs/Member";

export abstract class CardType {
    private name: string;
    private icon: string;

    constructor(name: string, icon: string) {
        this.name = name;
        this.icon = icon;
    }

    abstract offense(member: Member, target: Member): boolean;

    abstract defense(member: Member, attacker: Member): boolean;

    abstract needsTarget(): boolean;

    public getName(): string {
        return this.name;
    }

    public getIcon(): string {
        return this.icon;
    }
}