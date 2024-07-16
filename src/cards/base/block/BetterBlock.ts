import { CardKeys } from "../../CardKeys";
import { Block } from "./Block";

export class BetterBlock extends Block {
    protected chanceToDefend : number = 0.75;

    constructor(key: CardKeys = CardKeys.BLOCK_2_BETTER_BLOCK, upgradeKey: CardKeys | null = CardKeys.BLOCK_3_TURBO_BLOCK) {
        super(key, upgradeKey);
    }

    getName(): string {
        return "better block";
    }

    getIcon(): string {
        return "block-turbo";
    }
}