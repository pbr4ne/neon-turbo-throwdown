import { TrophyKey } from "../TrophyKey";
import { TrophyType } from "../TrophyType";
import { CyanDeck } from "./CyanDeck";

export class YellowDeck extends TrophyType {
    constructor() {
        super(TrophyKey.YELLOW_DECK, "yellow deck", "Upgrade your deck to yellow colour. Vibes only.", [new CyanDeck()]);
    }
}