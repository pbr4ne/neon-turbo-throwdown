import Player from "../prefabs/Player";
import { TrophyType } from "./TrophyType";

export class IncreaseDefense extends TrophyType {
    constructor() {
        super("increase defense", "increase-defense");
    }
    applyChanges(player: Player) {
        //implement
    }
}