import { TrophyType } from "./TrophyType";
import { Library } from "../throwdown/Library";
import { CyanDeck } from "./cosmetic/CyanDeck";
import { YellowDeck } from "./cosmetic/YellowDeck";
import { BlackDeck } from "./cosmetic/BlackDeck";
import { RedDeck } from "./cosmetic/RedDeck";
import { WhiteDeck } from "./cosmetic/WhiteDeck";
import { SeeCards1 } from "./member/SeeCards1";
import { SeeCards2 } from "./member/SeeCards2";
import { SeeCards3 } from "./member/SeeCards3";
import { SeeCards4 } from "./member/SeeCards4";
import { SeeTargets1 } from "./member/SeeTargets1";
import { SeeTargets2 } from "./member/SeeTargets2";
import { SeeTargets3 } from "./member/SeeTargets3";
import { SeeTargets4 } from "./member/SeeTargets4";
import { IncreaseHP1 } from "./member/IncreaseHP1";
import { IncreaseHP2 } from "./member/IncreaseHP2";
import { IncreaseHP3 } from "./member/IncreaseHP3";
import { IncreaseHP4 } from "./member/IncreaseHP4";
import { IncreaseHP5 } from "./member/IncreaseHP5";
import { IncreaseHP6 } from "./member/IncreaseHP6";
import { SeeHealth1 } from "./member/SeeHealth1";
import { SeeHealth2 } from "./member/SeeHealth2";
import { SeeHealth3 } from "./member/SeeHealth3";
import { SeeHealth4 } from "./member/SeeHealth4";

export class OutstandingTrophyList {

    private static trophyTypes: TrophyType[] = [
        //cosmetic
        new CyanDeck(),
        new YellowDeck(),
        new WhiteDeck(),
        new BlackDeck(),
        new RedDeck(),
        //member
        new IncreaseHP1(),
        new IncreaseHP2(),
        new IncreaseHP3(),
        new IncreaseHP4(),
        new IncreaseHP5(),
        new IncreaseHP6(),
        new SeeCards1(),
        new SeeCards2(),
        new SeeCards3(),
        new SeeCards4(),
        new SeeTargets1(),
        new SeeTargets2(),
        new SeeTargets3(),
        new SeeTargets4(),
        new SeeHealth1(),
        new SeeHealth2(),
        new SeeHealth3(),
        new SeeHealth4(),
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