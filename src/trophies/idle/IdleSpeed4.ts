import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { IdleSpeed3 } from "./IdleSpeed3";

export class IdleSpeed4 extends TrophyType {
    constructor() {
        super(TrophyKey.IDLE_SPEED_4, "idle speed 4", "Speed up idle time to 100 ms between clicks and 100 ms between combat turns.", [new IdleSpeed3]);
    }
}