import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";

export class Evade2 extends TrophyType {
    constructor() {
        super(TrophyKey.EVADE_2, "double evade", "Permanently upgrade your evade to double evade.", [], CardKeys.EVADE_1);
    }
}