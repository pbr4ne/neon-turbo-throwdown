import { TrophyType } from "../TrophyType";
import { SeeCards1 } from "./SeeCards1";

export class SeeCards2 extends TrophyType {
    constructor() {
        super("see-cards-2", "see cards 2", "See enemy cards for coach difficulty 3.", [new SeeCards1()]);
    }
}