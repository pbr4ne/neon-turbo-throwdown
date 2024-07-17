import { TrophyType } from "../TrophyType";
import { SeeCards2 } from "./SeeCards2";

export class SeeCards3 extends TrophyType {
    constructor() {
        super("see-cards-3", "card insight 3", "Insight into enemy cards for coach difficulty 3.", [new SeeCards2()]);
    }
}