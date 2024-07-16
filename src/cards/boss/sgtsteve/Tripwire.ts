import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { SgtSteveCard } from "./StgSteveCard";

export class Tripwire extends SgtSteveCard {

    constructor() {
        super(CardKeys.TRIPWIRE, null);
    }

    getName(): string {
        return "tripwire";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "tbd";
    }
}