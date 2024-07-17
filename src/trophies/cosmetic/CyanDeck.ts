import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";

export class CyanDeck extends TrophyType {
    constructor() {
        super(TrophyKey.CYAN_DECK, "cyan deck", "Upgrade your deck to cyan colour. Vibes only.");
    }
}