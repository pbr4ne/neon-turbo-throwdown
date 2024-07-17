import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { HealthRegen1 } from "./HealthRegen1";

export class HealthRegen2 extends TrophyType {
    constructor() {
        super(TrophyKey.HEALTH_REGEN_2, "health regen 2", "Two random team members regenerate 1 health every turn.", [new HealthRegen1]);
    }
}