import { TrophyType } from "../trophies/TrophyType";
import { StorageManager } from "../utilities/StorageManager";
import { OutstandingTrophyList } from "../trophies/OutstandingTrophyList";
import { log } from "../utilities/GameUtils";

export class Library {

    private static numRuns = 0;
    private static trophyTypes: TrophyType[] = [
    ];

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
