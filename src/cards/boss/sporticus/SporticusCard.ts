import { CardType } from "../../CardType";
import { CoachList } from "../../../throwdown/CoachList";
import { Coach } from "~/throwdown/Coach";

export abstract class SporticusCard extends CardType {

    getCoach(): Coach | null {
        return CoachList.sporticus;
    }
}