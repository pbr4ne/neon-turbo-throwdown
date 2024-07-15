import Member from "../prefabs/Member";
import Team from "../prefabs/Team";
import { CardFactory } from "./CardFactory";
import { CardKeys } from "./CardKeys";

export abstract class CardType {

    public key: CardKeys;
    private upgradeKey: CardKeys | null;

    constructor(key: CardKeys | CardKeys.UNKNOWN, upgradeKey: CardKeys | null) {
        this.key = key;
        this.upgradeKey = upgradeKey;
    }

    abstract resetTurn(): void;

    abstract special(member: Member, team: Team, opponentTeam: Team): boolean;

    abstract offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean;

    abstract defense(member: Member, attacker: Member, team: Team, opponentTeam: Team): boolean;

    abstract needsTarget(): boolean;

    abstract getName(): string;

    abstract getIcon(): string;

    abstract getDescription(): string;

    getKey(): CardKeys {
        return this.key;
    }

    getUpgrade(): CardType | null {
        if (this.upgradeKey != null) {
            return CardFactory.createCardType(this.upgradeKey);
        }
        return null;
    }

    toString(): string {
        return `CardType: ${this.getKey()}`;
    }
}