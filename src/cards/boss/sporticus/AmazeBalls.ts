import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { SporticusCard } from "./SporticusCard";

export class AmazeBalls extends SporticusCard {

    constructor() {
        super(CardKeys.AMAZEBALLS, null);
    }

    getName(): string {
        return "amaze-balls";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "tbd";
    }
}