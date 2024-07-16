import { CardType } from "~/cards/CardType";
import { TrophyType } from "./TrophyType";

export class CardUpgrade extends TrophyType {
    constructor(card: CardType) {
        super("card-upgrade", "card upgrade", "Upgraded card", [], card);
    }
}