import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { TycoonCard } from "./TycoonCard";

export class MoustacheWax extends TycoonCard {

    constructor() {
        super(CardKeys.MOUSTACHE_WAX, null);
    }

    getName(): string {
        return "moustache wax";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "tbd";
    }
}