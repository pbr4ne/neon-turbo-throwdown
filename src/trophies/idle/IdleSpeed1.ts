import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class IdleSpeed1 extends TrophyType {
    constructor() {
        super(TrophyKey.IDLE_SPEED_1, "idle speed 1", "Speed up idle time to 3 seconds between clicks and 300 ms between combat turns.");
    }
}