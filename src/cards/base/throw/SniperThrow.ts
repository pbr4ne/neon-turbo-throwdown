import { CardKeys } from "../../CardKeys";
import { RiRicochet } from "./RiRicochet";

export class SniperThrow extends RiRicochet {
    protected chanceToOffend : number = 0.90;

    constructor(key: CardKeys = CardKeys.SNIPER_THROW, upgradeKey: CardKeys | null = null) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "sniper-throw";
    }

    getIcon(): string {
        return "sniper";
    }
}