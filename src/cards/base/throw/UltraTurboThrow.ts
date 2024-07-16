import { CardKeys } from "../../CardKeys";
import { Ricochet } from "./Ricochet";

export class UltraTurboThrow extends Ricochet {
    protected offenseDamage: number = 3;

    constructor(key: CardKeys = CardKeys.THROW_4_ULTRA_TURBO_THROW, upgradeKey: CardKeys | null = CardKeys.THROW_5_RI_RICOCHET) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "ultra turbo throw";
    }

    getIcon(): string {
        return "throw-turbo-ultra";
    }
}