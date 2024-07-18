import { CardKeys } from "../../CardKeys";
import { TurboEvade } from "./TurboEvade";

export class TripleEvade extends TurboEvade {
    protected numDefends : number = 3;

    constructor(key: CardKeys = CardKeys.EVADE_4, upgradeKey: CardKeys | null = null) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "triple evade";
    }

    getIcon(): string {
        return "evade-triple";
    }
}