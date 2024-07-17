import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { HealthRegen3 } from "./HealthRegen3";

export class Resurrect1 extends TrophyType {
    constructor() {
        super(TrophyKey.RESURRECT_1, "resurrect 1", "Every turn, one dead team member has a 10% chance to resurrect.", [new HealthRegen3]);
    }
}