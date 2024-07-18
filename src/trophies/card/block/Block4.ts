import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";
import { Block3 } from "./Block3";

export class Block4 extends TrophyType {
    constructor() {
        super(TrophyKey.BLOCK_4, "best block", "Permanently upgrade your turbo block to best block.", [new Block3], CardKeys.BLOCK_3);
    }
}