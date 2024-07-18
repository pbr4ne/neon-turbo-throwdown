import { CardKeys } from "../../CardKeys";
import { Evade } from "./Evade";

export class DoubleEvade extends Evade {
    protected numDefends : number = 2;

    constructor(key: CardKeys = CardKeys.EVADE_2, upgradeKey: CardKeys | null = CardKeys.EVADE_3) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "double evade";
    }

    getIcon(): string {
        return "evade-double";
    }
}