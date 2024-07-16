import { TrophyType } from "../TrophyType";
import { IncreaseHP1 } from "./IncreaseHP1";

export class IncreaseHP2 extends TrophyType {
    constructor() {
        super("increase-hp-2", "increase hp 2", "Increase two team members' HP to 4.", [new IncreaseHP1()]);
    }
}