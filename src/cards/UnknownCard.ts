
import { CardType } from "./CardType";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";
import { CardKeys } from "./CardKeys";


export class UnknownCard extends CardType {
    constructor(key: CardKeys = CardKeys.UNKNOWN, upgradeKey: CardKeys | null = null) {
        super(key, upgradeKey);
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