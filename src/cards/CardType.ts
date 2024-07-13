import Member from "../prefabs/Member";
import Team from "../prefabs/Team";

export abstract class CardType {
    private name: string;
    private icon: string;

    constructor(name: string, icon: string) {
        this.name = name;
        this.icon = icon;
    }

    abstract special(member: Member, team: Team, opponentTeam: Team): boolean;

    abstract offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean;

    abstract defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean;

    abstract needsTarget(): boolean;

    public getName(): string {
        return this.name;
    }

    public getIcon(): string {
        return this.icon;
    }
}