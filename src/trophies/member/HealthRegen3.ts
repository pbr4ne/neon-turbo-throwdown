import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { HealthRegen2 } from "./HealthRegen2";

export class HealthRegen3 extends TrophyType {
    constructor() {
        super(TrophyKey.HEALTH_REGEN_3, "health regen 3", "Three random team members regenerate 1 health every turn.", [new HealthRegen2]);
    }
}