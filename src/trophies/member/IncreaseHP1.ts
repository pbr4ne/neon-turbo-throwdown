import { TrophyType } from "../TrophyType";

export class IncreaseHP1 extends TrophyType {
    constructor() {
        super("increase-hp-1", "increase hp 1", "Increase one team member's HP to 4.");
    }
}