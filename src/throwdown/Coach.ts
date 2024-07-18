import { TrophyType } from "../trophies/TrophyType";
import { CardType } from "../cards/CardType";
import { CoachDialogue } from "../dialogue/CoachDialogue";
import { CoachList } from "./CoachList";
import { log } from "../utilities/GameUtils";

export class Coach {
    private name: string;
    private avatar: string;
    private difficulty: number;
    private baseCards: CardType[] = [];
    private dialogue: CoachDialogue | undefined;
    private trophyTypes: TrophyType[] = [];
    private isBoss = true;
    private winPhrase: string;
    private losePhrase: string;
    private song: string;

    constructor(name: string, avatar: string, difficulty: number, isBoss: boolean = true, winPhrase: string, losePhrase: string, song: string) {
        this.name = name;
        this.avatar = avatar;
        this.difficulty = difficulty;
        this.isBoss = isBoss;
        this.winPhrase = winPhrase;
        this.losePhrase = losePhrase;
        this.song = song;
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

    public setBaseCards(baseCards: CardType[]) {
        log(`set ${this.name} base cards: ${baseCards}`);
        this.baseCards = [...baseCards];
    }

    public getDialogue(): CoachDialogue | undefined {
        return this.dialogue;
    }

    public setDialogue(dialogue: CoachDialogue) {
        this.dialogue = dialogue;
    }

    public getTrophyTypes(): TrophyType[] {
        return this.trophyTypes;
    }

    public setTrophyTypes(trophyTypes: TrophyType[]) {
        this.trophyTypes = trophyTypes;
    }

    public hasTrophy(trophyClass: new () => TrophyType): boolean {
        return this.trophyTypes.some(trophy => trophy instanceof trophyClass);
    }

    public getIsBoss(): boolean {
        return this.isBoss;
    }

    public getWinPhrase(): string {
        return this.winPhrase;
    }

    public getLosePhrase(): string {
        return this.losePhrase;
    }

    public getSong(): string {
        return this.song;
    }
    
    public getNextCoach(): Coach {
        switch (this.avatar) {
            case "primo":
                return CoachList.sporticus;
            case "sporticus":
                return CoachList.tycoon;
            case "tycoon":
                return CoachList.office;
            case "office":
                return CoachList.sgtsteve;
            case "sgtsteve":
                return CoachList.betsy;
            case "betsy":
                return CoachList.coree;
            case "coree":
                return CoachList.turbonerd;
            case "turbonerd":
                return CoachList.shadowken;
            case "shadowken":
                return CoachList.boss10;
            case "boss10":
                return CoachList.you;
            default:
                return CoachList.you;
        }
    }

    public toString(): string {
        return `Coach: ${this.name}`;
    }

    public getRandomCardOfType<T extends CardType>(cardClass: new () => T): T {
        const cardsOfType = this.baseCards.filter(card => card instanceof cardClass) as T[];
        if (cardsOfType.length === 0) {
            return new cardClass();
        }
        const randomIndex = Phaser.Math.Between(0, cardsOfType.length - 1);
        return cardsOfType[randomIndex];
    }
}