import { TrophyType } from "./TrophyType";
import { TurboThrow } from "./TurboThrow";

export class UltraTurboThrow extends TrophyType {
    constructor() {
        super("ultra-turbo-throw", "ultra turbo throw", "Upgrades your turbo throw to ultra turbo throw. Increases DMG by 1.", [new TurboThrow()]);
    }
}