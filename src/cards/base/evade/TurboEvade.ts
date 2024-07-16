import { CardKeys } from "../../CardKeys";
import { DoubleEvade } from "./DoubleEvade";

export class TurboEvade extends DoubleEvade {
    protected chanceToDefend : number = 0.90;

    constructor(key: CardKeys = CardKeys.TURBO_EVADE, upgradeKey: CardKeys | null = CardKeys.TRIPLE_EVADE) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "turbo evade";
    }

    getIcon(): string {
        return "evade-turbo-ultra";
    }
}