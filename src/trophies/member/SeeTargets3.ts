import { TrophyType } from "../TrophyType";
import { SeeTargets2 } from "./SeeTargets2";

export class SeeTargets3 extends TrophyType {
    constructor() {
        super("see-targets-3", "see targets 3", "See enemy targeting for coach difficulty 3.", [new SeeTargets2()]);
    }
}