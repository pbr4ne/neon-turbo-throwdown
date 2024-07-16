
import { CardType } from "./CardType";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";
import { CardKeys } from "./CardKeys";


export class UnknownCard extends CardType {
    constructor(key: CardKeys = CardKeys.UNKNOWN, upgradeKey: CardKeys | null = null) {
        super(key, upgradeKey);
    }

    special(member: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        return false;
    }

    needsTarget(): boolean {
        return true;
    }

    getName(): string {
        return "unknown";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "unknown card that does nothing";
    }

    getUpgrade(): CardType | null{
        return null;
    }
}