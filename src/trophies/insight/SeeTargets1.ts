import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class SeeTargets1 extends TrophyType {
    constructor() {
        super(TrophyKey.TARGET_INSIGHT_1, "target insight 1", "Insight into enemy targeting for coach difficulty 1.");
    }
}