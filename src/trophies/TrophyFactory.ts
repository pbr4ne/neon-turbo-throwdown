import { CardKeys } from "~/cards/CardKeys";
import { CardUpgrade } from "./CardUpgrade";
import { BlackDeck } from "./cosmetic/BlackDeck";
import { CyanDeck } from "./cosmetic/CyanDeck";
import { RedDeck } from "./cosmetic/RedDeck";
import { WhiteDeck } from "./cosmetic/WhiteDeck";
import { YellowDeck } from "./cosmetic/YellowDeck";
import { IncreaseHP1 } from "./member/IncreaseHP1";
import { IncreaseHP2 } from "./member/IncreaseHP2";
import { IncreaseHP3 } from "./member/IncreaseHP3";
import { IncreaseHP4 } from "./member/IncreaseHP4";
import { IncreaseHP5 } from "./member/IncreaseHP5";
import { IncreaseHP6 } from "./member/IncreaseHP6";
import { SeeCards1 } from "./member/SeeCards1";
import { SeeCards2 } from "./member/SeeCards2";
import { SeeCards3 } from "./member/SeeCards3";
import { SeeCards4 } from "./member/SeeCards4";
import { SeeHealth1 } from "./member/SeeHealth1";
import { SeeHealth2 } from "./member/SeeHealth2";
import { SeeHealth3 } from "./member/SeeHealth3";
import { SeeHealth4 } from "./member/SeeHealth4";
import { SeeTargets1 } from "./member/SeeTargets1";
import { SeeTargets2 } from "./member/SeeTargets2";
import { SeeTargets3 } from "./member/SeeTargets3";
import { SeeTargets4 } from "./member/SeeTargets4";
import { TrophyKey } from "./TrophyKey";
import { TrophyType } from "./TrophyType";
import { UnknownTrophy } from "./UnknownTrophy";

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
        this.registerTrophyType(TrophyKey.INCREASE_HP_3, () => new IncreaseHP3);
        this.registerTrophyType(TrophyKey.INCREASE_HP_4, () => new IncreaseHP4);
        this.registerTrophyType(TrophyKey.INCREASE_HP_5, () => new IncreaseHP5);
        this.registerTrophyType(TrophyKey.INCREASE_HP_6, () => new IncreaseHP6);

        //other
        this.registerTrophyType(TrophyKey.CARD_UPGRADE, (cardKey?: CardKeys) => new CardUpgrade(cardKey!));
        this.registerTrophyType(TrophyKey.UNKNOWN, () => new UnknownTrophy);

    }
}