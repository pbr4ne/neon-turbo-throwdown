import { TrophyType } from "../TrophyType";
import { IncreaseHP2 } from "./IncreaseHP2";

export class IncreaseHP3 extends TrophyType {
    constructor() {
        super("increase-hp-3", "increase hp 3", "Increase three team members' HP to 4.", [new IncreaseHP2()]);
    }
}