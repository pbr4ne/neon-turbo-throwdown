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
import { HealthRegen1 } from "./member/HealthRegen1";
import { HealthRegen2 } from "./member/HealthRegen2";
import { HealthRegen3 } from "./member/HealthRegen3";
import { Resurrect1 } from "./member/Resurrect1";
import { SeeHealth1 } from "./insight/SeeHealth1";
import { SeeHealth2 } from "./insight/SeeHealth2";
import { SeeHealth3 } from "./insight/SeeHealth3";
import { SeeHealth4 } from "./insight/SeeHealth4";
import { IdleSpeed1 } from "./idle/IdleSpeed1";
import { IdleSpeed2 } from "./idle/IdleSpeed2";
import { IdleSpeed3 } from "./idle/IdleSpeed3";
import { IdleSpeed4 } from "./idle/IdleSpeed4";
import { Throw2 } from "./card/throw/Throw2";
import { Throw3 } from "./card/throw/Throw3";
import { Block2 } from "./card/block/Block2";
import { Block3 } from "./card/block/Block3";
import { Block4 } from "./card/block/Block4";
import { Block5 } from "./card/block/Block5";
import { Catch2 } from "./card/catch/Catch2";
import { Catch3 } from "./card/catch/Catch3";
import { Evade2 } from "./card/evade/Evade2";
import { Evade3 } from "./card/evade/Evade3";
import { Evade4 } from "./card/evade/Evade4";
import { Throw4 } from "./card/throw/Throw4";
import { Throw5 } from "./card/throw/Throw5";
import { Throw6 } from "./card/throw/Throw6";

export class OutstandingTrophyList {

    private static trophyTypes: TrophyType[] = [];

    public static resetTrophyTypes() {
        this.trophyTypes = [
            //cosmetic
            new CyanDeck(),
            new YellowDeck(),
            new WhiteDeck(),
            new BlackDeck(),
            new RedDeck(),
            //health
            new IncreaseHP1(),
            new IncreaseHP2(),
            new HealthRegen1(),
            new HealthRegen2(),
            new HealthRegen3(),
            new Resurrect1(),
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
            //card upgrades
            //throw
            new Throw2(),
            new Throw3(),
            new Throw4(),
            new Throw5(),
            new Throw6(),
            //block
            new Block2(),
            new Block3(),
            new Block4(),
            new Block5(),
            //evade
            new Evade2(),
            new Evade3(),
            new Evade4(),
            //catch
            new Catch2(),
            new Catch3(),
        ];
    };

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
        const trophyKey = trophy.getKey();
        const index = this.trophyTypes.findIndex(t => t.getKey() === trophyKey);
        if (index > -1) {
            this.trophyTypes.splice(index, 1);
        }
    }

    public static removeTrophies(trophyTypes: TrophyType[]): void {
        trophyTypes.forEach(trophy => {
            this.removeTrophy(trophy);
        });
    }

    public static removeKnownTrophyTypes(trophyTypes: TrophyType[]): void {
        trophyTypes.forEach(trophy => {
            this.removeTrophy(trophy);
        });
    }
}