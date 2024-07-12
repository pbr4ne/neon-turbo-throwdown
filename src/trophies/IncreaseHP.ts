import Player from "../prefabs/Player";
import { TrophyType } from "./TrophyType";

export class IncreaseHP extends TrophyType {
    constructor() {
        super("increase hp", "increase-hp");
    }
    applyChanges(player: Player) {
        //implement
    }
}