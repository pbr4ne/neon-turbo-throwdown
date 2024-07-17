import { TrophyKey } from "./TrophyKey";
import { TrophyType } from "./TrophyType";

export class UnknownTrophy extends TrophyType {
    constructor() {
        super(TrophyKey.UNKNOWN, "unknown", "unknown");
    }
}