import { CardKeys } from "../../CardKeys";
import { UltraTurboThrow } from "./UltraTurboThrow";

export class RiRicochet extends UltraTurboThrow {
    protected numTargets: number = 3;

    constructor(key: CardKeys = CardKeys.RI_RICOCHET, upgradeKey: CardKeys | null = CardKeys.SNIPER_THROW) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "ri-ricochet";
    }

    getIcon(): string {
        return "ricochet";
    }
}