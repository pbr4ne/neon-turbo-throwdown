import { CardType } from "../cards/CardType";
import { Block } from "../cards/Block";
import { Catch } from "../cards/Catch";
import { Evade } from "../cards/Evade";
import { Throw } from "../cards/Throw";

export class Library {

    private static cardTypes: CardType[];

    public static getCardTypes() {
        return this.cardTypes;
    }

    public static addCardType(cardType: CardType) {
        this.cardTypes.push(cardType);
    }

    public static initializeLibrary() {
        this.cardTypes = [
            new Throw(),
            new Throw(),
            new Throw(),
            new Throw(),
            new Evade(),
            new Evade(),
            new Evade(),
            new Block(),
            new Block(),
            new Catch()
        ];
    }
}