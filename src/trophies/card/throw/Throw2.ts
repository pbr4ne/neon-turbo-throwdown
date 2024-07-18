import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";

export class Throw2 extends TrophyType {
    constructor() {
        super(TrophyKey.THROW_2, "turbo throw", "Permanently upgrade your throw to turbo throw.", [], CardKeys.THROW_1);
    }
}