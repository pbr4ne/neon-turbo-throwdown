import { TrophyType } from "../TrophyType";
import { SeeCards3 } from "./SeeCards3";

export class SeeCards4 extends TrophyType {
    constructor() {
        super("see-cards-4", "card insight 4", "Insight into enemy cards for coach difficulty 💀.", [new SeeCards3()]);
    }
}