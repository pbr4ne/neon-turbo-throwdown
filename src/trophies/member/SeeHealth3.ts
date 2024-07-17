import { TrophyType } from "../TrophyType";
import { SeeHealth2 } from "./SeeHealth2";

export class SeeHealth3 extends TrophyType {
    constructor() {
        super("see-health-3", "see health 3", "See enemy health for coach difficulty 3.", [new SeeHealth2()]);
    }
}