import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class OffensiveStrategy1 extends TrophyType {
    constructor() {
        super(TrophyKey.OFFENSIVE_STRATEGY_1, "offensive strategy 1", "Your idle automation will make better choices with offensive cards.");
    }
}