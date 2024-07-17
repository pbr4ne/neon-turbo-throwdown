import { TrophyType } from "./TrophyType";
import { CardKeys } from "~/cards/CardKeys";
import { TrophyKey } from "./TrophyKey";

export class CardUpgrade extends TrophyType {
    constructor(cardKey: CardKeys) {
        super(TrophyKey.CARD_UPGRADE, "card upgrade", "Upgraded card", [], cardKey);
    }
}