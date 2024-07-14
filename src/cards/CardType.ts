import { Coach } from "../throwdown/Coach";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";
import { TrophyType } from "../trophies/TrophyType";
import { CoachList } from "../throwdown/CoachList";
import { Library } from "../throwdown/Library";

export abstract class CardType {

    protected coach: Coach;

    constructor(coach: Coach) {
        this.coach = coach;
    }

    abstract special(member: Member, team: Team, opponentTeam: Team): boolean;

    abstract offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean;

    abstract defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean;

    abstract needsTarget(): boolean;

    abstract getName(): string;

    abstract getIcon(): string;

    abstract getDescription(): string;

    getTrophyTypes(): TrophyType[] {
        if (this.coach === CoachList.you) {
            return Library.getTrophyTypes();
        } else {
            return this.coach.getTrophyTypes();
        }
    }

    toString(): string {
        return `CardType: ${this.getName()} ${this.coach}`;
    }
}