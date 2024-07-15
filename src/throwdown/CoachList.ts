import { Throw } from "../cards/Throw";
import { Block } from "../cards/Block";
import { Catch } from "../cards/Catch";
import { Evade } from "../cards/Evade";
import { Coach } from "./Coach";
import { TurboThrow } from "../trophies/card/TurboThrow";

export class CoachList {

    public static you = new Coach("You", "you", 0, false, "", "", "");
    public static coach = new Coach("Coach", "coach", 0, false, "", "", "");
    public static spirit = new Coach("Spirit Coach", "spirit", 0, false, "", "", "");
    public static primo = new Coach("Primo Firstman", "primo", 1, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static sporticus = new Coach("Sporticus", "sporticus", 1, true, "WOOP!", "AWWW!", "neon-turbo-throwdown");
    public static russ = new Coach("Russ Tyler", "russ", 1, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static boss = new Coach("The Boss", "boss", 2, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static steve = new Coach("Sgt. Steve", "steve", 2, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown");
    public static betsy = new Coach("Betsy and the Nets", "betsy", 2, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static coree = new Coach("C.O.R.E.E.", "coree", 3, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static turbo = new Coach("Turbo Nerd", "turbo", 3, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static shadow = new Coach("Shadow Ken", "shadow", 3, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");
    public static boss10 = new Coach("Boss #10", "boss10", 4, true, "VICTORY!", "FAILURE!", "neon-turbo-throwdown-hard");

    public static setupCoachDecks() {
        this.you.setBaseCards([
            new Throw(),
            new Throw(),
            new Throw(),
            new Throw(),
            new Throw(),
            new Evade(),
            new Evade(),
            new Block(),
            new Block(),
            new Catch()
        ]);
        
        this.primo.setBaseCards([
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
        ]);

        this.sporticus.setBaseCards([
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
        ]);

        this.russ.setBaseCards([
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
        ]);

        this.russ.setTrophyTypes([
            new TurboThrow()
        ]);

        this.boss.setBaseCards([
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
        ]);

        this.steve.setBaseCards([
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
        ]);

        this.betsy.setBaseCards([
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
        ]);

        this.coree.setBaseCards([
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
        ]);

        this.turbo.setBaseCards([
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
        ]);

        this.shadow.setBaseCards([
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
        ]);

        this.boss10.setBaseCards([
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
        ]);
    }

    public static getCoachByName(name: string): Coach {
        if (name === "primo") {
            return CoachList.primo;
        }
        if (name === "sporticus") {
            return CoachList.sporticus;
        }
        if (name === "russ") {
            return CoachList.russ;
        }
        if (name === "boss") {
            return CoachList.boss;
        }
        if (name === "steve") {
            return CoachList.steve;
        }
        if (name === "betsy") {
            return CoachList.betsy;
        }
        if (name === "coree") {
            return CoachList.coree;
        }
        if (name === "turbo") {
            return CoachList.turbo;
        }
        if (name === "shadow") {
            return CoachList.shadow;
        }
        if (name === "boss10") {
            return CoachList.boss10;
        }

        return CoachList.you;
    }
}