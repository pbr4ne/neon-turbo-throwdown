import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class IdleSpeed1 extends TrophyType {
    constructor() {
        super(TrophyKey.IDLE_SPEED_1, "idle speed 1", "Speed up idle time to 2.5 seconds between clicks and 400 ms between combat turns.");
    }
}