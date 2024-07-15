import { CardKeys } from "../../CardKeys";
import { Catch } from "./Catch";

export class TurboCatch extends Catch {
    protected reboundTargets : number = 2;

    constructor(key: CardKeys = CardKeys.TURBO_CATCH, upgradeKey: CardKeys | null = CardKeys.BIG_HANDS) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "turbo catch";
    }

    getIcon(): string {
        return "catch-turbo";
    }
}