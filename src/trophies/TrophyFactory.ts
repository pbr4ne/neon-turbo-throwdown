import { CardKeys } from "../cards/CardKeys";
import { BlackDeck } from "./cosmetic/BlackDeck";
import { CyanDeck } from "./cosmetic/CyanDeck";
import { RedDeck } from "./cosmetic/RedDeck";
import { WhiteDeck } from "./cosmetic/WhiteDeck";
import { YellowDeck } from "./cosmetic/YellowDeck";
import { IncreaseHP1 } from "./member/IncreaseHP1";
import { IncreaseHP2 } from "./member/IncreaseHP2";
import { HealthRegen1 } from "./member/HealthRegen1";
import { HealthRegen2 } from "./member/HealthRegen2";
import { HealthRegen3 } from "./member/HealthRegen3";
import { Resurrect1 } from "./member/Resurrect1";
import { SeeCards1 } from "./insight/SeeCards1";
import { SeeCards2 } from "./insight/SeeCards2";
import { SeeCards3 } from "./insight/SeeCards3";
import { SeeCards4 } from "./insight/SeeCards4";
import { SeeHealth1 } from "./insight/SeeHealth1";
import { SeeHealth2 } from "./insight/SeeHealth2";
import { SeeHealth3 } from "./insight/SeeHealth3";
import { SeeHealth4 } from "./insight/SeeHealth4";
import { SeeTargets1 } from "./insight/SeeTargets1";
import { SeeTargets2 } from "./insight/SeeTargets2";
import { SeeTargets3 } from "./insight/SeeTargets3";
import { SeeTargets4 } from "./insight/SeeTargets4";
import { TrophyKey } from "./TrophyKey";
import { TrophyType } from "./TrophyType";
import { UnknownTrophy } from "./UnknownTrophy";
import { IdleSpeed1 } from "./idle/IdleSpeed1";
import { IdleSpeed2 } from "./idle/IdleSpeed2";
import { IdleSpeed3 } from "./idle/IdleSpeed3";
import { IdleSpeed4 } from "./idle/IdleSpeed4";
import { Block2 } from "./card/block/Block2";
import { Block3 } from "./card/block/Block3";
import { Block4 } from "./card/block/Block4";
import { Block5 } from "./card/block/Block5";
import { Catch2 } from "./card/catch/Catch2";
import { Catch3 } from "./card/catch/Catch3";
import { Evade2 } from "./card/evade/Evade2";
import { Evade3 } from "./card/evade/Evade3";
import { Evade4 } from "./card/evade/Evade4";
import { Throw2 } from "./card/throw/Throw2";
import { Throw3 } from "./card/throw/Throw3";
import { Throw4 } from "./card/throw/Throw4";
import { Throw5 } from "./card/throw/Throw5";
import { Throw6 } from "./card/throw/Throw6";

export class TrophyFactory {
    private static trophyTypeMap: Map<TrophyKey, (cardKey?: CardKeys) => TrophyType> = new Map();
    
    public static registerTrophyType(type: TrophyKey, factoryFunction: (cardKey?: CardKeys) => TrophyType) {
        TrophyFactory.trophyTypeMap.set(type, factoryFunction);
    }

    public static createTrophyType(type: TrophyKey, cardKey?: CardKeys): TrophyType {
        const factoryFunction = TrophyFactory.trophyTypeMap.get(type);
        if (factoryFunction) {
            return factoryFunction(cardKey);
        }
        console.error(`Trophy type not found: ${type}`);
        return new UnknownTrophy();
    }

    public static registerTrophyTypes(cardKey?: CardKeys) {

        //decks
        this.registerTrophyType(TrophyKey.CYAN_DECK, () => new CyanDeck);
        this.registerTrophyType(TrophyKey.YELLOW_DECK, () => new YellowDeck);
        this.registerTrophyType(TrophyKey.WHITE_DECK, () => new WhiteDeck);
        this.registerTrophyType(TrophyKey.BLACK_DECK, () => new BlackDeck);
        this.registerTrophyType(TrophyKey.RED_DECK, () => new RedDeck);

        //cards insight
        this.registerTrophyType(TrophyKey.CARD_INSIGHT_1, () => new SeeCards1);
        this.registerTrophyType(TrophyKey.CARD_INSIGHT_2, () => new SeeCards2);
        this.registerTrophyType(TrophyKey.CARD_INSIGHT_3, () => new SeeCards3);
        this.registerTrophyType(TrophyKey.CARD_INSIGHT_4, () => new SeeCards4);

        //targets insight
        this.registerTrophyType(TrophyKey.TARGET_INSIGHT_1, () => new SeeTargets1);
        this.registerTrophyType(TrophyKey.TARGET_INSIGHT_2, () => new SeeTargets2);
        this.registerTrophyType(TrophyKey.TARGET_INSIGHT_3, () => new SeeTargets3);
        this.registerTrophyType(TrophyKey.TARGET_INSIGHT_4, () => new SeeTargets4);

        //health insight
        this.registerTrophyType(TrophyKey.HEALTH_INSIGHT_1, () => new SeeHealth1);
        this.registerTrophyType(TrophyKey.HEALTH_INSIGHT_2, () => new SeeHealth2);
        this.registerTrophyType(TrophyKey.HEALTH_INSIGHT_3, () => new SeeHealth3);
        this.registerTrophyType(TrophyKey.HEALTH_INSIGHT_4, () => new SeeHealth4);

        //increase HP
        this.registerTrophyType(TrophyKey.INCREASE_HP_1, () => new IncreaseHP1);
        this.registerTrophyType(TrophyKey.INCREASE_HP_2, () => new IncreaseHP2);
        this.registerTrophyType(TrophyKey.HEALTH_REGEN_1, () => new HealthRegen1);
        this.registerTrophyType(TrophyKey.HEALTH_REGEN_2, () => new HealthRegen2);
        this.registerTrophyType(TrophyKey.HEALTH_REGEN_3, () => new HealthRegen3);
        this.registerTrophyType(TrophyKey.RESURRECT_1, () => new Resurrect1);

        //health regen
        this.registerTrophyType(TrophyKey.HEALTH_REGEN_1, () => new HealthRegen1);
        this.registerTrophyType(TrophyKey.HEALTH_REGEN_2, () => new HealthRegen2);
        this.registerTrophyType(TrophyKey.HEALTH_REGEN_3, () => new HealthRegen3);

        //idle
        this.registerTrophyType(TrophyKey.IDLE_SPEED_1, () => new IdleSpeed1);
        this.registerTrophyType(TrophyKey.IDLE_SPEED_2, () => new IdleSpeed2);
        this.registerTrophyType(TrophyKey.IDLE_SPEED_3, () => new IdleSpeed3);
        this.registerTrophyType(TrophyKey.IDLE_SPEED_4, () => new IdleSpeed4);

        //cards
        //throw
        this.registerTrophyType(TrophyKey.THROW_2, () => new Throw2);
        this.registerTrophyType(TrophyKey.THROW_3, () => new Throw3);
        this.registerTrophyType(TrophyKey.THROW_4, () => new Throw4);
        this.registerTrophyType(TrophyKey.THROW_5, () => new Throw5);
        this.registerTrophyType(TrophyKey.THROW_6, () => new Throw6);
        //block
        this.registerTrophyType(TrophyKey.BLOCK_2, () => new Block2);
        this.registerTrophyType(TrophyKey.BLOCK_3, () => new Block3);
        this.registerTrophyType(TrophyKey.BLOCK_4, () => new Block4);
        this.registerTrophyType(TrophyKey.BLOCK_5, () => new Block5);
        //evade
        this.registerTrophyType(TrophyKey.EVADE_2, () => new Evade2);
        this.registerTrophyType(TrophyKey.EVADE_3, () => new Evade3);
        this.registerTrophyType(TrophyKey.EVADE_4, () => new Evade4);
        //catch
        this.registerTrophyType(TrophyKey.CATCH_2, () => new Catch2);
        this.registerTrophyType(TrophyKey.CATCH_3, () => new Catch3);

        //other
        this.registerTrophyType(TrophyKey.UNKNOWN, () => new UnknownTrophy);
    }

    public static getAllTrophyTypes(): TrophyType[] {
        //remove unknown and card upgrade trophy
        return Array.from(this.trophyTypeMap.keys()).map(key => this.createTrophyType(key)).filter(trophy => trophy.getKey() !== TrophyKey.UNKNOWN && trophy.getKey() !== TrophyKey.CARD_UPGRADE);
    }
}