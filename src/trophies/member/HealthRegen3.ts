import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { HealthRegen2 } from "./HealthRegen2";

export class HealthRegen3 extends TrophyType {
    constructor() {
        super(TrophyKey.HEALTH_REGEN_3, "health regen 3", "Every turn, all injured team members regenerate 1 health.", [new HealthRegen2]);
    }
}