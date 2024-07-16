import { CardKeys } from "../../CardKeys";
import { TurboBlock } from "./TurboBlock";

export class BestBlock extends TurboBlock {
    protected chanceToDefend : number = 1;

    constructor(key: CardKeys = CardKeys.BEST_BLOCK, upgradeKey: CardKeys | null = CardKeys.DOUBLE_BLOCK) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "best block";
    }

    getIcon(): string {
        return "block-turbo-ultra";
    }
}