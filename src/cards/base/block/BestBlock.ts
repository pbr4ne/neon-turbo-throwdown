import { CardKeys } from "../../CardKeys";
import { TurboBlock } from "./TurboBlock";

export class BestBlock extends TurboBlock {
    protected chanceToDefend : number = 1;

    constructor(key: CardKeys = CardKeys.BLOCK_4, upgradeKey: CardKeys | null = CardKeys.BLOCK_5) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "best block";
    }

    getIcon(): string {
        return "block-turbo-ultra";
    }
}