import { Throw } from "../cards/Throw";
import { CardType } from "../cards/CardType";
import { Block } from "../cards/Block";
import { Catch } from "../cards/Catch";
import { Evade } from "../cards/Evade";

export class Coach {
    private name: string;
    private avatar: string;
    private difficulty: number;
    private baseCards: CardType[];

    constructor(name: string, avatar: string, difficulty: number, baseCards: CardType[]) {
        this.name = name;
        this.avatar = avatar;
        this.difficulty = difficulty;
        this.baseCards = baseCards;
    }

    public getName(): string {
        return this.name;
    }

    public getAvatar(): string {
        return this.avatar;
    }

    public getDifficulty(): number {
        return this.difficulty;
    }

    public getBaseCards(): CardType[] {
        return this.baseCards;
    }

    public getNextCoach(): Coach {
        switch (this.avatar) {
            case "primo":
                return Coach.sporticus;
            case "sporticus":
                return Coach.russ;
            case "russ":
                return Coach.boss;
            case "boss":
                return Coach.steve;
            case "steve":
                return Coach.betsy;
            case "betsy":
                return Coach.coree;
            case "coree":
                return Coach.turbo;
            case "turbo":
                return Coach.shadow;
            case "shadow":
                return Coach.boss10;
            case "boss10":
                return Coach.you;
            default:
                return Coach.you;
        }
    }

    public static you = new Coach("You", "you", 0, []);
    public static coach = new Coach("Coach", "coach", 0, []);
    public static spirit = new Coach("Spirit Coach", "spirit", 0, []);
    public static primo = new Coach("Primo Firstman", "primo", 1, [
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
    public static sporticus = new Coach("Sporticus", "sporticus", 1, [
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
    public static russ = new Coach("Russ Tyler", "russ", 1, [
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
    public static boss = new Coach("The Boss", "boss", 2, [
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
    public static steve = new Coach("Sgt. Steve", "steve", 2, [
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
    public static betsy = new Coach("Betsy and the Nets", "betsy", 2, [
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
    public static coree = new Coach("C.O.R.E.E.", "coree", 3, [
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
    public static turbo = new Coach("Turbo Nerd", "turbo", 3, [
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
    public static shadow = new Coach("Shadow Ken", "shadow", 3, [
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
    public static boss10 = new Coach("Boss #10", "boss10", 4, [
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