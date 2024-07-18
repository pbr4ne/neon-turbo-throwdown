import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";
import { Evade3 } from "./Evade3";

export class Evade4 extends TrophyType {
    constructor() {
        super(TrophyKey.EVADE_4, "triple evade", "Permanently upgrade your turbo evade to triple evade.", [new Evade3], CardKeys.EVADE_3_TURBO_EVADE);
    }
}