import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class HealStrategy1 extends TrophyType {
    constructor() {
        super(TrophyKey.HEAL_STRATEGY_1, "heal strategy 1", "Your idle automation will make better choices with healing cards.");
    }
}