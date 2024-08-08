import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { IdleSpeed2 } from "./IdleSpeed2";

export class IdleSpeed3 extends TrophyType {
    constructor() {
        super(TrophyKey.IDLE_SPEED_3, "idle speed 3", "Speed up idle time to 500 ms between clicks and 200 ms between match turns.", [new IdleSpeed2]);
    }
}