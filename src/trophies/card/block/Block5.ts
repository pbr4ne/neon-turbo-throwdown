import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";
import { Block4 } from "./Block4";

export class Block5 extends TrophyType {
    constructor() {
        super(TrophyKey.BLOCK_5, "double block", "Permanently upgrade your best block to double block.", [new Block4], CardKeys.BLOCK_4);
    }
}