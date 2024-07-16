import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { BetsyCard } from "./BetsyCard";

export class DontStopMeNow extends BetsyCard {

    constructor() {
        super(CardKeys.DONT_STOP_ME_NOW, null);
    }

    getName(): string {
        return "don't stop me now";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "tbd";
    }
}