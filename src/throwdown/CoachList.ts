import { Coach } from "./Coach";
import { log } from "../utilities/GameUtils";
import { CardFactory } from "../cards/CardFactory";
import { CardKeys } from "../cards/CardKeys";
import { CoachKeys } from "./CoachKeys";
import { IncreaseHP1 } from "../trophies/member/IncreaseHP1";
import { IncreaseHP2 } from "../trophies/member/IncreaseHP2";
import { HealthRegen1 } from "../trophies/member/HealthRegen1";
import { HealthRegen2 } from "../trophies/member/HealthRegen2";
import { HealthRegen3 } from "../trophies/member/HealthRegen3";
import { Resurrect1 } from "../trophies/member/Resurrect1";

export class CoachList {

    public static you = new Coach("You", CoachKeys.YOU, 0, false, "", "", "neon-turbo-throwdown");
    public static coach = new Coach("Coach", CoachKeys.COACH, 0, false, "", "", "neon-turbo-throwdown");
    public static spirit = new Coach("Spirit Coach", CoachKeys.SPIRIT , 0, false, "", "", "neon-turbo-throwdown");
    public static primo = new Coach("Primo Firstman", CoachKeys.PRIMO, 0, true, "VICTORY!", "LOSE!", "neon-turbo-throwdown");
    public static sporticus = new Coach("Sporticus", CoachKeys.SPORTICUS, 1, true, "VICTORY!", "SACKED!", "neon-turbo-throwdown");
    public static tycoon = new Coach("Throwdown Tycoon", CoachKeys.TYCOON, 1, true, "VICTORY!", "BANKRUPT!", "neon-turbo-throwdown");
    public static office = new Coach("Office Boss", CoachKeys.OFFICE, 2, true, "VICTORY!", "DOWNSIZED!", "neon-turbo-throwdown");
    public static sgtsteve = new Coach("Sgt. Steve", CoachKeys.SGT_STEVE, 2, true, "VICTORY!", "SNIPED!", "neon-turbo-throwdown");
    public static betsy = new Coach("Betsy and the Nets", CoachKeys.BETSY, 2, true, "VICTORY!", "THUNDERSTRUCK!", "neon-turbo-throwdown");
    public static coree = new Coach("C.O.R.E.E.", CoachKeys.COREE, 3, true, "VICTORY!", "01101100 01101111 01101100", "neon-turbo-throwdown-hard");
    public static turbonerd = new Coach("Turbo Nerd", CoachKeys.TURBO_NERD, 3, true, "VICTORY!", "OUTSMARTED!", "neon-turbo-throwdown-hard");
    public static shadowken = new Coach("Shadow Ken", CoachKeys.SHADOW_KEN, 3, true, "VICTORY!", "SUBLIME!", "neon-turbo-throwdown-hard");
    public static boss10 = new Coach("Boss #10", CoachKeys.BOSS_10, 4, true, "VICTORY!", "JAMMED!", "neon-turbo-throwdown-hard");

    public static setupCoachDecks() {
        log("SETTING UP COACH TROPHIES");

        this.primo.setTrophyTypes([
        ]);

        this.sporticus.setTrophyTypes([
            new IncreaseHP1(),
        ]);

        this.tycoon.setTrophyTypes([
            new IncreaseHP1(),
        ]);

        this.office.setTrophyTypes([
            new IncreaseHP1(),
        ]);

        this.sgtsteve.setTrophyTypes([
            new IncreaseHP1(),
        ]);

        this.betsy.setTrophyTypes([
            new IncreaseHP1(),
        ]);

        this.coree.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
        ]);

        this.turbonerd.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
        ]);

        this.shadowken.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
        ]);

        this.boss10.setTrophyTypes([
            new IncreaseHP1(),
            new IncreaseHP2(),
            new HealthRegen1(),
            new HealthRegen2(),
            new HealthRegen3(),
            new Resurrect1(),
        ]);

        log("SETTING UP COACH DECKS");      
        this.primo.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.EVADE_1),
            CardFactory.createCardType(CardKeys.EVADE_1),
            CardFactory.createCardType(CardKeys.BLOCK_1),
            CardFactory.createCardType(CardKeys.BLOCK_1),
            CardFactory.createCardType(CardKeys.CATCH_1),
        ]);

        this.sporticus.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_2),
            CardFactory.createCardType(CardKeys.EVADE_1),
            CardFactory.createCardType(CardKeys.EVADE_2),
            CardFactory.createCardType(CardKeys.BLOCK_1),
            CardFactory.createCardType(CardKeys.BLOCK_2),
            CardFactory.createCardType(CardKeys.CATCH_1),
            CardFactory.createCardType(CardKeys.BIGG_BALLS),
            CardFactory.createCardType(CardKeys.BIGG_BALLS),
            CardFactory.createCardType(CardKeys.BLUE_BALLS),
            CardFactory.createCardType(CardKeys.BLUE_BALLS),
        ]);

        this.tycoon.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_2),
            CardFactory.createCardType(CardKeys.THROW_2),
            CardFactory.createCardType(CardKeys.BLOCK_3),
            CardFactory.createCardType(CardKeys.BLOCK_3),
            CardFactory.createCardType(CardKeys.EVADE_3),
            CardFactory.createCardType(CardKeys.EVADE_3),
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.CATCH_1),
            CardFactory.createCardType(CardKeys.SUPPLY_AND_DEMAND),
            CardFactory.createCardType(CardKeys.SUPPLY_AND_DEMAND),
            CardFactory.createCardType(CardKeys.MONOCLE),
            CardFactory.createCardType(CardKeys.MONOCLE),
        ]);

        this.office.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_1),
            CardFactory.createCardType(CardKeys.THROW_2),
            CardFactory.createCardType(CardKeys.THROW_2),
            CardFactory.createCardType(CardKeys.THROW_3),
            CardFactory.createCardType(CardKeys.THROW_3),
            CardFactory.createCardType(CardKeys.BLOCK_2),
            CardFactory.createCardType(CardKeys.BLOCK_2),
            CardFactory.createCardType(CardKeys.BLOCK_5),
            CardFactory.createCardType(CardKeys.EVADE_3),
            CardFactory.createCardType(CardKeys.CATCH_2),
            CardFactory.createCardType(CardKeys.WATERFALL),
            CardFactory.createCardType(CardKeys.WATERFALL),
            CardFactory.createCardType(CardKeys.LEVEL_SET),
            CardFactory.createCardType(CardKeys.LEVEL_SET),
            CardFactory.createCardType(CardKeys.CIRCLE_BACK),
            CardFactory.createCardType(CardKeys.CIRCLE_BACK),
        ]);

        this.sgtsteve.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_2),
            CardFactory.createCardType(CardKeys.THROW_3),
            CardFactory.createCardType(CardKeys.THROW_4),
            CardFactory.createCardType(CardKeys.THROW_5),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.BLOCK_4),
            CardFactory.createCardType(CardKeys.EVADE_4),
            CardFactory.createCardType(CardKeys.BLOCK_2),
            CardFactory.createCardType(CardKeys.EVADE_3),
            CardFactory.createCardType(CardKeys.CATCH_2),
            CardFactory.createCardType(CardKeys.SOLDIER_ON),
            CardFactory.createCardType(CardKeys.SOLDIER_ON),
            CardFactory.createCardType(CardKeys.DROP_AND_GIVE_ME_20),
            CardFactory.createCardType(CardKeys.DROP_AND_GIVE_ME_20),
        ]);

        this.betsy.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_3),
            CardFactory.createCardType(CardKeys.THROW_3),
            CardFactory.createCardType(CardKeys.THROW_4),
            CardFactory.createCardType(CardKeys.THROW_5),
            CardFactory.createCardType(CardKeys.THROW_5),
            CardFactory.createCardType(CardKeys.BLOCK_5),
            CardFactory.createCardType(CardKeys.EVADE_2),
            CardFactory.createCardType(CardKeys.CATCH_3),
            CardFactory.createCardType(CardKeys.EVADE_3),
            CardFactory.createCardType(CardKeys.EVADE_3),
            CardFactory.createCardType(CardKeys.DEAD_OR_ALIVE),
            CardFactory.createCardType(CardKeys.DEAD_OR_ALIVE),
            CardFactory.createCardType(CardKeys.AINT_GONNA_TAKE_IT),
            CardFactory.createCardType(CardKeys.AINT_GONNA_TAKE_IT),
            CardFactory.createCardType(CardKeys.BLOCK_OF_AGES),
            CardFactory.createCardType(CardKeys.BLOCK_OF_AGES),
        ]);

        this.coree.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_4),
            CardFactory.createCardType(CardKeys.THROW_4),
            CardFactory.createCardType(CardKeys.THROW_5),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.BLOCK_3),
            CardFactory.createCardType(CardKeys.EVADE_4),
            CardFactory.createCardType(CardKeys.BLOCK_2),
            CardFactory.createCardType(CardKeys.EVADE_2),
            CardFactory.createCardType(CardKeys.CATCH_2),
            CardFactory.createCardType(CardKeys.F7),
            CardFactory.createCardType(CardKeys.F7),
            CardFactory.createCardType(CardKeys.DELETE),
            CardFactory.createCardType(CardKeys.DELETE),
            CardFactory.createCardType(CardKeys.ALT),
            CardFactory.createCardType(CardKeys.ALT),
        ]);

        this.turbonerd.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_5),
            CardFactory.createCardType(CardKeys.THROW_5),
            CardFactory.createCardType(CardKeys.THROW_5),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.BLOCK_4),
            CardFactory.createCardType(CardKeys.BLOCK_4),
            CardFactory.createCardType(CardKeys.EVADE_4),
            CardFactory.createCardType(CardKeys.EVADE_4),
            CardFactory.createCardType(CardKeys.CATCH_3),
            CardFactory.createCardType(CardKeys.DID_I_DO_THAT),
            CardFactory.createCardType(CardKeys.DID_I_DO_THAT),
            CardFactory.createCardType(CardKeys.POCKET_PROTECTOR),
            CardFactory.createCardType(CardKeys.POCKET_PROTECTOR),
        ]);

        this.shadowken.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_5),
            CardFactory.createCardType(CardKeys.THROW_5),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.BLOCK_5),
            CardFactory.createCardType(CardKeys.BLOCK_5),
            CardFactory.createCardType(CardKeys.BLOCK_4),
            CardFactory.createCardType(CardKeys.EVADE_4),
            CardFactory.createCardType(CardKeys.EVADE_3),
            CardFactory.createCardType(CardKeys.CATCH_3),
            CardFactory.createCardType(CardKeys.SMOKE_BOMB),
            CardFactory.createCardType(CardKeys.SMOKE_BOMB),
            CardFactory.createCardType(CardKeys.NINJA_STAR),
            CardFactory.createCardType(CardKeys.NINJA_STAR),
        ]);

        this.boss10.setBaseCards([
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.THROW_6),
            CardFactory.createCardType(CardKeys.EVADE_4),
            CardFactory.createCardType(CardKeys.EVADE_4),
            CardFactory.createCardType(CardKeys.BLOCK_5),
            CardFactory.createCardType(CardKeys.BLOCK_5),
            CardFactory.createCardType(CardKeys.CATCH_3),
            CardFactory.createCardType(CardKeys.BEHIND_THE_CURTAIN),
            CardFactory.createCardType(CardKeys.BEHIND_THE_CURTAIN),
            CardFactory.createCardType(CardKeys.METAGAMING),
            CardFactory.createCardType(CardKeys.METAGAMING),
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