import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class IncreaseHP1 extends TrophyType {
    constructor() {
        super(TrophyKey.INCREASE_HP_1, "add hp 1", "Increase team members' HP to 4.");
    }
}