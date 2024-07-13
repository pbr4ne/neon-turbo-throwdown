import { TurboThrow } from "./TurboThrow";
import { IncreaseHP } from "./IncreaseHP";
import { IncreaseDefense } from "./IncreaseDefense";
import { TrophyType } from "./TrophyType";
import { Library } from "../throwdown/Library";
import { UltraTurboThrow } from "./UltraTurboThrow";

export class OutstandingTrophyList {

    private static trophyTypes: TrophyType[] = [
        new TurboThrow(),
        new UltraTurboThrow(),
    ];

    public static getTrophyTypes() {
        return this.trophyTypes;
    }

    public static getEligibleTrophyTypes() {
        //only return trophy types that have prerequisites that have been met
        return this.trophyTypes.filter(trophy => {
            return trophy.getPrerequisites().every(prerequisite => {
                return Library.getTrophyTypes().some(t => t.equals(prerequisite));
            });
        });
    }

    public static removeTrophy(trophy: TrophyType): void {
        const index = OutstandingTrophyList.getTrophyTypes().indexOf(trophy);
        if (index > -1) {
            OutstandingTrophyList.getTrophyTypes().splice(index, 1);
        }
    }

    public static removeTrophies(trophyTypes: TrophyType[]): void {
        trophyTypes.forEach(trophy => {
            OutstandingTrophyList.removeTrophy(trophy);
        });
    }
}