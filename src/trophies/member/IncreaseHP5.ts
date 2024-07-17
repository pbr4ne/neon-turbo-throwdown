import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { IncreaseHP4 } from "./IncreaseHP4";

export class IncreaseHP5 extends TrophyType {
    constructor() {
        super(TrophyKey.INCREASE_HP_5, "increase hp 5", "Increase two team members' HP to 5.", [new IncreaseHP4()]);
    }
}