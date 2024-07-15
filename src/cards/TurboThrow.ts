import { CardKeys } from "./CardKeys";
import { CardType } from "./CardType";
import { Throw } from "./Throw";

export class TurboThrow extends Throw {
    protected offenseDamage: number = 2;

    constructor() {
        super(CardKeys.TURBO_THROW, null);
    }

    getName(): string {
        return "turbo throw";
    }

    getIcon(): string {
        return "throw-turbo";
    }

}