import { TrophyType } from "../TrophyType";
import { SeeCards3 } from "./SeeCards3";

export class SeeCards4 extends TrophyType {
    constructor() {
        super("see-cards-4", "see cards 4", "See enemy cards for coach difficulty 💀.", [new SeeCards3()]);
    }
}