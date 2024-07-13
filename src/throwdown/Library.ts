import { CardType } from "../cards/CardType";
import { TrophyType } from "../trophies/TrophyType";
import { Block } from "../cards/Block";
import { Catch } from "../cards/Catch";
import { Evade } from "../cards/Evade";
import { PlayerThrow } from "../cards/PlayerThrow";
import { Throw } from "../cards/Throw";
import { StorageManager } from "../utilities/StorageManager";

export class Library {

    private static numRuns = 0;
    private static cardTypes: CardType[] = [];
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

    public static getCardTypes() {
        return this.cardTypes;
    }

    public static addCardType(cardType: CardType) {
        this.cardTypes.push(cardType);
    }

    public static getTrophyTypes() {
        return this.trophyTypes;
    }

    public static addTrophyType(trophyType: TrophyType) {
        this.trophyTypes.push(trophyType);
        StorageManager.saveTrophyTypes(this.trophyTypes);
    }

    public static setTrophyTypes(trophyTypes: TrophyType[]) {
        this.trophyTypes.push(...trophyTypes);
    }

    public static initializeLibrary() {
        this.cardTypes = [
            new PlayerThrow(),
            new PlayerThrow(),
            new PlayerThrow(),
            new PlayerThrow(),
            new Evade(),
            new Evade(),
            new Evade(),
            new Block(),
            new Block(),
            new Catch()
        ];
    }

    private static cardTypeToPlayerCardTypeMap: Map<CardType, CardType> = new Map([
        [new Throw(), new PlayerThrow()],
    ]);

    public static getPlayerCardType(cardType: CardType): CardType {
        const playerCardType = this.cardTypeToPlayerCardTypeMap.get(cardType);
        if (!playerCardType) {
            console.log(`Player card type not found for ${cardType.constructor.name}`);
            return cardType;
        }
        return playerCardType;
    }
}
