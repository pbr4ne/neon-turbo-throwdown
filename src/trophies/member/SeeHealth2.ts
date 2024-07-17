import { TrophyType } from "../TrophyType";
import { SeeHealth1 } from "./SeeHealth1";

export class SeeHealth2 extends TrophyType {
    constructor() {
        super("see-health-2", "health insight 2", "Insight into enemy health for coach difficulty 2.", [new SeeHealth1()]);
    }
}