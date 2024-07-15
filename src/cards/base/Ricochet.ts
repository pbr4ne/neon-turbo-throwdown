import { CardKeys } from "../CardKeys";
import { TurboThrow } from "./TurboThrow";

export class Ricochet extends TurboThrow {
    protected numTargets: number = 2;

    constructor(key: CardKeys = CardKeys.RICOCHET, upgradeKey: CardKeys | null = CardKeys.ULTRA_TURBO_THROW) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "ricochet";
    }

    getIcon(): string {
        return "throw-turbo-ultra";
    }
}