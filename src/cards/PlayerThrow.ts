import { Library } from "../throwdown/Library";
import { TurboThrow } from "../trophies/TurboThrow";
import { UltraTurboThrow } from "../trophies/UltraTurboThrow";
import { Throw } from "./Throw";

export class PlayerThrow extends Throw {

    getOffenseDamage(): number {
        if (Library.getTrophyTypes().some(trophy => trophy instanceof UltraTurboThrow)) {
            return this.offenseDamage + 2;
        }
        else if (Library.getTrophyTypes().some(trophy => trophy instanceof TurboThrow)) {
            return this.offenseDamage + 1;
        }
        return this.offenseDamage;
    }

    getName(): string {
        if (Library.getTrophyTypes().some(trophy => trophy instanceof UltraTurboThrow)) {
            return "ultra turbo throw";
        }
        if (Library.getTrophyTypes().some(trophy => trophy instanceof TurboThrow)) {
            return "turbo throw";
        }
        return "throw";
    }

    getIcon(): string {
        if (Library.getTrophyTypes().some(trophy => trophy instanceof UltraTurboThrow)) {
            return "unknown";
        }
        if (Library.getTrophyTypes().some(trophy => trophy instanceof TurboThrow)) {
            return "turbo-throw";
        }
        return "throw";
    }
}