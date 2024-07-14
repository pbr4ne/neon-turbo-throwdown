import { TrophyType } from "../TrophyType";
import { WhiteDeck } from "./WhiteDeck";

export class BlackDeck extends TrophyType {
    constructor() {
        super("black-deck", "black deck", "Upgrade your deck to black colour. Vibes only.", [new WhiteDeck()]);
    }
}