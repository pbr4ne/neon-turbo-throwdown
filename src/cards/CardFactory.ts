import { CardKeys } from "./CardKeys";
import { CardType } from "./CardType";
import { BestBlock } from "./base/block/BestBlock";
import { BetterBlock } from "./base/block/BetterBlock";
import { Block } from "./base/block/Block";
import { DoubleBlock } from "./base/block/DoubleBlock";
import { TurboBlock } from "./base/block/TurboBlock";
import { BigHands } from "./base/catch/BigHands";
import { Catch } from "./base/catch/Catch";
import { TurboCatch } from "./base/catch/TurboCatch";
import { DoubleEvade } from "./base/evade/DoubleEvade";
import { Evade } from "./base/evade/Evade";
import { TripleEvade } from "./base/evade/TripleEvade";
import { TurboEvade } from "./base/evade/TurboEvade";
import { Ricochet } from "./base/throw/Ricochet";
import { RiRicochet } from "./base/throw/RiRicochet";
import { SniperThrow } from "./base/throw/SniperThrow";
import { Throw } from "./base/throw/Throw";
import { TurboThrow } from "./base/throw/TurboThrow";
import { UltraTurboThrow } from "./base/throw/UltraTurboThrow";
import { UnknownCard } from "./UnknownCard";
import { BiggBalls } from "./boss/sporticus/BiggBalls";
import { HardBall } from "./boss/sporticus/Hardball";
import { AmazeBalls } from "./boss/sporticus/AmazeBalls";
import { BallBearings } from "./boss/sporticus/BallBearings";
import { BlueBalls } from "./boss/sporticus/BlueBalls";
import { Monocle } from "./boss/tycoon/Monocle";
import { MoustacheWax } from "./boss/tycoon/MoustacheWax";
import { SnuffBox } from "./boss/tycoon/SnuffBox";
import { SupplyAndDemand } from "./boss/tycoon/SupplyAndDemand";
import { UnionBusting } from "./boss/tycoon/UnionBusting";
import { CircleBack } from "./boss/office/CircleBack";
import { LevelSet } from "./boss/office/LevelSet";
import { TPSReport } from "./boss/office/TPSReport";
import { Waterfall } from "./boss/office/Waterfall";
import { Brainstorm } from "./boss/office/Brainstorm";
import { SoldierOn } from "./boss/sgtsteve/SoldierOn";
import { CoveringFire } from "./boss/sgtsteve/CoveringFire";
import { DropAndGiveMe20 } from "./boss/sgtsteve/DropAndGiveMe20";
import { TenHut } from "./boss/sgtsteve/TenHut";
import { Tripwire } from "./boss/sgtsteve/Tripwire";
import { AintGonnaTakeIt } from "./boss/betsy/AintGonnaTakeIt";
import { BallRoomBlitz } from "./boss/betsy/BallRoomBlitz";
import { DeadOrAlive } from "./boss/betsy/DeadOrAlive";
import { BLockOfAges } from "./boss/betsy/BlockOfAges";
import { DontStopMeNow } from "./boss/betsy/DontStopMeNow";
import { BehindTheCurtain } from "./boss/boss10/BehindTheCurtain";
import { FourthWall } from "./boss/boss10/FourthWall";
import { JustAGame } from "./boss/boss10/JustAGame";
import { Metagaming } from "./boss/boss10/Metagaming";
import { NothingMatters } from "./boss/boss10/NothingMatters";
import { Alt } from "./boss/coree/Alt";
import { Ctrl } from "./boss/coree/Ctrl";
import { Delete } from "./boss/coree/Delete";
import { F5 } from "./boss/coree/F5";
import { F7 } from "./boss/coree/F7";
import { MonkeyStealsThePeach } from "./boss/shadowken/MonkeyStealsThePeach";
import { NinjaStar } from "./boss/shadowken/NinjaStar";
import { Seppuku } from "./boss/shadowken/Seppuku";
import { Shadowken } from "./boss/shadowken/Shadowken";
import { SmokeBomb } from "./boss/shadowken/SmokeBomb";
import { Calculator } from "./boss/turbonerd/Calculator";
import { DidIDoThat } from "./boss/turbonerd/DidIDoThat";
import { Mathlete } from "./boss/turbonerd/Mathlete";
import { PocketProtector } from "./boss/turbonerd/PocketProtector";
import { WeirdScience } from "./boss/turbonerd/WeirdScience";

export class CardFactory {
    private static cardTypeMap: Map<CardKeys, new () => CardType> = new Map();

    public static registerCardType(type: CardKeys, constructor: new () => CardType) {
        CardFactory.cardTypeMap.set(type, constructor);
    }

    public static createCardType(type: CardKeys): CardType {
        const constructor = CardFactory.cardTypeMap.get(type);
        if (constructor) {
            return new constructor();
        }
        console.error(`Card type not found: ${type}`);
        return new UnknownCard();
    }

    public static registerCardTypes() {
        //base cards

        //throw
        this.registerCardType(CardKeys.THROW, Throw);
        this.registerCardType(CardKeys.TURBO_THROW, TurboThrow);
        this.registerCardType(CardKeys.RICOCHET, Ricochet);
        this.registerCardType(CardKeys.ULTRA_TURBO_THROW, UltraTurboThrow);
        this.registerCardType(CardKeys.RI_RICOCHET, RiRicochet);
        this.registerCardType(CardKeys.SNIPER_THROW, SniperThrow);
        
        //block
        this.registerCardType(CardKeys.BLOCK, Block);
        this.registerCardType(CardKeys.BETTER_BLOCK, BetterBlock);
        this.registerCardType(CardKeys.TURBO_BLOCK, TurboBlock);
        this.registerCardType(CardKeys.BEST_BLOCK, BestBlock);
        this.registerCardType(CardKeys.DOUBLE_BLOCK, DoubleBlock);

        //evade
        this.registerCardType(CardKeys.EVADE, Evade);
        this.registerCardType(CardKeys.DOUBLE_EVADE, DoubleEvade);
        this.registerCardType(CardKeys.TURBO_EVADE, TurboEvade);
        this.registerCardType(CardKeys.TRIPLE_EVADE, TripleEvade);
        
        //catch
        this.registerCardType(CardKeys.CATCH, Catch);
        this.registerCardType(CardKeys.TURBO_CATCH, TurboCatch);
        this.registerCardType(CardKeys.BIG_HANDS, BigHands);

        //sporticus
        this.registerCardType(CardKeys.BIGG_BALLS, BiggBalls);
        this.registerCardType(CardKeys.HARDBALL, HardBall);
        this.registerCardType(CardKeys.BLUE_BALLS, BlueBalls);
        this.registerCardType(CardKeys.BALL_BEARINGS, BallBearings);
        this.registerCardType(CardKeys.AMAZEBALLS, AmazeBalls);

        //russ
        this.registerCardType(CardKeys.MONOCLE, Monocle);
        this.registerCardType(CardKeys.UNION_BUSTING, UnionBusting);
        this.registerCardType(CardKeys.SUPPLY_AND_DEMAND, SupplyAndDemand);
        this.registerCardType(CardKeys.MOUSTACHE_WAX, MoustacheWax);
        this.registerCardType(CardKeys.SNUFF_BOX, SnuffBox);

        //boss
        this.registerCardType(CardKeys.CIRCLE_BACK, CircleBack);
        this.registerCardType(CardKeys.LEVEL_SET, LevelSet);
        this.registerCardType(CardKeys.WATERFALL, Waterfall);
        this.registerCardType(CardKeys.BRAINSTORM, Brainstorm);
        this.registerCardType(CardKeys.TPS_REPORT, TPSReport);

        //steve
        this.registerCardType(CardKeys.SOLDIER_ON, SoldierOn);
        this.registerCardType(CardKeys.DROP_AND_GIVE_ME_20, DropAndGiveMe20);
        this.registerCardType(CardKeys.TEN_HUT, TenHut);
        this.registerCardType(CardKeys.COVERING_FIRE, CoveringFire);
        this.registerCardType(CardKeys.TRIPWIRE, Tripwire);

        //betsy
        this.registerCardType(CardKeys.BALL_ROOM_BLITZ, BallRoomBlitz);
        this.registerCardType(CardKeys.AINT_GONNA_TAKE_IT, AintGonnaTakeIt);
        this.registerCardType(CardKeys.DEAD_OR_ALIVE, DeadOrAlive);
        this.registerCardType(CardKeys.BLOCK_OF_AGES, BLockOfAges);
        this.registerCardType(CardKeys.DONT_STOP_ME_NOW, DontStopMeNow);

        //coree
        this.registerCardType(CardKeys.CTRL, Ctrl);
        this.registerCardType(CardKeys.ALT, Alt);
        this.registerCardType(CardKeys.DELETE, Delete);
        this.registerCardType(CardKeys.F5, F5);
        this.registerCardType(CardKeys.F7, F7);        

        //turbo
        this.registerCardType(CardKeys.POCKET_PROTECTOR, PocketProtector);
        this.registerCardType(CardKeys.CALCULATOR, Calculator);
        this.registerCardType(CardKeys.WEIRD_SCIENCE, WeirdScience);
        this.registerCardType(CardKeys.MATHLETE, Mathlete);
        this.registerCardType(CardKeys.DID_I_DO_THAT, DidIDoThat);

        //shadow
        this.registerCardType(CardKeys.SHADOWKEN, Shadowken);
        this.registerCardType(CardKeys.SMOKE_BOMB, SmokeBomb);
        this.registerCardType(CardKeys.SEPPUKU, Seppuku);
        this.registerCardType(CardKeys.NINJA_STAR, NinjaStar);
        this.registerCardType(CardKeys.MONKEY_STEALS_THE_PEACH, MonkeyStealsThePeach);

        //boss10
        this.registerCardType(CardKeys.NOTHING_MATTERS, NothingMatters);
        this.registerCardType(CardKeys.JUST_A_GAME, JustAGame);
        this.registerCardType(CardKeys.BEHIND_THE_CURTAIN, BehindTheCurtain);
        this.registerCardType(CardKeys.FOURTH_WALL, FourthWall);
        this.registerCardType(CardKeys.METAGAMING, Metagaming);

        //unknown
        this.registerCardType(CardKeys.UNKNOWN, UnknownCard);
    }
}
