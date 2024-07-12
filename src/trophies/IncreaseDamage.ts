import Player from "../prefabs/Player";
import { TrophyType } from "./TrophyType";

export class IncreaseDamage extends TrophyType {
    constructor() {
        super("increase damage", "increase-damage");
    }
    applyChanges(player: Player) {
        //implement
    }
}