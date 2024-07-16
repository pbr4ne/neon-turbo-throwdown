import { CardKeys } from "../../CardKeys";
import { Evade } from "./Evade";

export class DoubleEvade extends Evade {
    protected numDefends : number = 2;

    constructor(key: CardKeys = CardKeys.DOUBLE_EVADE, upgradeKey: CardKeys | null = CardKeys.TURBO_EVADE) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "double evade";
    }

    getIcon(): string {
        return "evade-turbo";
    }
}