import { CardKeys } from "../../CardKeys";
import { TurboThrow } from "./TurboThrow";

export class Ricochet extends TurboThrow {
    protected numTargets: number = 2;

    constructor(key: CardKeys = CardKeys.THROW_3, upgradeKey: CardKeys | null = CardKeys.THROW_4) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "ricochet";
    }

    getIcon(): string {
        return "ricochet";
    }
}