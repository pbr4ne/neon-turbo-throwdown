import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { WhiteDeck } from "./WhiteDeck";

export class BlackDeck extends TrophyType {
    constructor() {
        super(TrophyKey.BLACK_DECK, "black deck", "Upgrade your deck to black colour. Vibes only.", [new WhiteDeck()]);
    }
}