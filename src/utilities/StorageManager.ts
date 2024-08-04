import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Library } from '../throwdown/Library';
import { TrophyType } from '../trophies/TrophyType';
import { CoachDialogue } from '../dialogue/CoachDialogue';
import { log } from "../utilities/GameUtils";
import { CardType } from '../cards/CardType';
import { CoachList } from '../throwdown/CoachList';
import { CardFactory } from '../cards/CardFactory';
import { CardKeys } from '../cards/CardKeys';
import { TrophyFactory } from '../trophies/TrophyFactory';
import { TrophyKey } from '../trophies/TrophyKey';


interface GameDB extends DBSchema {
    trophies: {
        key: string;
        value: { key: TrophyKey, cardKey?: CardKeys };
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
    },
    baseDeck: {
        key: number;
        value: { id?: number; key: CardKeys };
        indexes: { 'key': string };
    },
}

export class StorageManager {
    private static dbName: string = 'neon-turbo-throwdown';
    private static dbVersion: number = 2; // Increment version number
    private static db: IDBPDatabase<GameDB> | null = null;

    public static async initializeDB() {
        if (!this.db) {
            this.db = await openDB<GameDB>(this.dbName, this.dbVersion, {
                upgrade(db, oldVersion, newVersion, transaction) {
                    if (oldVersion < 1) {
                        db.createObjectStore('trophies', { keyPath: 'key' });
                        db.createObjectStore('runs', { keyPath: 'key' });
                        db.createObjectStore('dialogues', { keyPath: 'key' });
                        const baseDeckStore = db.createObjectStore('baseDeck', { keyPath: 'id', autoIncrement: true });
                        baseDeckStore.createIndex('key', 'key');
                    }
                },
            });
        }
    }

    public static async saveTrophyTypes(trophyTypes: TrophyType[]) {
        if (this.db) {
            // Clear the 'trophies' table before adding new entries
            const txClear = this.db.transaction('trophies', 'readwrite');
            await txClear.objectStore('trophies').clear();
            await txClear.done;

            const tx = this.db.transaction('trophies', 'readwrite');
            for (const trophyType of trophyTypes) {
                log(`saving trophy type to db ${trophyType.getKey()}`);
                const key = trophyType.getKey();
                let cardKey: CardKeys | undefined;

                await tx.store.add({ key, cardKey });
            }
            await tx.done;
        }
    }

    public static async loadTrophyTypes(): Promise<TrophyType[]> {
        if (this.db) {
            const trophyRecords = await this.db.getAll('trophies');
            const trophyTypes = trophyRecords.map(record => {
                const trophy = TrophyFactory.createTrophyType(record.key, record.cardKey);
                return trophy;
            });
            log(`loaded trophy types from db ${trophyTypes}`);
            Library.setTrophyTypes(trophyTypes);
            return trophyTypes;
        }
        return [];
    }

    public static async saveRunCount(runCount: number) {
        if (this.db) {
            log(`saving run count to db: ${runCount}`);
            await this.db.put('runs', { key: 'runCount', count: runCount });
        }
    }

    public static async loadRunCount(): Promise<number> {
        if (this.db) {
            const runData = await this.db.get('runs', 'runCount');
            log(`loaded run count from db: ${runData}`);
            const runCount = runData ? runData.count : 0;
            Library.setNumRuns(runCount);
            return runCount;
        }
        return 0;
    }

    public static async saveDialogue(coachKey: string, coachDialogue: CoachDialogue) {
        if (this.db) {
            log(`"saving dialogue to db: ${coachKey}`);
            await this.db.put('dialogues', {
                key: coachKey,
                currentIntroDialogue: coachDialogue.getCurrentIntroDialogue(),
                currentWinDialogue: coachDialogue.getCurrentWinDialogue(),
                currentLoseDialogue: coachDialogue.getCurrentLoseDialogue()
            });
        }
    }

    public static async loadDialogue(coachKey: string): Promise<{ currentIntroDialogue: number, currentWinDialogue: number, currentLoseDialogue: number } | null> {
        if (this.db) {
            const dialogueData = await this.db.get('dialogues', coachKey);
            if (dialogueData) {
                log(`loaded coach dialogue from db: ${dialogueData}`);
                return {
                    currentIntroDialogue: dialogueData.currentIntroDialogue,
                    currentWinDialogue: dialogueData.currentWinDialogue,
                    currentLoseDialogue: dialogueData.currentLoseDialogue
                };
            }
        }
        return null;
    }

    public static async saveBaseDeck(cardTypes: CardType[]) {
        if (this.db) {
            const tx = this.db.transaction('baseDeck', 'readwrite');
            await tx.objectStore('baseDeck').clear();
            await tx.done;
    
            const txAdd = this.db.transaction('baseDeck', 'readwrite');
            for (const cardType of cardTypes) {
                log(`saving card type to db: ${cardType.getName()}`);
                await txAdd.objectStore('baseDeck').add({ key: cardType.key });
            }
            await txAdd.done;
        }
    }

    public static async loadPureDeck(): Promise<CardType[]> {
        if (this.db) {
            const cardRecords = await this.db.getAll('baseDeck');
            const cardTypes = cardRecords.map(cardStored => CardFactory.createCardType(cardStored.key));
            log(`loaded card types from db: ${cardTypes}`);
            if (cardTypes.length > 0) {
                log(`overriding pure deck from save`);
                Library.setPureDeck(cardTypes);
            }
            return cardTypes;
        }
        return [];
    }

    public static async clearAllData() {
        if (this.db) {
            const tx = this.db.transaction(['trophies', 'runs', 'dialogues', 'baseDeck'], 'readwrite');
            await Promise.all([
                tx.objectStore('trophies').clear(),
                tx.objectStore('runs').clear(),
                tx.objectStore('dialogues').clear(),
                tx.objectStore('baseDeck').clear()
            ]);
            await tx.done;
        }
    }
}
