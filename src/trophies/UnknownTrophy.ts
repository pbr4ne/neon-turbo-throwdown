import { TrophyType } from "./TrophyType";

export class UnknownTrophy extends TrophyType {
    constructor() {
        super("unknown", "unknown", "unknown");
    }
}