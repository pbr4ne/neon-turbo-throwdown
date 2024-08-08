import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { IdleSpeed1 } from "./IdleSpeed1";

export class IdleSpeed2 extends TrophyType {
    constructor() {
        super(TrophyKey.IDLE_SPEED_2, "idle speed 2", "Speed up idle time to 1 second between clicks and 300 ms between match turns.", [new IdleSpeed1]);
    }
}