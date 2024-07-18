import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";

export class Block2 extends TrophyType {
    constructor() {
        super(TrophyKey.BLOCK_2, "better block", "Permanently upgrade your block to better block.", [], CardKeys.BLOCK_1);
    }
}