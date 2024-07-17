import { TrophyType } from "../TrophyType";
import { SeeTargets1 } from "./SeeTargets1";

export class SeeTargets2 extends TrophyType {
    constructor() {
        super("see-targets-2", "target insight 2", "Insight into enemy targeting for coach difficulty 2.", [new SeeTargets1()]);
    }
}