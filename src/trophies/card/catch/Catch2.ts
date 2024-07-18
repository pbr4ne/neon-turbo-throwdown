import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";

export class Catch2 extends TrophyType {
    constructor() {
        super(TrophyKey.CATCH_2, "turbo catch", "Permanently upgrade your catch to turbo catch.", [], CardKeys.CATCH_1_CATCH);
    }
}