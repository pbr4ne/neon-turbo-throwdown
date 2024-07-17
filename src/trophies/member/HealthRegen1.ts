import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class HealthRegen1 extends TrophyType {
    constructor() {
        super(TrophyKey.HEALTH_REGEN_1, "health regen 1", "One random team member regenerates 1 health every turn.");
    }
}