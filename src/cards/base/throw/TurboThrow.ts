import { CardKeys } from "../../CardKeys";
import { Throw } from "./Throw";

export class TurboThrow extends Throw {
    protected offenseDamage: number = 2;

    constructor(key: CardKeys = CardKeys.THROW_2, upgradeKey: CardKeys | null = CardKeys.THROW_3) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "turbo throw";
    }

    getIcon(): string {
        return "throw-turbo";
    }
}