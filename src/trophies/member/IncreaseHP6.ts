import { TrophyType } from "../TrophyType";
import { IncreaseHP5 } from "./IncreaseHP5";

export class IncreaseHP6 extends TrophyType {
    constructor() {
        super("increase-hp-6", "increase hp 6", "Increase three team members' HP to 5.", [new IncreaseHP5()]);
    }
}