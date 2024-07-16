import { CardKeys } from "../../CardKeys";
import { BetterBlock } from "./BetterBlock";

export class TurboBlock extends BetterBlock {
    protected chanceToDefend : number = 0.90;

    constructor(key: CardKeys = CardKeys.TURBO_BLOCK, upgradeKey: CardKeys | null = CardKeys.BEST_BLOCK) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "turbo block";
    }

    getIcon(): string {
        return "block-turbo-ultra";
    }
}