import { CardKeys } from "../../CardKeys";
import { BetterBlock } from "./BetterBlock";

export class TurboBlock extends BetterBlock {
    protected chanceToRebound: number = 1;

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