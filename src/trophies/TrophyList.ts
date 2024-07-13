import { TurboThrow } from "./TurboThrow";
import { IncreaseHP } from "./IncreaseHP";
import { IncreaseDefense } from "./IncreaseDefense";
import { TrophyType } from "./TrophyType";

export class TrophyList {

    private static trophyTypes: TrophyType[] = [
        new TurboThrow()
    ];

    public static getTrophyTypes() {
        return this.trophyTypes;
    }

    public static removeTrophy(trophy: TrophyType): void {
        const index = TrophyList.getTrophyTypes().indexOf(trophy);
        if (index > -1) {
            TrophyList.getTrophyTypes().splice(index, 1);
        }
    }
}