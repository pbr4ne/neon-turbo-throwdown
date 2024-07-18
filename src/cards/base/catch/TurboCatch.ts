import { CardKeys } from "../../CardKeys";
import { Catch } from "./Catch";

export class TurboCatch extends Catch {
    protected reboundTargets : number = 2;

    constructor(key: CardKeys = CardKeys.CATCH_2, upgradeKey: CardKeys | null = CardKeys.CATCH_3) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "turbo catch";
    }

    getIcon(): string {
        return "catch-turbo";
    }
}