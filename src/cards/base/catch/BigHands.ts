import { CardKeys } from "../../CardKeys";
import { TurboCatch } from "./TurboCatch";

export class BigHands extends TurboCatch {
    protected reboundTargets : number = 2;

    constructor(key: CardKeys = CardKeys.BIG_HANDS, upgradeKey: CardKeys | null = null) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "big hands";
    }

    getIcon(): string {
        return "catch-turbo-ultra";
    }
}