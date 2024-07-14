import { Throw } from "../cards/Throw";
import { Block } from "../cards/Block";
import { Catch } from "../cards/Catch";
import { Evade } from "../cards/Evade";
import { Coach } from "./Coach";
import { TurboThrow } from "../trophies/TurboThrow";

export class CoachList {

    public static you = new Coach("You", "you", 0);
    public static coach = new Coach("Coach", "coach", 0);
    public static spirit = new Coach("Spirit Coach", "spirit", 0);
    public static primo = new Coach("Primo Firstman", "primo", 1);
    public static sporticus = new Coach("Sporticus", "sporticus", 1);
    public static russ = new Coach("Russ Tyler", "russ", 1);
    public static boss = new Coach("The Boss", "boss", 2);
    public static steve = new Coach("Sgt. Steve", "steve", 2);
    public static betsy = new Coach("Betsy and the Nets", "betsy", 2);
    public static coree = new Coach("C.O.R.E.E.", "coree", 3);
    public static turbo = new Coach("Turbo Nerd", "turbo", 3);
    public static shadow = new Coach("Shadow Ken", "shadow", 3);
    public static boss10 = new Coach("Boss #10", "boss10", 4);

    public static setupCoachDecks() {
        this.you.setBaseCards([
            new Throw(this.you),
            new Throw(this.you),
            new Throw(this.you),
            new Throw(this.you),
            new Evade(this.you),
            new Evade(this.you),
            new Evade(this.you),
            new Block(this.you),
            new Block(this.you),
            new Catch(this.you)
        ]);
        
        this.primo.setBaseCards([
            new Throw(this.primo),
            new Throw(this.primo),
            new Throw(this.primo),
            new Throw(this.primo),
            new Evade(this.primo),
            new Evade(this.primo),
            new Evade(this.primo),
            new Block(this.primo),
            new Block(this.primo),
            new Catch(this.primo)
        ]);

        this.sporticus.setBaseCards([
            new Throw(this.sporticus),
            new Throw(this.sporticus),
            new Throw(this.sporticus),
            new Throw(this.sporticus),
            new Evade(this.sporticus),
            new Evade(this.sporticus),
            new Evade(this.sporticus),
            new Block(this.sporticus),
            new Block(this.sporticus),
            new Catch(this.sporticus)
        ]);

        this.russ.setBaseCards([
            new Throw(this.russ),
            new Throw(this.russ),
            new Throw(this.russ),
            new Throw(this.russ),
            new Evade(this.russ),
            new Evade(this.russ),
            new Evade(this.russ),
            new Block(this.russ),
            new Block(this.russ),
            new Catch(this.russ)
        ]);

        this.russ.setTrophyTypes([
            new TurboThrow()
        ]);

        this.boss.setBaseCards([
            new Throw(this.boss),
            new Throw(this.boss),
            new Throw(this.boss),
            new Throw(this.boss),
            new Evade(this.boss),
            new Evade(this.boss),
            new Evade(this.boss),
            new Block(this.boss),
            new Block(this.boss),
            new Catch(this.boss)
        ]);

        this.steve.setBaseCards([
            new Throw(this.steve),
            new Throw(this.steve),
            new Throw(this.steve),
            new Throw(this.steve),
            new Evade(this.steve),
            new Evade(this.steve),
            new Evade(this.steve),
            new Block(this.steve),
            new Block(this.steve),
            new Catch(this.steve)
        ]);

        this.betsy.setBaseCards([
            new Throw(this.betsy),
            new Throw(this.betsy),
            new Throw(this.betsy),
            new Throw(this.betsy),
            new Evade(this.betsy),
            new Evade(this.betsy),
            new Evade(this.betsy),
            new Block(this.betsy),
            new Block(this.betsy),
            new Catch(this.betsy)
        ]);

        this.coree.setBaseCards([
            new Throw(this.coree),
            new Throw(this.coree),
            new Throw(this.coree),
            new Throw(this.coree),
            new Evade(this.coree),
            new Evade(this.coree),
            new Evade(this.coree),
            new Block(this.coree),
            new Block(this.coree),
            new Catch(this.coree)
        ]);

        this.turbo.setBaseCards([
            new Throw(this.turbo),
            new Throw(this.turbo),
            new Throw(this.turbo),
            new Throw(this.turbo),
            new Evade(this.turbo),
            new Evade(this.turbo),
            new Evade(this.turbo),
            new Block(this.turbo),
            new Block(this.turbo),
            new Catch(this.turbo)
        ]);

        this.shadow.setBaseCards([
            new Throw(this.shadow),
            new Throw(this.shadow),
            new Throw(this.shadow),
            new Throw(this.shadow),
            new Evade(this.shadow),
            new Evade(this.shadow),
            new Evade(this.shadow),
            new Block(this.shadow),
            new Block(this.shadow),
            new Catch(this.shadow)
        ]);

        this.boss10.setBaseCards([
            new Throw(this.boss10),
            new Throw(this.boss10),
            new Throw(this.boss10),
            new Throw(this.boss10),
            new Evade(this.boss10),
            new Evade(this.boss10),
            new Evade(this.boss10),
            new Block(this.boss10),
            new Block(this.boss10),
            new Catch(this.boss10)
        ]);
    }
}