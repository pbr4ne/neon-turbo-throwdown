import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class DefensiveStrategy1 extends TrophyType {
    constructor() {
        super(TrophyKey.DEFENSIVE_STRATEGY_1, "defensive strategy 1", "Your idle automation will make better choices with defensive cards.");
    }
}