import { TrophyType } from "./TrophyType";

export class IncreaseHP extends TrophyType {
    constructor() {
        super("increase-hp", "increase hp", "Increase team member HP by 1");
    }
}