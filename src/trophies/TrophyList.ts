import { TurboThrow } from "./TurboThrow";
import { IncreaseHP } from "./IncreaseHP";
import { IncreaseDefense } from "./IncreaseDefense";

export class TrophyList {
    public static getTrophyTypes() {
        return [ 
            new IncreaseHP(),
            new TurboThrow(),
            new IncreaseDefense()
        ];
    }
}