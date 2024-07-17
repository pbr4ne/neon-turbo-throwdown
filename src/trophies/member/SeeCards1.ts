import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class SeeCards1 extends TrophyType {
    constructor() {
        super(TrophyKey.CARD_INSIGHT_1, "card insight 1", "Insight into enemy cards for coach difficulty 1.");
    }
}