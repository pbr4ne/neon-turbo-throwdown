import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";
import { Throw3 } from "./Throw3";

export class Throw4 extends TrophyType {
    constructor() {
        super(TrophyKey.THROW_4, "ultra turbo throw", "Permanently upgrade your ricochet to ultra turbo throw .", [new Throw3], CardKeys.THROW_3_RICOCHET);
    }
}