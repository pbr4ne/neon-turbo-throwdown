import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { SeeHealth2 } from "./SeeHealth2";

export class SeeHealth3 extends TrophyType {
    constructor() {
        super(TrophyKey.HEALTH_INSIGHT_3, "health insight 3", "Insight into enemy health for coach difficulty 3.", [new SeeHealth2()]);
    }
}