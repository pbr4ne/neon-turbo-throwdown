import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";
import { Throw5 } from "./Throw5";

export class Throw6 extends TrophyType {
    constructor() {
        super(TrophyKey.THROW_6, "sniper throw", "Permanently upgrade your ri-ricochet to sniper-throw.", [new Throw5], CardKeys.THROW_5_RI_RICOCHET);
    }
}