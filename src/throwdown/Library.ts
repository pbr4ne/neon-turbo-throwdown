import { TrophyType } from "../trophies/TrophyType";
import { StorageManager } from "../utilities/StorageManager";
import { OutstandingTrophyList } from "../trophies/OutstandingTrophyList";
import { log } from "../utilities/GameUtils";
import { CardType } from "../cards/CardType";
import { IdleSpeed1 } from "../trophies/idle/IdleSpeed1";
import { IdleSpeed2 } from "../trophies/idle/IdleSpeed2";
import { IdleSpeed3 } from "../trophies/idle/IdleSpeed3";
import { IdleSpeed4 } from "../trophies/idle/IdleSpeed4";

export class Library {

    private static numRuns = 0;
    private static trophyTypes: TrophyType[] = [];
    private static pureDeck: CardType[] = [];
    private static easyMode: boolean = false;
    private static idleMode: boolean = false;

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

    public static getTrophyTypes() {
        return this.trophyTypes;
    }

    public static getPureDeck(): CardType[] {
        log(`get ${this.name} pure deck: ${this.pureDeck}`);
        return this.pureDeck;
    }

    public static setPureDeck(pureDeck: CardType[]) {
        log(`set ${this.name} pure deck: ${pureDeck}`);
        this.pureDeck = [...pureDeck];
    }

    public static setEasyMode(easyMode: boolean) {
        this.easyMode = easyMode;
    }

    public static getEasyMode() {
        return this.easyMode;
    }

    public static setIdleMode(idleMode: boolean) {
        this.idleMode = idleMode;
    }

    public static getIdleMode() {
        return this.idleMode;
    }

    public static addTrophyType(trophyType: TrophyType) {
        log("Adding trophy type to player: " + trophyType.getName());
        this.trophyTypes.push(trophyType);
        StorageManager.saveTrophyTypes(this.trophyTypes);
    }

    public static setTrophyTypes(trophyTypes: TrophyType[]) {
        this.trophyTypes.push(...trophyTypes);
        OutstandingTrophyList.removeTrophies(trophyTypes);
    }

    public static hasTrophy(trophyClass: new () => TrophyType): boolean {
        return this.trophyTypes.some(trophy => trophy instanceof trophyClass);
    }

    public static getIdleClickDelay(): number{
        let delay;
        if (Library.hasTrophy(IdleSpeed4)) {
            delay = 100;
        } else if (Library.hasTrophy(IdleSpeed3)) {
            delay = 500;
        } else if (Library.hasTrophy(IdleSpeed2)) {
            delay = 1000;
        } else if (Library.hasTrophy(IdleSpeed1)) {
            delay = 2500;
        } else {
            delay = 5000;
        }
        return delay;
    }

    public static getIdleTurnDelay(): number{
        let delay;
        if (Library.hasTrophy(IdleSpeed4)) {
            delay = 100;
        } else if (Library.hasTrophy(IdleSpeed3)) {
            delay = 200;
        } else if (Library.hasTrophy(IdleSpeed2)) {
            delay = 300;
        } else if (Library.hasTrophy(IdleSpeed1)) {
            delay = 400;
        } else {
            delay = 500;
        }
        return delay;
    }
}
