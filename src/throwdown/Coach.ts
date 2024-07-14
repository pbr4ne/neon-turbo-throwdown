import { TrophyType } from "../trophies/TrophyType";
import { CardType } from "../cards/CardType";
import { CoachDialogue } from "../dialogue/CoachDialogue";
import { CoachList } from "./CoachList";

export class Coach {
    private name: string;
    private avatar: string;
    private difficulty: number;
    private baseCards: CardType[] = [];
    private dialogue: CoachDialogue | undefined;
    private trophyTypes: TrophyType[] = [];
    private isBoss = true;

    constructor(name: string, avatar: string, difficulty: number, isBoss: boolean = true) {
        this.name = name;
        this.avatar = avatar;
        this.difficulty = difficulty;
        this.isBoss = isBoss;
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
        this.baseCards = baseCards;
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

    public getIsBoss(): boolean {
        return this.isBoss;
    }
    
    public getNextCoach(): Coach {
        switch (this.avatar) {
            case "primo":
                return CoachList.sporticus;
            case "sporticus":
                return CoachList.russ;
            case "russ":
                return CoachList.boss;
            case "boss":
                return CoachList.steve;
            case "steve":
                return CoachList.betsy;
            case "betsy":
                return CoachList.coree;
            case "coree":
                return CoachList.turbo;
            case "turbo":
                return CoachList.shadow;
            case "shadow":
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
}