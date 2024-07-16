import { Coach } from "./Coach";
import { log } from "../utilities/GameUtils";
import { CardFactory } from "../cards/CardFactory";
import { CardKeys } from "../cards/CardKeys";
import { IncreaseHP } from "../trophies/member/IncreaseHP";

export class CoachList {

    public static you = new Coach("You", "you", 0, false, "", "", "");
    public static coach = new Coach("Coach", "coach", 0, false, "", "", "");
    public static spirit = new Coach("Spirit Coach", "spirit", 0, false, "", "", "");
    public static primo = new Coach("Primo Firstman", "primo", 1, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static sporticus = new Coach("Sporticus", "sporticus", 1, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static tycoon = new Coach("Throwdown Tycoon", "tycoon", 1, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static office = new Coach("Office Boss", "office", 2, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static sgtsteve = new Coach("Sgt. Steve", "sgtsteve", 2, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static betsy = new Coach("Betsy and the Nets", "betsy", 2, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static coree = new Coach("C.O.R.E.E.", "coree", 3, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static turbonerd = new Coach("Turbo Nerd", "turbonerd", 3, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static shadowken = new Coach("Shadow Ken", "shadowken", 3, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static boss10 = new Coach("Boss #10", "boss10", 4, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");

    public static setupCoachDecks() {
        log("SETTING UP COACH DECKS");
        this.you.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.EVADE),
            CardFactory.createCardType(CardKeys.EVADE),
            CardFactory.createCardType(CardKeys.BLOCK),
            CardFactory.createCardType(CardKeys.BLOCK),
            CardFactory.createCardType(CardKeys.CATCH)
        ]);
        
        this.primo.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.EVADE),
            CardFactory.createCardType(CardKeys.EVADE),
            CardFactory.createCardType(CardKeys.BLOCK),
            CardFactory.createCardType(CardKeys.BLOCK),
            CardFactory.createCardType(CardKeys.CATCH)
        ]);

        this.primo.setTrophyTypes([
            new IncreaseHP(),
        ]);

        this.sporticus.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.TURBO_THROW),
            CardFactory.createCardType(CardKeys.EVADE),
            CardFactory.createCardType(CardKeys.DOUBLE_EVADE),
            CardFactory.createCardType(CardKeys.BLOCK),
            CardFactory.createCardType(CardKeys.BETTER_BLOCK),
            CardFactory.createCardType(CardKeys.CATCH),
            CardFactory.createCardType(CardKeys.BIGG_BALLS),
            CardFactory.createCardType(CardKeys.BIGG_BALLS),
        ]);

        this.sporticus.setTrophyTypes([
            new IncreaseHP(),
        ]);

        this.tycoon.setBaseCards([
            CardFactory.createCardType(CardKeys.TURBO_THROW),
            CardFactory.createCardType(CardKeys.TURBO_THROW),
            CardFactory.createCardType(CardKeys.TURBO_BLOCK),
            CardFactory.createCardType(CardKeys.TURBO_BLOCK),
            CardFactory.createCardType(CardKeys.TURBO_EVADE),
            CardFactory.createCardType(CardKeys.TURBO_EVADE),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.CATCH),
            CardFactory.createCardType(CardKeys.SUPPLY_AND_DEMAND),
            CardFactory.createCardType(CardKeys.SUPPLY_AND_DEMAND),
        ]);

        this.tycoon.setTrophyTypes([
            new IncreaseHP(),
        ]);

        this.office.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW),
            CardFactory.createCardType(CardKeys.TURBO_THROW),
            CardFactory.createCardType(CardKeys.TURBO_THROW),
            CardFactory.createCardType(CardKeys.RICOCHET),
            CardFactory.createCardType(CardKeys.RICOCHET),
            CardFactory.createCardType(CardKeys.BETTER_BLOCK),
            CardFactory.createCardType(CardKeys.BETTER_BLOCK),
            CardFactory.createCardType(CardKeys.DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.TURBO_EVADE),
            CardFactory.createCardType(CardKeys.TURBO_CATCH),
            CardFactory.createCardType(CardKeys.WATERFALL),
            CardFactory.createCardType(CardKeys.WATERFALL),
        ]);

        this.office.setTrophyTypes([
            new IncreaseHP(),
        ]);

        this.sgtsteve.setBaseCards([
            CardFactory.createCardType(CardKeys.ULTRA_TURBO_THROW),
            CardFactory.createCardType(CardKeys.BEST_BLOCK),
            CardFactory.createCardType(CardKeys.TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.TURBO_THROW),
            CardFactory.createCardType(CardKeys.TURBO_THROW),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.BETTER_BLOCK),
            CardFactory.createCardType(CardKeys.TURBO_EVADE),
            CardFactory.createCardType(CardKeys.TURBO_CATCH),
            CardFactory.createCardType(CardKeys.SOLDIER_ON),
            CardFactory.createCardType(CardKeys.SOLDIER_ON),
        ]);

        this.sgtsteve.setTrophyTypes([
            new IncreaseHP(),
        ]);

        this.betsy.setBaseCards([
            CardFactory.createCardType(CardKeys.RI_RICOCHET),
            CardFactory.createCardType(CardKeys.RI_RICOCHET),
            CardFactory.createCardType(CardKeys.ULTRA_TURBO_THROW),
            CardFactory.createCardType(CardKeys.DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.DOUBLE_EVADE),
            CardFactory.createCardType(CardKeys.BIG_HANDS),
            CardFactory.createCardType(CardKeys.RICOCHET),
            CardFactory.createCardType(CardKeys.RICOCHET),
            CardFactory.createCardType(CardKeys.TURBO_EVADE),
            CardFactory.createCardType(CardKeys.TURBO_EVADE),
            CardFactory.createCardType(CardKeys.DEAD_OR_ALIVE),
            CardFactory.createCardType(CardKeys.DEAD_OR_ALIVE),
        ]);

        this.betsy.setTrophyTypes([
            new IncreaseHP(),
        ]);

        this.coree.setBaseCards([
            CardFactory.createCardType(CardKeys.ULTRA_TURBO_THROW),
            CardFactory.createCardType(CardKeys.TURBO_BLOCK),
            CardFactory.createCardType(CardKeys.TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.RICOCHET),
            CardFactory.createCardType(CardKeys.RICOCHET),
            CardFactory.createCardType(CardKeys.BETTER_BLOCK),
            CardFactory.createCardType(CardKeys.DOUBLE_EVADE),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.TURBO_CATCH),
        ]);

        this.coree.setTrophyTypes([
            new IncreaseHP(),
        ]);

        this.turbonerd.setBaseCards([
            CardFactory.createCardType(CardKeys.BEST_BLOCK),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.BEST_BLOCK),
            CardFactory.createCardType(CardKeys.TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.RI_RICOCHET),
            CardFactory.createCardType(CardKeys.BIG_HANDS),
        ]);

        this.turbonerd.setTrophyTypes([
            new IncreaseHP(),
        ]);

        this.shadowken.setBaseCards([
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.RI_RICOCHET),
            CardFactory.createCardType(CardKeys.DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.BEST_BLOCK),
            CardFactory.createCardType(CardKeys.TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.TURBO_EVADE),
            CardFactory.createCardType(CardKeys.RI_RICOCHET),
            CardFactory.createCardType(CardKeys.BIG_HANDS),
        ]);

        this.shadowken.setTrophyTypes([
            new IncreaseHP(),
        ]);

        this.boss10.setBaseCards([
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.SNIPER_THROW),
            CardFactory.createCardType(CardKeys.TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.BIG_HANDS),
        ]);

        this.boss10.setTrophyTypes([
            new IncreaseHP(),
        ]);
    }

    public static getCoachByName(name: string): Coach {
        if (name === "primo") {
            return CoachList.primo;
        }
        if (name === "sporticus") {
            return CoachList.sporticus;
        }
        if (name === "tycoon") {
            return CoachList.tycoon;
        }
        if (name === "office") {
            return CoachList.office;
        }
        if (name === "sgtsteve") {
            return CoachList.sgtsteve;
        }
        if (name === "betsy") {
            return CoachList.betsy;
        }
        if (name === "coree") {
            return CoachList.coree;
        }
        if (name === "turbonerd") {
            return CoachList.turbonerd;
        }
        if (name === "shadowken") {
            return CoachList.shadowken;
        }
        if (name === "boss10") {
            return CoachList.boss10;
        }

        return CoachList.you;
    }
}