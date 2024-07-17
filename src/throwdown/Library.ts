import { TrophyType } from "../trophies/TrophyType";
import { StorageManager } from "../utilities/StorageManager";
import { OutstandingTrophyList } from "../trophies/OutstandingTrophyList";
import { log } from "../utilities/GameUtils";
import { CardType } from "../cards/CardType";

export class Library {

    private static numRuns = 0;
    private static trophyTypes: TrophyType[] = [
    ];
    private static pureDeck: CardType[] = [];
    private static easyMode: boolean = false;
    private static soundOn: boolean = true;
    private static musicOn: boolean = true;
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

    public static setSoundOn(soundOn: boolean) {
        this.soundOn = soundOn;
    }

    public static getSoundOn() {
        return this.soundOn;
    }

    public static setMusicOn(musicOn: boolean) {
        this.musicOn = musicOn;
    }

    public static getMusicOn() {
        return this.musicOn;
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
}
