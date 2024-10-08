import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { SeeTargets3 } from "./SeeTargets3";

export class SeeTargets4 extends TrophyType {
    constructor() {
        super(TrophyKey.TARGET_INSIGHT_4, "target insight 4", "Insight into enemy targeting for coach difficulty 💀.", [new SeeTargets3()]);
    }
}