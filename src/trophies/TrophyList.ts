import { IncreaseDamage } from "./IncreaseDamage";
import { IncreaseHP } from "./IncreaseHP";
import { IncreaseDefense } from "./IncreaseDefense";

export class TrophyList {
    public static getTrophyTypes() {
        return [ 
            new IncreaseHP(),
            new IncreaseDamage(),
            new IncreaseDefense()
        ];
    }
}