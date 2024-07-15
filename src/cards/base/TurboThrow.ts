import { CardKeys } from "../CardKeys";
import { Throw } from "./Throw";

export class TurboThrow extends Throw {
    protected offenseDamage: number = 2;

    constructor(key: CardKeys = CardKeys.TURBO_THROW, upgradeKey: CardKeys | null = CardKeys.RICOCHET) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "turbo throw";
    }

    getIcon(): string {
        return "throw-turbo";
    }
}