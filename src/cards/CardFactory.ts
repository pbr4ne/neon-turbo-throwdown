import { BestBlock } from "./base/block/BestBlock";
import { BetterBlock } from "./base/block/BetterBlock";
import { Block } from "./base/block/Block";
import { DoubleBlock } from "./base/block/DoubleBlock";
import { TurboBlock } from "./base/block/TurboBlock";
import { BigHands } from "./base/catch/BigHands";
import { Catch } from "./base/catch/Catch";
import { TurboCatch } from "./base/catch/TurboCatch";
import { DoubleEvade } from "./base/evade/DoubleEvade";
import { Evade } from "./base/evade/Evade";
import { TripleEvade } from "./base/evade/TripleEvade";
import { TurboEvade } from "./base/evade/TurboEvade";
import { Ricochet } from "./base/throw/Ricochet";
import { RiRicochet } from "./base/throw/RiRicochet";
import { SniperThrow } from "./base/throw/SniperThrow";
import { Throw } from "./base/throw/Throw";
import { TurboThrow } from "./base/throw/TurboThrow";
import { UltraTurboThrow } from "./base/throw/UltraTurboThrow";
import { BiggBalls } from "./boss/sporticus/BiggBalls";
import { CardKeys } from "./CardKeys";
import { CardType } from "./CardType";
import { UnknownCard } from "./UnknownCard";

export class CardFactory {
    private static cardTypeMap: Map<CardKeys, new () => CardType> = new Map();

    public static registerCardType(type: CardKeys, constructor: new () => CardType) {
        CardFactory.cardTypeMap.set(type, constructor);
    }

    public static createCardType(type: CardKeys): CardType {
        const constructor = CardFactory.cardTypeMap.get(type);
        if (constructor) {
            return new constructor();
        }
        console.error(`Card type not found: ${type}`);
        return new UnknownCard();
    }

    public static registerCardTypes() {
        //base cards

        //throw
        this.registerCardType(CardKeys.THROW, Throw);
        this.registerCardType(CardKeys.TURBO_THROW, TurboThrow);
        this.registerCardType(CardKeys.RICOCHET, Ricochet);
        this.registerCardType(CardKeys.ULTRA_TURBO_THROW, UltraTurboThrow);
        this.registerCardType(CardKeys.RI_RICOCHET, RiRicochet);
        this.registerCardType(CardKeys.SNIPER_THROW, SniperThrow);
        
        //block
        this.registerCardType(CardKeys.BLOCK, Block);
        this.registerCardType(CardKeys.BETTER_BLOCK, BetterBlock);
        this.registerCardType(CardKeys.TURBO_BLOCK, TurboBlock);
        this.registerCardType(CardKeys.BEST_BLOCK, BestBlock);
        this.registerCardType(CardKeys.DOUBLE_BLOCK, DoubleBlock);

        //evade
        this.registerCardType(CardKeys.EVADE, Evade);
        this.registerCardType(CardKeys.DOUBLE_EVADE, DoubleEvade);
        this.registerCardType(CardKeys.TURBO_EVADE, TurboEvade);
        this.registerCardType(CardKeys.TRIPLE_EVADE, TripleEvade);
        
        //catch
        this.registerCardType(CardKeys.CATCH, Catch);
        this.registerCardType(CardKeys.TURBO_CATCH, TurboCatch);
        this.registerCardType(CardKeys.BIG_HANDS, BigHands);

        //sporticus
        this.registerCardType(CardKeys.BIGG_BALLS, BiggBalls);

        //unknown
        this.registerCardType(CardKeys.UNKNOWN, UnknownCard);
    }
}
