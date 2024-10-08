import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { TycoonCard } from "./TycoonCard";

export class UnionBusting extends TycoonCard {

    constructor() {
        super(CardKeys.UNION_BUSTING, null);
    }

    getName(): string {
        return "union busting";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "tbd";
    }
}