import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";
import { Throw4 } from "./Throw4";

export class Throw5 extends TrophyType {
    constructor() {
        super(TrophyKey.THROW_5, "ri-ricochet", "Permanently upgrade your ultra turbo throw to ri-ricochet.", [new Throw4], CardKeys.THROW_4_ULTRA_TURBO_THROW);
    }
}