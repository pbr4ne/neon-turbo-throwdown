import { TrophyType } from "./TrophyType";
import { Library } from "../throwdown/Library";
import { CyanDeck } from "./cosmetic/CyanDeck";
import { YellowDeck } from "./cosmetic/YellowDeck";
import { BlackDeck } from "./cosmetic/BlackDeck";
import { RedDeck } from "./cosmetic/RedDeck";
import { WhiteDeck } from "./cosmetic/WhiteDeck";
import { SeeCards1 } from "./insight/SeeCards1";
import { SeeCards2 } from "./insight/SeeCards2";
import { SeeCards3 } from "./insight/SeeCards3";
import { SeeCards4 } from "./insight/SeeCards4";
import { SeeTargets1 } from "./insight/SeeTargets1";
import { SeeTargets2 } from "./insight/SeeTargets2";
import { SeeTargets3 } from "./insight/SeeTargets3";
import { SeeTargets4 } from "./insight/SeeTargets4";
import { IncreaseHP1 } from "./member/IncreaseHP1";
import { IncreaseHP2 } from "./member/IncreaseHP2";
import { IncreaseHP3 } from "./member/IncreaseHP3";
import { IncreaseHP4 } from "./member/IncreaseHP4";
import { IncreaseHP5 } from "./member/IncreaseHP5";
import { IncreaseHP6 } from "./member/IncreaseHP6";
import { SeeHealth1 } from "./insight/SeeHealth1";
import { SeeHealth2 } from "./insight/SeeHealth2";
import { SeeHealth3 } from "./insight/SeeHealth3";
import { SeeHealth4 } from "./insight/SeeHealth4";
import { IdleSpeed1 } from "./idle/IdleSpeed1";
import { IdleSpeed2 } from "./idle/IdleSpeed2";
import { IdleSpeed3 } from "./idle/IdleSpeed3";
import { IdleSpeed4 } from "./idle/IdleSpeed4";

export class OutstandingTrophyList {

    private static trophyTypes: TrophyType[] = [
        //cosmetic
        new CyanDeck(),
        new YellowDeck(),
        new WhiteDeck(),
        new BlackDeck(),
        new RedDeck(),
        //health
        new IncreaseHP1(),
        new IncreaseHP2(),
        new IncreaseHP3(),
        new IncreaseHP4(),
        new IncreaseHP5(),
        new IncreaseHP6(),
        //insight
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
        //idle
        new IdleSpeed1(),
        new IdleSpeed2(),
        new IdleSpeed3(),
        new IdleSpeed4(),
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