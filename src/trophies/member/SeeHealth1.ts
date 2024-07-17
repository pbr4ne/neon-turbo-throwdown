import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class SeeHealth1 extends TrophyType {
    constructor() {
        super(TrophyKey.HEALTH_INSIGHT_1, "health insight 1", "Insight into enemy health for coach difficulty 1.");
    }
}