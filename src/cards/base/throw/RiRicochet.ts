import { CardKeys } from "../../CardKeys";
import { UltraTurboThrow } from "./UltraTurboThrow";

export class RiRicochet extends UltraTurboThrow {
    protected numTargets: number = 3;

    constructor(key: CardKeys = CardKeys.THROW_5_RI_RICOCHET, upgradeKey: CardKeys | null = CardKeys.THROW_6_SNIPER_THROW) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "ri-ricochet";
    }

    getIcon(): string {
        return "ricochet";
    }
}