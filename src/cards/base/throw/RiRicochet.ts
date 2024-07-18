import { CardKeys } from "../../CardKeys";
import { UltraTurboThrow } from "./UltraTurboThrow";

export class RiRicochet extends UltraTurboThrow {
    protected numTargets: number = 2;

    constructor(key: CardKeys = CardKeys.THROW_5, upgradeKey: CardKeys | null = CardKeys.THROW_6) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "ri-ricochet";
    }

    getIcon(): string {
        return "ricochet";
    }
}