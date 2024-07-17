import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { YellowDeck } from "./YellowDeck";

export class WhiteDeck extends TrophyType {
    constructor() {
        super(TrophyKey.WHITE_DECK, "white deck", "Upgrade your deck to white colour. Vibes only.", [new YellowDeck()]);
    }
}