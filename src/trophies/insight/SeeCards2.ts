import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { SeeCards1 } from "./SeeCards1";

export class SeeCards2 extends TrophyType {
    constructor() {
        super(TrophyKey.CARD_INSIGHT_2, "card insight 2", "Insight into enemy cards for coach difficulty 2.", [new SeeCards1()]);
    }
}