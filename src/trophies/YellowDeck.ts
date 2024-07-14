import { TrophyType } from "./TrophyType";
import { CyanDeck } from "./CyanDeck";

export class YellowDeck extends TrophyType {
    constructor() {
        super("yellow-deck", "yellow deck", "Upgrade your deck to yellow colour. Vibes only.", [new CyanDeck()]);
    }
}