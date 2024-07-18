import { CardKeys } from "../../CardKeys";
import { Ricochet } from "./Ricochet";

export class UltraTurboThrow extends Ricochet {
    protected offenseDamage: number = 3;

    constructor(key: CardKeys = CardKeys.THROW_4, upgradeKey: CardKeys | null = CardKeys.THROW_5) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "ultra turbo throw";
    }

    getIcon(): string {
        return "throw-turbo-ultra";
    }
}