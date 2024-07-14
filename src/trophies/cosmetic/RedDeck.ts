import { TrophyType } from "../TrophyType";
import { BlackDeck } from "./BlackDeck";

export class RedDeck extends TrophyType {
    constructor() {
        super("red-deck", "red deck", "Upgrade your deck to red colour. Vibes only.", [new BlackDeck()]);
    }
}