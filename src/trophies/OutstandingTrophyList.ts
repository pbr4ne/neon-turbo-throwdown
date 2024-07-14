import { TurboThrow } from "./card/TurboThrow";
import { TrophyType } from "./TrophyType";
import { Library } from "../throwdown/Library";
import { UltraTurboThrow } from "./card/UltraTurboThrow";
import { CyanDeck } from "./cosmetic/CyanDeck";
import { YellowDeck } from "./cosmetic/YellowDeck";
import { BlackDeck } from "./cosmetic/BlackDeck";
import { RedDeck } from "./cosmetic/RedDeck";
import { WhiteDeck } from "./cosmetic/WhiteDeck";
import { IncreaseHP } from "./member/IncreaseHP";
import { SeeCards1 } from "./member/SeeCards1";
import { SeeCards2 } from "./member/SeeCards2";
import { SeeCards3 } from "./member/SeeCards3";
import { SeeTargets1 } from "./member/SeeTargets1";
import { SeeTargets2 } from "./member/SeeTargets2";
import { SeeTargets3 } from "./member/SeeTargets3";

export class OutstandingTrophyList {

    private static trophyTypes: TrophyType[] = [
        //card
        new TurboThrow(),
        new UltraTurboThrow(),
        //cosmetic
        new CyanDeck(),
        new YellowDeck(),
        new WhiteDeck(),
        new BlackDeck(),
        new RedDeck(),
        //member
        new IncreaseHP(),
        new SeeCards1(),
        new SeeCards2(),
        new SeeCards3(),
        // new SeeTargets1(),
        // new SeeTargets2(),
        // new SeeTargets3(),
    ];

    public static getTrophyTypes() {
        return this.trophyTypes;
    }

    public static getEligibleTrophyTypes() {
        //only return trophy types that have prerequisites that have been met
        return this.trophyTypes.filter(trophy => {
            return trophy.getPrerequisites().every(prerequisite => {
                return Library.getTrophyTypes().some(t => t.equals(prerequisite));
            });
        });
    }

    public static removeTrophy(trophy: TrophyType): void {
        const index = OutstandingTrophyList.getTrophyTypes().indexOf(trophy);
        if (index > -1) {
            OutstandingTrophyList.getTrophyTypes().splice(index, 1);
        }
    }

    public static removeTrophies(trophyTypes: TrophyType[]): void {
        trophyTypes.forEach(trophy => {
            OutstandingTrophyList.removeTrophy(trophy);
        });
    }
}