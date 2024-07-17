import { CardKeys } from "../../CardKeys";
import { TurboCatch } from "./TurboCatch";

export class BigHands extends TurboCatch {
    protected chanceToDefend : number = 0.75

    constructor(key: CardKeys = CardKeys.CATCH_3_BIG_HANDS, upgradeKey: CardKeys | null = null) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "big hands";
    }

    getIcon(): string {
        return "catch-big";
    }
}