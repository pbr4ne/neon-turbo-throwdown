import { TrophyType } from "../TrophyType";
import { SeeTargets3 } from "./SeeTargets3";

export class SeeTargets4 extends TrophyType {
    constructor() {
        super("see-targets-4", "see targets 4", "See enemy targeting for coach difficulty 💀.", [new SeeTargets3()]);
    }
}