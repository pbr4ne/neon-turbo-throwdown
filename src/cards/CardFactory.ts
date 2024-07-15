import { Block } from "./Block";
import { CardType } from "./CardType";
import { Catch } from "./Catch";
import { Evade } from "./Evade";
import { Throw } from "./Throw";
import { TurboThrow } from "./TurboThrow";
import { UnknownCard } from "./UnknownCard";

export class CardFactory {
    private static cardTypeMap: Map<string, new () => CardType> = new Map();

    public static registerCardType(typeName: string, constructor: new () => CardType) {
        CardFactory.cardTypeMap.set(typeName, constructor);
    }

    public static createCardType(typeName: string): CardType {
        const constructor = CardFactory.cardTypeMap.get(typeName);
        if (constructor) {
            return new constructor();
        }
        console.error(`Card type not found: ${typeName}`);
        return new UnknownCard();
    }

    public static registerCardTypes() {
        this.registerCardType("throw", Throw);
        this.registerCardType("turbo-throw", TurboThrow);
        this.registerCardType("evade", Evade);
        this.registerCardType("block", Block);
        this.registerCardType("catch", Catch);
    }
}