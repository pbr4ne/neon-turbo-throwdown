import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { IncreaseHP2 } from "./IncreaseHP2";

export class HealthRegen1 extends TrophyType {
    constructor() {
        super(TrophyKey.HEALTH_REGEN_1, "health regen 1", "Every turn, one random injured team member regenerates 1 health.", [new IncreaseHP2]);
    }
}