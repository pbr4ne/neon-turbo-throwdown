import { TrophyType } from "./TrophyType";
import { TurboThrow } from "./TurboThrow";

export class UltraTurboThrow extends TrophyType {
    constructor() {
        super("ultra-turbo-throw", "ultra turbo throw", "Increases throw DMG by 2", [new TurboThrow()]);
    }
}