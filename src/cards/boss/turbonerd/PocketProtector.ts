import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { TurbonerdCard } from "./TurbonerdCard";

export class PocketProtector extends TurbonerdCard {

    constructor() {
        super(CardKeys.POCKET_PROTECTOR, null);
    }

    getName(): string {
        return "pocket protector";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "tbd";
    }
}