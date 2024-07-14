import { TrophyType } from "../TrophyType";
import { SeeCards2 } from "./SeeCards2";

export class SeeCards3 extends TrophyType {
    constructor() {
        super("see-cards-3", "see cards 3", "See enemy cards for coach difficulty 💀.", [new SeeCards2()]);
    }
}