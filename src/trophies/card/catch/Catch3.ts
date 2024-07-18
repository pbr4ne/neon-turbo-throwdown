import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";
import { Catch2 } from "./Catch2";

export class Catch3 extends TrophyType {
    constructor() {
        super(TrophyKey.CATCH_3, "big hands", "Permanently upgrade your turbo catch to big hands.", [new Catch2], CardKeys.CATCH_2_TURBO_CATCH);
    }
}