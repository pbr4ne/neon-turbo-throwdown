import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Library } from '../throwdown/Library';
import { TrophyType } from '../trophies/TrophyType';
import { TurboThrow } from '../trophies/TurboThrow';
import { UnknownTrophy } from '../trophies/UnknownTrophy';
import { CoachDialogue } from '../dialogue/CoachDialogue';

interface GameDB extends DBSchema {
    trophies: {
        key: string;
        value: { key: string };
    },
    runs: {
        key: string;
        value: { key: string, count: number };
    },
    dialogues: {
        key: string;
        value: {
            key: string;
            currentIntroDialogue: number;
            currentWinDialogue: number;
            currentLoseDialogue: number;
        };
    };
}

export class StorageManager {
    private static dbName: string = 'neon-turbo-throwdown';
    private static dbVersion: number = 6;
    private static db: IDBPDatabase<GameDB> | null = null;

    public static async initializeDB() {
        if (!this.db) {
            this.db = await openDB<GameDB>(this.dbName, this.dbVersion, {
                upgrade(db) {
                    db.createObjectStore('trophies', { keyPath: 'key' });
                    db.createObjectStore('runs', { keyPath: 'key' });
                    db.createObjectStore('dialogues', { keyPath: 'key' });
                },
            });
        }
    }

    public static async saveTrophyTypes(trophyTypes: TrophyType[]) {
        //await this.initializeDB();
        if (this.db) {
            for (const trophyType of trophyTypes) {
                console.log("saving trophy type to db", trophyType.getKey());
                await this.db.put('trophies', { key: trophyType.getKey() });
            }
        }
    }

    public static async loadTrophyTypes(): Promise<TrophyType[]> {
        //await this.initializeDB();
        if (this.db) {
            const trophyNames = await this.db.getAll('trophies');
            const trophyType = trophyNames.map(trophyStored => StorageManager.createTrophyType( trophyStored.key ));
            console.log("loaded trophy types from db", trophyType);
            Library.setTrophyTypes(trophyType);
            return trophyType;
        }
        return [];
    }

    
    public static createTrophyType(key: string): TrophyType {
        console.log("creating trophy type " + key);
        switch (key) {
            case 'turbo-throw':
                return new TurboThrow();
            default:
                console.log(`Unknown trophy type: ${key}`);
                return new UnknownTrophy();
        }
    }

    public static async saveRunCount(runCount: number) {
        //await this.initializeDB();
        if (this.db) {
            console.log("saving run count to db", runCount);
            await this.db.put('runs', { key: 'runCount', count: runCount });
        }
    }

    public static async loadRunCount(): Promise<number> {
        //await this.initializeDB();
        if (this.db) {
            const runData = await this.db.get('runs', 'runCount');
            console.log("loaded run count from db", runData);
            const runCount = runData ? runData.count : 0;
            Library.setNumRuns(runCount);
            return runCount;
        }
        return 0;
    }

    public static async saveDialogue(coachKey: string, coachDialogue: CoachDialogue) {
        //await this.initializeDB();
        if (this.db) {
            console.log("saving dialogue to db", coachKey);
            await this.db.put('dialogues', {
                key: coachKey,
                currentIntroDialogue: coachDialogue.getCurrentIntroDialogue(),
                currentWinDialogue: coachDialogue.getCurrentWinDialogue(),
                currentLoseDialogue: coachDialogue.getCurrentLoseDialogue()
            });
        }
    }

    public static async loadDialogue(coachKey: string): Promise<{ currentIntroDialogue: number, currentWinDialogue: number, currentLoseDialogue: number } | null> {
        //await this.initializeDB();
        if (this.db) {
            const dialogueData = await this.db.get('dialogues', coachKey);
            if (dialogueData) {
                console.log("loaded coach dialogue from db", dialogueData);
                return {
                    currentIntroDialogue: dialogueData.currentIntroDialogue,
                    currentWinDialogue: dialogueData.currentWinDialogue,
                    currentLoseDialogue: dialogueData.currentLoseDialogue
                };
            }
        }
        return null;
    }
}