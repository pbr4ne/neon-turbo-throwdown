import { BestBlock } from "./base/block/BestBlock";
import { BetterBlock } from "./base/block/BetterBlock";
import { Block } from "./base/block/Block";
import { DoubleBlock } from "./base/block/DoubleBlock";
import { TurboBlock } from "./base/block/TurboBlock";
import { BigHands } from "./base/catch/BigHands";
import { Catch } from "./base/catch/Catch";
import { TurboCatch } from "./base/catch/TurboCatch";
import { Evade } from "./base/evade/Evade";
import { Ricochet } from "./base/throw/Ricochet";
import { RiRicochet } from "./base/throw/RiRicochet";
import { SniperThrow } from "./base/throw/SniperThrow";
import { Throw } from "./base/throw/Throw";
import { TurboThrow } from "./base/throw/TurboThrow";
import { UltraTurboThrow } from "./base/throw/UltraTurboThrow";
import { CardType } from "./CardType";
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
        //base cards

        //throw
        this.registerCardType("throw", Throw);
        this.registerCardType("turbo-throw", TurboThrow);
        this.registerCardType("ricochet", Ricochet);
        this.registerCardType("ultra-turbo-throw", UltraTurboThrow);
        this.registerCardType("ri-ricochet", RiRicochet);
        this.registerCardType("sniper-throw", SniperThrow);
        
        //block
        this.registerCardType("block", Block);
        this.registerCardType("better-block", BetterBlock);
        this.registerCardType("turbo-block", TurboBlock);
        this.registerCardType("best-block", BestBlock);
        this.registerCardType("double-block", DoubleBlock);

        //evade
        this.registerCardType("evade", Evade);
        
        //catch
        this.registerCardType("catch", Catch);
        this.registerCardType("turbo-catch", TurboCatch);
        this.registerCardType("big-hands", BigHands);
    }
}
