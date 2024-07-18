import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";
import { Throw2 } from "./Throw2";

export class Throw3 extends TrophyType {
    constructor() {
        super(TrophyKey.THROW_3, "ricochet", "Permanently upgrade your turbo throw to ricochet.", [new Throw2], CardKeys.THROW_2);
    }
}