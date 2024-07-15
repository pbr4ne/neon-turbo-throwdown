import { CardKeys } from "../CardKeys";
import { TurboThrow } from "./TurboThrow";

export class Ricochet extends TurboThrow {
    protected numTargets = 2;

    constructor() {
        super(CardKeys.RICOCHET, CardKeys.TURBO_THROW);
    }

    getName(): string {
        return "ricochet";
    }

    getIcon(): string {
        return "throw-turbo-ultra";
    }
}