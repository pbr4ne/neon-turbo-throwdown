import { CardKeys } from "../../CardKeys";
import { DoubleEvade } from "./DoubleEvade";

export class TurboEvade extends DoubleEvade {
    protected chanceToDefend : number = 0.90;

    constructor(key: CardKeys = CardKeys.EVADE_3, upgradeKey: CardKeys | null = CardKeys.EVADE_4) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "turbo evade";
    }

    getIcon(): string {
        return "evade-turbo";
    }
}