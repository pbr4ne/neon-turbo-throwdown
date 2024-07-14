import { CardType } from "../cards/CardType";
import { TrophyType } from "../trophies/TrophyType";
import { Block } from "../cards/Block";
import { Catch } from "../cards/Catch";
import { Evade } from "../cards/Evade";
import { Throw } from "../cards/Throw";
import { StorageManager } from "../utilities/StorageManager";
import { OutstandingTrophyList } from "../trophies/OutstandingTrophyList";
import { CoachList } from "./CoachList";

export class Library {

    private static numRuns = 0;
    //private static cardTypes: CardType[] = [];
    private static trophyTypes: TrophyType[] = [];

    public static getNumRuns() {
        return this.numRuns;
    }

    public static incrementNumRuns() {
        this.numRuns++;
        StorageManager.saveRunCount(this.numRuns);
    }

    public static setNumRuns(numRuns: number) {
        this.numRuns = numRuns;
    }

    // public static getCardTypes() {
    //     return this.cardTypes;
    // }

    // public static addCardType(cardType: CardType) {
    //     this.cardTypes.push(cardType);
    // }

    public static getTrophyTypes() {
        return this.trophyTypes;
    }

    public static addTrophyType(trophyType: TrophyType) {
        this.trophyTypes.push(trophyType);
        StorageManager.saveTrophyTypes(this.trophyTypes);
    }

    public static setTrophyTypes(trophyTypes: TrophyType[]) {
        this.trophyTypes.push(...trophyTypes);
        OutstandingTrophyList.removeTrophies(trophyTypes);
    }
}
