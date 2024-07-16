import { CardKeys } from "../../CardKeys";
import { TurboEvade } from "./TurboEvade";

export class TripleEvade extends TurboEvade {
    protected numDefends : number = 3;

    constructor(key: CardKeys = CardKeys.TRIPLE_EVADE, upgradeKey: CardKeys | null = null) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "triple evade";
    }

    getIcon(): string {
        return "evade-turbo-ultra";
    }
}