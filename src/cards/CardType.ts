import Member from "../prefabs/Member";
import Team from "../prefabs/Team";

export abstract class CardType {

    abstract special(member: Member, team: Team, opponentTeam: Team): boolean;

    abstract offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean;

    abstract defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean;

    abstract needsTarget(): boolean;

    abstract getName(): string;

    abstract getIcon(): string;

    abstract getDescription(): string;
}