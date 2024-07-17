import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { IncreaseHP3 } from "./IncreaseHP3";

export class IncreaseHP4 extends TrophyType {
    constructor() {
        super(TrophyKey.INCREASE_HP_4, "increase hp 4", "Increase one team members' HP to 5.", [new IncreaseHP3()]);
    }
}