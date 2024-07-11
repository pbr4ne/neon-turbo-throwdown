export class Coach {
    private name: string;
    private avatar: string;
    private difficulty: number;

    constructor(name: string, avatar: string, difficulty: number) {
        this.name = name;
        this.avatar = avatar;
        this.difficulty = difficulty;
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

    //static list of coaches
    public static COACHES: Coach[] = [
        new Coach("You", "you", 0),
        new Coach("Coach", "coach", 0),
        new Coach("Spirit Coach", "spirit", 0),
        new Coach("Primo Firstman", "primo", 1),
        new Coach("Sporticus", "sporticus", 1),
        new Coach("Russ Tyler", "russ", 1),
        new Coach("The Boss", "boss", 2),
        new Coach("Sgt. Steve", "steve", 2),
        new Coach("Betsy and the Nets", "betsy", 2),
        new Coach("C.O.R.E.E.", "coree", 3),
        new Coach("Turbo Nerd", "turbo", 3),
        new Coach("Shadow Ken", "shadow", 3),
        new Coach("Boss #10", "boss10", 4),
    ];

    public static you = Coach.getCoach("you");
    public static coach = Coach.getCoach("coach");
    public static spirit = Coach.getCoach("spirit");
    public static primo = Coach.getCoach("primo");
    public static sporticus = Coach.getCoach("sporticus");
    public static russ = Coach.getCoach("russ");
    public static boss = Coach.getCoach("boss");
    public static steve = Coach.getCoach("steve");
    public static betsy = Coach.getCoach("betsy");
    public static coree = Coach.getCoach("coree");
    public static turbo = Coach.getCoach("turbo");
    public static shadow = Coach.getCoach("shadow");
    public static boss10 = Coach.getCoach("boss10");

    public static getCoach(avatar: string): Coach {
        return Coach.COACHES.find(coach => coach.getAvatar() === avatar)!;
    }
}