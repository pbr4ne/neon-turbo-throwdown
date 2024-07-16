import { Coach } from "./Coach";
import { log } from "../utilities/GameUtils";
import { CardFactory } from "../cards/CardFactory";
import { CardKeys } from "../cards/CardKeys";
import { CoachKeys } from "./CoachKeys";
import { IncreaseHP1 } from "../trophies/member/IncreaseHP1";
import { IncreaseHP2 } from "../trophies/member/IncreaseHP2";
import { IncreaseHP3 } from "../trophies/member/IncreaseHP3";
import { IncreaseHP4 } from "../trophies/member/IncreaseHP4";
import { IncreaseHP5 } from "../trophies/member/IncreaseHP5";
import { IncreaseHP6 } from "../trophies/member/IncreaseHP6";

export class CoachList {

    public static you = new Coach("You", CoachKeys.YOU, 0, false, "", "", "");
    public static coach = new Coach("Coach", CoachKeys.COACH, 0, false, "", "", "");
    public static spirit = new Coach("Spirit Coach", CoachKeys.SPIRIT , 0, false, "", "", "");
    public static primo = new Coach("Primo Firstman", CoachKeys.PRIMO, 0, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static sporticus = new Coach("Sporticus", CoachKeys.SPORTICUS, 1, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static tycoon = new Coach("Throwdown Tycoon", CoachKeys.TYCOON, 1, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static office = new Coach("Office Boss", CoachKeys.OFFICE, 2, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static sgtsteve = new Coach("Sgt. Steve", CoachKeys.SGT_STEVE, 2, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static betsy = new Coach("Betsy and the Nets", CoachKeys.BETSY, 2, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static coree = new Coach("C.O.R.E.E.", CoachKeys.COREE, 3, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static turbonerd = new Coach("Turbo Nerd", CoachKeys.TURBO_NERD, 3, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static shadowken = new Coach("Shadow Ken", CoachKeys.SHADOW_KEN, 3, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static boss10 = new Coach("Boss #10", CoachKeys.BOSS_10, 4, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");

    public static setupCoachDecks() {
        log("SETTING UP COACH TROPHIES");

        this.primo.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new IncreaseHP3(),
        ]);

        this.sporticus.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new IncreaseHP3(),
        ]);

        this.tycoon.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new IncreaseHP3(),
        ]);

        this.office.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new IncreaseHP3(),
        ]);

        this.sgtsteve.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new IncreaseHP3(),
        ]);

        this.betsy.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new IncreaseHP3(),
        ]);

        this.coree.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new IncreaseHP3(),
            new IncreaseHP4(),
            new IncreaseHP5(),
            new IncreaseHP6(),
        ]);

        this.turbonerd.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new IncreaseHP3(),
            new IncreaseHP4(),
            new IncreaseHP5(),
            new IncreaseHP6(),
        ]);

        this.shadowken.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new IncreaseHP3(),
            new IncreaseHP4(),
            new IncreaseHP5(),
            new IncreaseHP6(),
        ]);

        this.boss10.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new IncreaseHP3(),
            new IncreaseHP4(),
            new IncreaseHP5(),
            new IncreaseHP6(),
        ]);

        log("SETTING UP COACH DECKS");
        this.you.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.EVADE_1_EVADE),
            CardFactory.createCardType(CardKeys.EVADE_1_EVADE),
            CardFactory.createCardType(CardKeys.BLOCK_1_BLOCK),
            CardFactory.createCardType(CardKeys.BLOCK_1_BLOCK),
            CardFactory.createCardType(CardKeys.CATCH_1_CATCH)
        ]);
        
        this.primo.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.EVADE_1_EVADE),
            CardFactory.createCardType(CardKeys.EVADE_1_EVADE),
            CardFactory.createCardType(CardKeys.BLOCK_1_BLOCK),
            CardFactory.createCardType(CardKeys.BLOCK_1_BLOCK),
            CardFactory.createCardType(CardKeys.CATCH_1_CATCH)
        ]);

        this.sporticus.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_2_TURBO_THROW),
            CardFactory.createCardType(CardKeys.EVADE_1_EVADE),
            CardFactory.createCardType(CardKeys.EVADE_2_DOUBLE_EVADE),
            CardFactory.createCardType(CardKeys.BLOCK_1_BLOCK),
            CardFactory.createCardType(CardKeys.BLOCK_2_BETTER_BLOCK),
            CardFactory.createCardType(CardKeys.CATCH_1_CATCH),
            CardFactory.createCardType(CardKeys.BIGG_BALLS),
            CardFactory.createCardType(CardKeys.BIGG_BALLS),
        ]);

        this.tycoon.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_2_TURBO_THROW),
            CardFactory.createCardType(CardKeys.THROW_2_TURBO_THROW),
            CardFactory.createCardType(CardKeys.BLOCK_3_TURBO_BLOCK),
            CardFactory.createCardType(CardKeys.BLOCK_3_TURBO_BLOCK),
            CardFactory.createCardType(CardKeys.EVADE_3_TURBO_EVADE),
            CardFactory.createCardType(CardKeys.EVADE_3_TURBO_EVADE),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.CATCH_1_CATCH),
            CardFactory.createCardType(CardKeys.SUPPLY_AND_DEMAND),
            CardFactory.createCardType(CardKeys.SUPPLY_AND_DEMAND),
        ]);

        this.office.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_1_THROW),
            CardFactory.createCardType(CardKeys.THROW_2_TURBO_THROW),
            CardFactory.createCardType(CardKeys.THROW_2_TURBO_THROW),
            CardFactory.createCardType(CardKeys.THROW_3_RICOCHET),
            CardFactory.createCardType(CardKeys.THROW_3_RICOCHET),
            CardFactory.createCardType(CardKeys.BLOCK_2_BETTER_BLOCK),
            CardFactory.createCardType(CardKeys.BLOCK_2_BETTER_BLOCK),
            CardFactory.createCardType(CardKeys.BLOCK_5_DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.EVADE_3_TURBO_EVADE),
            CardFactory.createCardType(CardKeys.CATCH_2_TURBO_CATCH),
            CardFactory.createCardType(CardKeys.WATERFALL),
            CardFactory.createCardType(CardKeys.WATERFALL),
        ]);

        this.sgtsteve.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_4_ULTRA_TURBO_THROW),
            CardFactory.createCardType(CardKeys.BLOCK_4_BEST_BLOCK),
            CardFactory.createCardType(CardKeys.EVADE_4_TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.THROW_2_TURBO_THROW),
            CardFactory.createCardType(CardKeys.THROW_2_TURBO_THROW),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.BLOCK_2_BETTER_BLOCK),
            CardFactory.createCardType(CardKeys.EVADE_3_TURBO_EVADE),
            CardFactory.createCardType(CardKeys.CATCH_2_TURBO_CATCH),
            CardFactory.createCardType(CardKeys.SOLDIER_ON),
            CardFactory.createCardType(CardKeys.SOLDIER_ON),
        ]);

        this.betsy.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_5_RI_RICOCHET),
            CardFactory.createCardType(CardKeys.THROW_5_RI_RICOCHET),
            CardFactory.createCardType(CardKeys.THROW_4_ULTRA_TURBO_THROW),
            CardFactory.createCardType(CardKeys.BLOCK_5_DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.EVADE_2_DOUBLE_EVADE),
            CardFactory.createCardType(CardKeys.CATCH_3_BIG_HANDS),
            CardFactory.createCardType(CardKeys.THROW_3_RICOCHET),
            CardFactory.createCardType(CardKeys.THROW_3_RICOCHET),
            CardFactory.createCardType(CardKeys.EVADE_3_TURBO_EVADE),
            CardFactory.createCardType(CardKeys.EVADE_3_TURBO_EVADE),
            CardFactory.createCardType(CardKeys.DEAD_OR_ALIVE),
            CardFactory.createCardType(CardKeys.DEAD_OR_ALIVE),
        ]);

        this.coree.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_4_ULTRA_TURBO_THROW),
            CardFactory.createCardType(CardKeys.BLOCK_3_TURBO_BLOCK),
            CardFactory.createCardType(CardKeys.EVADE_4_TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.THROW_3_RICOCHET),
            CardFactory.createCardType(CardKeys.THROW_3_RICOCHET),
            CardFactory.createCardType(CardKeys.BLOCK_2_BETTER_BLOCK),
            CardFactory.createCardType(CardKeys.EVADE_2_DOUBLE_EVADE),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.CATCH_2_TURBO_CATCH),
            CardFactory.createCardType(CardKeys.F7),
            CardFactory.createCardType(CardKeys.F7),
        ]);

        this.turbonerd.setBaseCards([
            CardFactory.createCardType(CardKeys.BLOCK_4_BEST_BLOCK),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.BLOCK_4_BEST_BLOCK),
            CardFactory.createCardType(CardKeys.EVADE_4_TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.EVADE_4_TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.THROW_5_RI_RICOCHET),
            CardFactory.createCardType(CardKeys.CATCH_3_BIG_HANDS),
        ]);

        this.shadowken.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.BLOCK_5_DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.THROW_5_RI_RICOCHET),
            CardFactory.createCardType(CardKeys.BLOCK_5_DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.BLOCK_4_BEST_BLOCK),
            CardFactory.createCardType(CardKeys.EVADE_4_TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.EVADE_3_TURBO_EVADE),
            CardFactory.createCardType(CardKeys.THROW_5_RI_RICOCHET),
            CardFactory.createCardType(CardKeys.CATCH_3_BIG_HANDS),
        ]);

        this.boss10.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.THROW_6_SNIPER_THROW),
            CardFactory.createCardType(CardKeys.EVADE_4_TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.EVADE_4_TRIPLE_EVADE),
            CardFactory.createCardType(CardKeys.BLOCK_5_DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.BLOCK_5_DOUBLE_BLOCK),
            CardFactory.createCardType(CardKeys.CATCH_3_BIG_HANDS),
        ]);
    }

    public static getCoachByName(name: string): Coach {
        if (name === CoachKeys.PRIMO) {
            return CoachList.primo;
        }
        if (name === CoachKeys.SPORTICUS) {
            return CoachList.sporticus;
        }
        if (name === CoachKeys.TYCOON) {
            return CoachList.tycoon;
        }
        if (name === CoachKeys.OFFICE) {
            return CoachList.office;
        }
        if (name === CoachKeys.SGT_STEVE) {
            return CoachList.sgtsteve;
        }
        if (name === CoachKeys.BETSY) {
            return CoachList.betsy;
        }
        if (name === CoachKeys.COREE) {
            return CoachList.coree;
        }
        if (name === CoachKeys.TURBO_NERD) {
            return CoachList.turbonerd;
        }
        if (name === CoachKeys.SHADOW_KEN) {
            return CoachList.shadowken;
        }
        if (name === CoachKeys.BOSS_10) {
            return CoachList.boss10;
        }

        return CoachList.you;
    }
}