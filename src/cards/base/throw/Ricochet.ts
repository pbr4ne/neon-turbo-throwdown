import { CardKeys } from "../../CardKeys";
import { TurboThrow } from "./TurboThrow";

export class Ricochet extends TurboThrow {
    protected numTargets: number = 2;

    constructor(key: CardKeys = CardKeys.THROW_3_RICOCHET, upgradeKey: CardKeys | null = CardKeys.THROW_4_ULTRA_TURBO_THROW) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "ricochet";
    }

    getIcon(): string {
        return "ricochet";
    }
}