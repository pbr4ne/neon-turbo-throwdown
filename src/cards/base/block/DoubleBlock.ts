import { CardKeys } from "../../CardKeys";
import { BestBlock } from "./BestBlock";

export class DoubleBlock extends BestBlock {
    protected numDefends: number = 2;

    constructor(key: CardKeys = CardKeys.BLOCK_5_DOUBLE_BLOCK, upgradeKey: CardKeys | null = null) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "double block";
    }

    getIcon(): string {
        return "block-double";
    }
}