import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";
import { Evade2 } from "./Evade2";


export class Evade3 extends TrophyType {
    constructor() {
        super(TrophyKey.EVADE_3, "turbo evade", "Permanently upgrade your double evade to turbo evade.", [new Evade2], CardKeys.EVADE_2);
    }
}