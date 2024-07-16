import { TrophyType } from "../TrophyType";
import { SeeTargets1 } from "./SeeTargets1";

export class SeeTargets2 extends TrophyType {
    constructor() {
        super("see-targets-2", "see targets 2", "See enemy targeting for coach difficulty 2.", [new SeeTargets1()]);
    }
}