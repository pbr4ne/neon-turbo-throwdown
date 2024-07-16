import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { OfficeCard } from "./OfficeCard";

export class TPSReport extends OfficeCard {

    constructor() {
        super(CardKeys.TPS_REPORT, null);
    }

    getName(): string {
        return "TPS Report";
    }

    getIcon(): string {
        return "unknown";
    }

    getDescription(): string {
        return "tbd";
    }
}