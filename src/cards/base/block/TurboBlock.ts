import { CardKeys } from "../../CardKeys";
import { BetterBlock } from "./BetterBlock";

export class TurboBlock extends BetterBlock {
    protected chanceToDefend : number = 0.90;

    constructor(key: CardKeys = CardKeys.BLOCK_3, upgradeKey: CardKeys | null = CardKeys.BLOCK_4) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "turbo block";
    }

    getIcon(): string {
        return "block-turbo-ultra";
    }
}