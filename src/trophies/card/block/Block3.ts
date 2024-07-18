import { CardKeys } from "../../../cards/CardKeys";
import { TrophyKey } from "../../TrophyKey";
import { TrophyType } from "../../TrophyType";
import { Block2 } from "./Block2";

export class Block3 extends TrophyType {
    constructor() {
        super(TrophyKey.BLOCK_3, "turbo block", "Permanently upgrade your better block to turbo block.", [new Block2], CardKeys.BLOCK_2);
    }
}