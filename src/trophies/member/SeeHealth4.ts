import { TrophyType } from "../TrophyType";
import { SeeHealth3 } from "./SeeHealth3";

export class SeeHealth4 extends TrophyType {
    constructor() {
        super("see-health-4", "health insight 4", "Insight into enemy health for coach difficulty 💀.", [new SeeHealth3()]);
    }
}