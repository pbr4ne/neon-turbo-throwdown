import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { SeeTargets2 } from "./SeeTargets2";

export class SeeTargets3 extends TrophyType {
    constructor() {
        super(TrophyKey.TARGET_INSIGHT_3, "target insight 3", "Insight into enemy targeting for coach difficulty 3.", [new SeeTargets2()]);
    }
}