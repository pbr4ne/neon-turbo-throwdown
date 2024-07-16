import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { BetsyCard } from "./BetsyCard";

export class BallRoomBlitz extends BetsyCard {

    constructor() {
        super(CardKeys.BALL_ROOM_BLITZ, null);
    }

    getName(): string {
        return "ball room blitz";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "tbd";
    }
}