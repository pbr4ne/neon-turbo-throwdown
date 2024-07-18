import { CardKeys } from "../../CardKeys";
import { Block } from "./Block";

export class BetterBlock extends Block {
    protected chanceToDefend : number = 0.75;

    constructor(key: CardKeys = CardKeys.BLOCK_2, upgradeKey: CardKeys | null = CardKeys.BLOCK_3) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "better block";
    }

    getIcon(): string {
        return "block-turbo";
    }
}