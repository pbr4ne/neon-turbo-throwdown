import { CoachList } from '../throwdown/CoachList';
import { CoachDialogue } from './CoachDialogue';
import { DialogueConversation, DialogueStep } from './Dialogue';
import { StorageManager } from '../utilities/StorageManager';
import { log } from "../utilities/GameUtils";
import { CoachKeys } from '../throwdown/CoachKeys';

export class DialogueStorage {

    public static primoDialogue: CoachDialogue = new CoachDialogue();
    public static sporticusDialogue: CoachDialogue = new CoachDialogue();
    public static tycoonDialogue: CoachDialogue = new CoachDialogue();
    public static officeDialogue: CoachDialogue = new CoachDialogue();
    public static sgtsteveDialogue: CoachDialogue = new CoachDialogue();
    public static betsyDialogue: CoachDialogue = new CoachDialogue();
    public static coreeDialogue: CoachDialogue = new CoachDialogue();
    public static turbonerdDialogue: CoachDialogue = new CoachDialogue();
    public static shadowkenDialogue: CoachDialogue = new CoachDialogue();
    public static boss10Dialogue: CoachDialogue = new CoachDialogue();

    //special
    public static firstSpiritDialogue: DialogueConversation = new DialogueConversation();
    public static finalDialogue: DialogueConversation = new DialogueConversation();

    public static missingDialogue: CoachDialogue = new CoachDialogue();
    public static missingDialogueConversation: DialogueConversation = new DialogueConversation();
    public static missingDialogueStep: DialogueStep = new DialogueStep("placeholder", CoachList.you);

    public constructor() {
        if (DialogueStorage.primoDialogue.getIntroDialogueList().length > 0) {
            log("already initialized dialogues");
            return;
        }
        this.initializePrimoDialogue();
        this.initializeSporticusDialogue();
        this.initializeTycoonDialogue();
        this.initializeOfficeDialogue();
        this.initializeSgtsteveDialogue();
        this.initializeBetsyDialogue();
        this.initializeCoreeDialogue();
        this.initializeTurbonerdDialogue();
        this.initializeShadowkenDialogue();

        this.initializeSpiritDialogue();
        this.initializeFinalDialogue();

        this.initializeBoss10Dialogue();
        this.initializeMissingDialogue();
        this.initializeMissingDialogueConversation();

        this.warnIfMissingDialogue(DialogueStorage.primoDialogue, CoachKeys.PRIMO);
        this.warnIfMissingDialogue(DialogueStorage.sporticusDialogue, CoachKeys.SPORTICUS);
        this.warnIfMissingDialogue(DialogueStorage.tycoonDialogue, CoachKeys.TYCOON);
        this.warnIfMissingDialogue(DialogueStorage.officeDialogue, CoachKeys.OFFICE);
        this.warnIfMissingDialogue(DialogueStorage.sgtsteveDialogue, CoachKeys.SGT_STEVE);
        this.warnIfMissingDialogue(DialogueStorage.betsyDialogue, CoachKeys.BETSY);
        this.warnIfMissingDialogue(DialogueStorage.coreeDialogue, CoachKeys.COREE);
        this.warnIfMissingDialogue(DialogueStorage.turbonerdDialogue, CoachKeys.TURBO_NERD);
        this.warnIfMissingDialogue(DialogueStorage.shadowkenDialogue, CoachKeys.SHADOW_KEN);
        this.warnIfMissingDialogue(DialogueStorage.boss10Dialogue, CoachKeys.BOSS_10);
    }

    public initializeSpiritDialogue(): void {
        DialogueStorage.firstSpiritDialogue.addStep("My child. Do not despair. Choose a consolationnn- I mean participation trophy and continue thy quest.", CoachList.spirit, "???");
        DialogueStorage.firstSpiritDialogue.addStep(["Can I go home instead?", "How do I beat the gym bosses?", "I'm gonna turbo-slice that (insert non-offensive 80s insult here)"], CoachList.you);
        DialogueStorage.firstSpiritDialogue.addStep("All will be revealed... in time... ", CoachList.spirit);
    }

    public initializeFinalDialogue(): void {
        DialogueStorage.finalDialogue.addStep("...ya did it kid! Ya finally did it! Now as per Turbo Throwdown rules, I'll grant ya one wish!", CoachList.coach);
        DialogueStorage.finalDialogue.addStep(["I just want to get to music bingo.", "...just answer me one question: are you just a giant floating dodgeball?", "This game kinda grew on me. When's the next tournament?"], CoachList.you);
        DialogueStorage.finalDialogue.addStep(`Tell you what kid. I'll grant all three because I like ya.
            \nOne. I'll turbo-port ya right ta music bingo.
            \nTwo. Yes.
            \nThree. The tournament is comin ta YOU!`, CoachList.coach);
        DialogueStorage.finalDialogue.addStep(["...what do you mean? It's over."], CoachList.you);
        DialogueStorage.finalDialogue.addStep("It's never over.", CoachList.boss10);
        DialogueStorage.finalDialogue.addStep("You showed us what the real world is capable of. And it has horses!", CoachList.shadowken);
        DialogueStorage.finalDialogue.addStep("I've already prepared the turbo-porter calculations.", CoachList.turbonerd);
        DialogueStorage.finalDialogue.addStep("CHARGEUP PHASE INITIATED.", CoachList.coree);
        DialogueStorage.finalDialogue.addStep("We're gonne keep on rockin' in the REAL WORLD!", CoachList.betsy);
        DialogueStorage.finalDialogue.addStep("Operation REALBO is about to commence.", CoachList.sgtsteve);
        DialogueStorage.finalDialogue.addStep("I've submitted PTO requests on behalf of the coaches.", CoachList.office);
        DialogueStorage.finalDialogue.addStep("...how many millions should I bring for the weekend?", CoachList.tycoon);
        DialogueStorage.finalDialogue.addStep("We are legion.", CoachList.sporticus);
        DialogueStorage.finalDialogue.addStep("...I'm invited this time, right guys? ...guys...???", CoachList.primo);
        DialogueStorage.finalDialogue.addStep(["I'm closing this browser window and never re-opening it.", "What the actual F.", "I HAVE TO WARN THEM."], CoachList.you);
    }

    public initializePrimoDialogue(): void {
        log("Initializing Primo Dialogue");
        const primoIntroDialogue1 = new DialogueConversation();
        const primoIntroDialogue2 = new DialogueConversation();
        const primoIntroDialogue3 = new DialogueConversation();

        const primoWinDialogue1 = new DialogueConversation();
        const primoWinDialogue2 = new DialogueConversation();
        const primoWinDialogue3 = new DialogueConversation();

        const primoLoseDialogue1 = new DialogueConversation();
        const primoLoseDialogue2 = new DialogueConversation();
        const primoLoseDialogue3 = new DialogueConversation();

        DialogueStorage.primoDialogue.getIntroDialogueList().push(primoIntroDialogue1);
        DialogueStorage.primoDialogue.getIntroDialogueList().push(primoIntroDialogue2);
        DialogueStorage.primoDialogue.getIntroDialogueList().push(primoIntroDialogue3);
        
        DialogueStorage.primoDialogue.getWinDialogueList().push(primoWinDialogue1);
        DialogueStorage.primoDialogue.getWinDialogueList().push(primoWinDialogue2);
        DialogueStorage.primoDialogue.getWinDialogueList().push(primoWinDialogue3);

        DialogueStorage.primoDialogue.getLoseDialogueList().push(primoLoseDialogue1);
        DialogueStorage.primoDialogue.getLoseDialogueList().push(primoLoseDialogue2);
        DialogueStorage.primoDialogue.getLoseDialogueList().push(primoLoseDialogue3);

        //intro
        //1
        primoIntroDialogue1.addStep("You step into the gym for an ordinary day of sick gains when...", CoachList.you);
        primoIntroDialogue1.addStep(["What...?", "Huh...?"], CoachList.you);
        primoIntroDialogue1.addStep("A portal appears and sucks you in!", CoachList.you);
        primoIntroDialogue1.addStep("It still *looks* like the local gym, but everything is strange and neon!", CoachList.you)
        primoIntroDialogue1.addStep("I am Primo Firstman. Are you here to throwdown?", CoachList.primo, "???");
        primoIntroDialogue1.addStep(["What?"], CoachList.you);
        primoIntroDialogue1.addStep("In other words, are you asking for a CHALLENGE?", CoachList.primo);
        primoIntroDialogue1.addStep(["Throwdown as in... fight?", "I'm just here for sick gains, bro.", "Prepare to be TURBO THRASHED!"], CoachList.you);
        primoIntroDialogue1.addStep("Hahahahaha. Then prepare your team and let us BEGIN.", CoachList.primo);
        primoIntroDialogue1.addStep("Hey kid, wait!", CoachList.coach);
        primoIntroDialogue1.addStep(["Who?", "What?", "I'm 37."], CoachList.you);
        primoIntroDialogue1.addStep("I know a rookie when I see one. Come find me in the corner and I'll give you some pointers.", CoachList.coach);
        primoIntroDialogue1.addStep(["Pointers for what? My aerobics class?", "I don't need anyone's help, old man.", "Sure, I'll ask you how to “throw down” or whatever."], CoachList.you);
        //2
        primoIntroDialogue2.addStep("Alright kid, don't get dis-TURBed. Ya gotta build up yer deck er...coach commands sometimes ta beat these guys.", CoachList.coach);
        primoIntroDialogue2.addStep("You again. Don't forget - it's Primo like Emo. Because Prime-o is harder to rhyme-o", CoachList.primo);
        //3
        primoIntroDialogue3.addStep("If you aren't first, you're last. Because only two coaches compete at a time.", CoachList.primo);

        //win
        //1
        primoWinDialogue1.addStep("Waaaah! I got turbo-thrashed!", CoachList.primo);
        primoWinDialogue1.addStep(["More like Primo WORSTman.", "Yayyyy, can I go home now?"], CoachList.you);
        primoWinDialogue1.addStep("Ya did it, kid! Only 9 more gym bosses to go!", CoachList.coach);
        primoWinDialogue1.addStep(["Nine?", "I told you, I'm not a kid.", "TURBO-SLICED!!!!"], CoachList.you);
        //2
        primoWinDialogue2.addStep("Turbo-thrashed again!", CoachList.primo);
        //3
        primoWinDialogue3.addStep("I better learn some new moves.", CoachList.primo);

        //lose
        //1
        primoLoseDialogue1.addStep("Don't mess with the best! The best being me and of course all the other bosses who occupy a more enviable position in this gym.", CoachList.primo);
        //2
        primoLoseDialogue2.addStep("How does LAST feel... 'cause first feels great! 'Cause Primo means first. In case that wasn't clear. Before.", CoachList.primo);
        //3
        primoLoseDialogue3.addStep("Are you just trophy-pumping??", CoachList.primo);
    }

    public initializeSporticusDialogue(): void {
        const sporticusIntroDialogue1 = new DialogueConversation();
        const sporticusIntroDialogue2 = new DialogueConversation();
        const sporticusIntroDialogue3 = new DialogueConversation();

        const sporticusWinDialogue1 = new DialogueConversation();
        const sporticusWinDialogue2 = new DialogueConversation();
        const sporticusWinDialogue3 = new DialogueConversation();

        const sporticusLoseDialogue1 = new DialogueConversation();
        const sporticusLoseDialogue2 = new DialogueConversation();
        const sporticusLoseDialogue3 = new DialogueConversation();

        DialogueStorage.sporticusDialogue.getIntroDialogueList().push(sporticusIntroDialogue1);
        DialogueStorage.sporticusDialogue.getIntroDialogueList().push(sporticusIntroDialogue2);
        DialogueStorage.sporticusDialogue.getIntroDialogueList().push(sporticusIntroDialogue3);

        DialogueStorage.sporticusDialogue.getWinDialogueList().push(sporticusWinDialogue1);
        DialogueStorage.sporticusDialogue.getWinDialogueList().push(sporticusWinDialogue2);
        DialogueStorage.sporticusDialogue.getWinDialogueList().push(sporticusWinDialogue3);
        
        DialogueStorage.sporticusDialogue.getLoseDialogueList().push(sporticusLoseDialogue1);
        DialogueStorage.sporticusDialogue.getLoseDialogueList().push(sporticusLoseDialogue2);
        DialogueStorage.sporticusDialogue.getLoseDialogueList().push(sporticusLoseDialogue3);

        //intro
        //1
        sporticusIntroDialogue1.addStep("I am Sporticus!!", CoachList.sporticus, "???");
        sporticusIntroDialogue1.addStep(["No, I am Sporticus!", "....'cause Sports?", "I am 37."], CoachList.you);
        //2
        sporticusIntroDialogue2.addStep("Let the battle be THROWN!", CoachList.sporticus);
        //3
        sporticusIntroDialogue3.addStep("Veni, Vidi, Velocity!", CoachList.sporticus);

        //win
        //1
        sporticusWinDialogue1.addStep("By the tender tendon of Achilles! I lost!", CoachList.sporticus);
        //2
        sporticusWinDialogue2.addStep("Et Tu, Coach?", CoachList.sporticus);
        //3
        sporticusWinDialogue3.addStep("Way to Visigoth my turbo-gains.", CoachList.sporticus);

        //lose
        //1
        sporticusLoseDialogue1.addStep("Your team should've worn better protection! Might I suggest the Trojan method?", CoachList.sporticus);
        //2
        sporticusLoseDialogue2.addStep("Rome wasn't thrown down in a day.", CoachList.sporticus);
        //3
        sporticusLoseDialogue3.addStep("You can't beat me! Throwdown is my Roman Empire!", CoachList.sporticus);
    }

    public initializeTycoonDialogue(): void {  
        const tycoonIntroDialogue1 = new DialogueConversation();
        const tycoonIntroDialogue2 = new DialogueConversation();
        const tycoonIntroDialogue3 = new DialogueConversation();

        const tycoonWinDialogue1 = new DialogueConversation();
        const tycoonWinDialogue2 = new DialogueConversation();
        const tycoonWinDialogue3 = new DialogueConversation();

        const tycoonLoseDialogue1 = new DialogueConversation();
        const tycoonLoseDialogue2 = new DialogueConversation();
        const tycoonLoseDialogue3 = new DialogueConversation();

        DialogueStorage.tycoonDialogue.getIntroDialogueList().push(tycoonIntroDialogue1);
        DialogueStorage.tycoonDialogue.getIntroDialogueList().push(tycoonIntroDialogue2);
        DialogueStorage.tycoonDialogue.getIntroDialogueList().push(tycoonIntroDialogue3);

        DialogueStorage.tycoonDialogue.getWinDialogueList().push(tycoonWinDialogue1);
        DialogueStorage.tycoonDialogue.getWinDialogueList().push(tycoonWinDialogue2);
        DialogueStorage.tycoonDialogue.getWinDialogueList().push(tycoonWinDialogue3);
        
        DialogueStorage.tycoonDialogue.getLoseDialogueList().push(tycoonLoseDialogue1);
        DialogueStorage.tycoonDialogue.getLoseDialogueList().push(tycoonLoseDialogue2);
        DialogueStorage.tycoonDialogue.getLoseDialogueList().push(tycoonLoseDialogue3);

        //intro
        //1
        tycoonIntroDialogue1.addStep("I say, old bean! Shall we have a sporting match of sports match?", CoachList.tycoon, "???");
        tycoonIntroDialogue1.addStep(["I thought it was called Turbo Throwdown?", "How... are you a gym coach exactly?", "I'm 37, I'm not old."], CoachList.you);
        tycoonIntroDialogue1.addStep("Hahahaha, capital!", CoachList.tycoon);
        //2
        tycoonIntroDialogue2.addStep("...so I told them a pair would be called a binocle but did they listen to me? Nooooo... ", CoachList.tycoon);
        //3
        tycoonIntroDialogue3.addStep("I used to coach croquet, but alas, it's so passé!", CoachList.tycoon);

        //win
        //1
        tycoonWinDialogue1.addStep("Curses! I didn't wax my balls enough!", CoachList.tycoon);
        //2
        tycoonWinDialogue2.addStep("Zounds and turbo-zounds!", CoachList.tycoon);
        //3
        tycoonWinDialogue3.addStep("My insider turbo-trading was for naught!", CoachList.tycoon);

        //lose
        //1
        tycoonLoseDialogue1.addStep("Capital match, old bean!", CoachList.tycoon);
        //2
        tycoonLoseDialogue2.addStep("Do say hello to the spirit coach for me, won't you?", CoachList.tycoon);
        //3
        tycoonLoseDialogue3.addStep("My strategy paid dividends!", CoachList.tycoon);
    }

    public initializeOfficeDialogue(): void {
        const officeIntroDialogue1 = new DialogueConversation();
        const officeIntroDialogue2 = new DialogueConversation();
        const officeIntroDialogue3 = new DialogueConversation();
        const officeIntroDialogue4 = new DialogueConversation();
        const officeIntroDialogue5 = new DialogueConversation();

        const officeWinDialogue1 = new DialogueConversation();
        const officeWinDialogue2 = new DialogueConversation();
        const officeWinDialogue3 = new DialogueConversation();

        const officeLoseDialogue1 = new DialogueConversation();
        const officeLoseDialogue2 = new DialogueConversation();
        const officeLoseDialogue3 = new DialogueConversation();
        const officeLoseDialogue4 = new DialogueConversation();

        DialogueStorage.officeDialogue.getIntroDialogueList().push(officeIntroDialogue1);
        DialogueStorage.officeDialogue.getIntroDialogueList().push(officeIntroDialogue2);
        DialogueStorage.officeDialogue.getIntroDialogueList().push(officeIntroDialogue3);
        DialogueStorage.officeDialogue.getIntroDialogueList().push(officeIntroDialogue4);
        DialogueStorage.officeDialogue.getIntroDialogueList().push(officeIntroDialogue5);

        DialogueStorage.officeDialogue.getWinDialogueList().push(officeWinDialogue1);
        DialogueStorage.officeDialogue.getWinDialogueList().push(officeWinDialogue2);
        DialogueStorage.officeDialogue.getWinDialogueList().push(officeWinDialogue3);

        DialogueStorage.officeDialogue.getLoseDialogueList().push(officeLoseDialogue1);
        DialogueStorage.officeDialogue.getLoseDialogueList().push(officeLoseDialogue2);
        DialogueStorage.officeDialogue.getLoseDialogueList().push(officeLoseDialogue3);
        DialogueStorage.officeDialogue.getLoseDialogueList().push(officeLoseDialogue4);

        //intro
        //1
        officeIntroDialogue1.addStep("*ring ring* This is Cheryl calling. You're going down. Town. To intern at our new office!", CoachList.office, "???");
        officeIntroDialogue1.addStep(["I'm 37. In other words, done with unpaid internships.", "Ooo the one on 6th ave.? Nice.", "The 80s called. They want their 5 ft of shoulderpads back."], CoachList.office);
        officeIntroDialogue1.addStep("But first, YOUR INTERVIEW!", CoachList.office);
        //2
        officeIntroDialogue2.addStep("You didn't stamp your timesheet.", CoachList.office);
        //3
        officeIntroDialogue3.addStep("...we're ordering lunch, what do you want?", CoachList.office);
        //4
        officeIntroDialogue4.addStep("Let's skip the ice-breaker!", CoachList.office);
        //5
        officeIntroDialogue5.addStep("...got time for a quick one-on-one?", CoachList.office);

        //win
        //1
        officeWinDialogue1.addStep("This will reflect well in your performance review", CoachList.office);
        officeWinDialogue1.addStep(["You're not the boss of me", "Whatever, Shoulderpads.", "Thanks, Boss"], CoachList.you);
        //2
        officeWinDialogue2.addStep("...CCing the regional director on your kudos.", CoachList.office);
        //3
        officeWinDialogue3.addStep("You've surpassed your quarterly targets!", CoachList.office);

        //lose
        //1
        officeLoseDialogue1.addStep("Tsk. Not yet meeting expectations...", CoachList.office);
        //2
        officeLoseDialogue2.addStep("You forgot about the AGILE method. Always Give In (to) Leg Energy!", CoachList.office);
        //3
        officeLoseDialogue3.addStep("I can't believe I'm still on hold with HR.", CoachList.office);
        //4
        officeLoseDialogue4.addStep("Expect a performance improvement plan in your inbox shortly.", CoachList.office);
    }

    public initializeSgtsteveDialogue(): void {
        const sgtsteveIntroDialogue1 = new DialogueConversation();
        const sgtsteveIntroDialogue2 = new DialogueConversation();
        const sgtsteveIntroDialogue3 = new DialogueConversation();
        const sgtsteveIntroDialogue4 = new DialogueConversation();

        const sgtsteveWinDialogue1 = new DialogueConversation();
        const sgtsteveWinDialogue2 = new DialogueConversation();
        const sgtsteveWinDialogue3 = new DialogueConversation();

        const sgtsteveLoseDialogue1 = new DialogueConversation();
        const sgtsteveLoseDialogue2 = new DialogueConversation();
        const sgtsteveLoseDialogue3 = new DialogueConversation();

        DialogueStorage.sgtsteveDialogue.getIntroDialogueList().push(sgtsteveIntroDialogue1);
        DialogueStorage.sgtsteveDialogue.getIntroDialogueList().push(sgtsteveIntroDialogue2);
        DialogueStorage.sgtsteveDialogue.getIntroDialogueList().push(sgtsteveIntroDialogue3);
        DialogueStorage.sgtsteveDialogue.getIntroDialogueList().push(sgtsteveIntroDialogue4);

        DialogueStorage.sgtsteveDialogue.getWinDialogueList().push(sgtsteveWinDialogue1);
        DialogueStorage.sgtsteveDialogue.getWinDialogueList().push(sgtsteveWinDialogue2);
        DialogueStorage.sgtsteveDialogue.getWinDialogueList().push(sgtsteveWinDialogue3);

        DialogueStorage.sgtsteveDialogue.getLoseDialogueList().push(sgtsteveLoseDialogue1);
        DialogueStorage.sgtsteveDialogue.getLoseDialogueList().push(sgtsteveLoseDialogue2);
        DialogueStorage.sgtsteveDialogue.getLoseDialogueList().push(sgtsteveLoseDialogue3);

        //intro
        //1
        sgtsteveIntroDialogue1.addStep("Ten-hut! Let's see if you're ready to enlist!", CoachList.sgtsteve, "???");
        sgtsteveIntroDialogue1.addStep(["No thanks.", "Enlist in what? The lore is a bit vague here...", "You'll be turbo-saluting ME in no time!"], CoachList.you);
        //2
        sgtsteveIntroDialogue2.addStep("Throwdown is my business, and business is good!", CoachList.sgtsteve);
        sgtsteveIntroDialogue2.addStep(["Deep cut.", "I thought business was the last boss?", "It's business time!"], CoachList.you);
        //3
        sgtsteveIntroDialogue3.addStep("I love the smell of balls in the morning", CoachList.sgtsteve);
        //4
        sgtsteveIntroDialogue4.addStep("Intros...intros never change", CoachList.sgtsteve);

        //win
        //1
        sgtsteveWinDialogue1.addStep("This was your finest five minutes", CoachList.sgtsteve);
        //2
        sgtsteveWinDialogue2.addStep("The greatest victory is that which requires no balls.", CoachList.sgtsteve);
        //3
        sgtsteveWinDialogue3.addStep("You're lucky I didn't levee en masse your ass", CoachList.sgtsteve);
        
        //lose
        //1
        sgtsteveLoseDialogue1.addStep("Nothing can stop the throwing of balls except other balls", CoachList.sgtsteve);
        //2
        sgtsteveLoseDialogue2.addStep("You discharged your balls dishonourably.", CoachList.sgtsteve);
        //3
        sgtsteveLoseDialogue3.addStep("Throwdown is hell", CoachList.sgtsteve);
    }

    public initializeBetsyDialogue(): void {
        const betsyIntroDialogue1 = new DialogueConversation();
        const betsyIntroDialogue2 = new DialogueConversation();
        const betsyIntroDialogue3 = new DialogueConversation();

        const betsyWinDialogue1 = new DialogueConversation();
        const betsyWinDialogue2 = new DialogueConversation();
        const betsyWinDialogue3 = new DialogueConversation();
        const betsyWinDialogue4 = new DialogueConversation();
        const betsyWinDialogue5 = new DialogueConversation();

        const betsyLoseDialogue1 = new DialogueConversation();
        const betsyLoseDialogue2 = new DialogueConversation();
        const betsyLoseDialogue3 = new DialogueConversation();

        DialogueStorage.betsyDialogue.getIntroDialogueList().push(betsyIntroDialogue1);
        DialogueStorage.betsyDialogue.getIntroDialogueList().push(betsyIntroDialogue2);
        DialogueStorage.betsyDialogue.getIntroDialogueList().push(betsyIntroDialogue3);

        DialogueStorage.betsyDialogue.getWinDialogueList().push(betsyWinDialogue1);
        DialogueStorage.betsyDialogue.getWinDialogueList().push(betsyWinDialogue2);
        DialogueStorage.betsyDialogue.getWinDialogueList().push(betsyWinDialogue3);

        DialogueStorage.betsyDialogue.getLoseDialogueList().push(betsyLoseDialogue1);
        DialogueStorage.betsyDialogue.getLoseDialogueList().push(betsyLoseDialogue2);
        DialogueStorage.betsyDialogue.getLoseDialogueList().push(betsyLoseDialogue3);

        //intro
        //1
        betsyIntroDialogue1.addStep("...mic check...is this on?", CoachList.betsy, "???");
        betsyIntroDialogue1.addStep(["I can hear you.", "Turb it up to 11!", "...wow, this gym has a great PA system!"], CoachList.you);
        betsyIntroDialogue1.addStep("Welcome to the audition!", CoachList.betsy);
        //2
        betsyIntroDialogue2.addStep("🎵 Betsy's my name, no one else is the same!", CoachList.betsy);
        //3
        betsyIntroDialogue3.addStep("Let's see if this is your...FINAL THROWDOWWWWWN 🎵", CoachList.betsy);

        //win
        //1
        betsyWinDialogue1.addStep("That performance took my breath away!", CoachList.betsy);
        //2
        betsyWinDialogue2.addStep("You rocked me like a hurricane!", CoachList.betsy);
        //3
        betsyWinDialogue3.addStep("When I think about you I turb myself!", CoachList.betsy);
        //4
        betsyWinDialogue4.addStep("You can throw your own wayyyyyy 🎵", CoachList.betsy);
        //5
        betsyWinDialogue5.addStep("Goodnight, Throwdown! There will be no encore.", CoachList.betsy);

        //lose
        //1
        betsyLoseDialogue1.addStep("You give throwdown...a bad name! (bad name!) 🎵", CoachList.betsy);
        //2
        betsyLoseDialogue2.addStep("This is gonna ruin the tour.", CoachList.betsy);
        betsyLoseDialogue2.addStep(["What tour?"], CoachList.you);
        betsyLoseDialogue2.addStep("The WORLD throwdown tour!", CoachList.betsy);
        //3
        betsyLoseDialogue3.addStep("Your turbs are out of sync!", CoachList.betsy);
    }

    public initializeCoreeDialogue(): void {
        const coreeIntroDialogue1 = new DialogueConversation();
        const coreeIntroDialogue2 = new DialogueConversation();
        const coreeIntroDialogue3 = new DialogueConversation();

        const coreeWinDialogue1 = new DialogueConversation();
        const coreeWinDialogue2 = new DialogueConversation();
        const coreeWinDialogue3 = new DialogueConversation();

        const coreeLoseDialogue1 = new DialogueConversation();
        const coreeLoseDialogue2 = new DialogueConversation();
        const coreeLoseDialogue3 = new DialogueConversation();

        DialogueStorage.coreeDialogue.getIntroDialogueList().push(coreeIntroDialogue1);
        DialogueStorage.coreeDialogue.getIntroDialogueList().push(coreeIntroDialogue2);
        DialogueStorage.coreeDialogue.getIntroDialogueList().push(coreeIntroDialogue3);

        DialogueStorage.coreeDialogue.getWinDialogueList().push(coreeWinDialogue1);
        DialogueStorage.coreeDialogue.getWinDialogueList().push(coreeWinDialogue2);
        DialogueStorage.coreeDialogue.getWinDialogueList().push(coreeWinDialogue3);

        DialogueStorage.coreeDialogue.getLoseDialogueList().push(coreeLoseDialogue1);
        DialogueStorage.coreeDialogue.getLoseDialogueList().push(coreeLoseDialogue2);
        DialogueStorage.coreeDialogue.getLoseDialogueList().push(coreeLoseDialogue3);

        //intro
        //1
        coreeIntroDialogue1.addStep("I AM THE CONTRACTUALLY OBLIGATED ROBOT ELECTRIC ENEMY.", CoachList.coree, "???");
        coreeIntroDialogue1.addStep(["COREE for short?", "I release thee of thy contract!", "COREE, generate a portrait of me winning this match."], CoachList.you);
        coreeIntroDialogue1.addStep("DOES NOT COMPUTE.", CoachList.coree);
        //2
        coreeIntroDialogue2.addStep("I am C.O.R.E.E. I can put my arm back on. You can't. So dodge safe.", CoachList.coree);
        //3
        coreeIntroDialogue3.addStep("I HAVE A HEART OF GOLD. FOR SUPERIOR CONDUCTIVITY.", CoachList.coree);

        //win
        //1
        coreeWinDialogue1.addStep("BLAME IT ON THE BIT FLIP.", CoachList.coree);
        //2
        coreeWinDialogue2.addStep("TELL BOSS 8 I REFUTE HIS PATERNITY CLAIMS.", CoachList.coree);
        //3
        coreeWinDialogue3.addStep("GAME OVER. USER WINS.", CoachList.coree);

        //lose
        //1
        coreeLoseDialogue1.addStep("YOU FORGOT ABOUT THE 4TH E OF THROWDOWN. EXTERMINATE.", CoachList.coree);
        //2
        coreeLoseDialogue2.addStep("COREE, override the player loss flag!", CoachList.you);
        coreeLoseDialogue2.addStep("I'm sorry ${YOU}, I'm afraid I can't do that", CoachList.coree);
        //3
        coreeLoseDialogue3.addStep("I REGRET TO INFORM YOU AUTOMATION MODE HAS STATISTICALLY MADE BETTER CARD CHOICES", CoachList.coree);
    }

    public initializeTurbonerdDialogue(): void {
        const turbonerdIntroDialogue1 = new DialogueConversation();
        const turbonerdIntroDialogue2 = new DialogueConversation();
        const turbonerdIntroDialogue3 = new DialogueConversation();

        const turbonerdWinDialogue1 = new DialogueConversation();
        const turbonerdWinDialogue2 = new DialogueConversation();
        const turbonerdWinDialogue3 = new DialogueConversation();

        const turbonerdLoseDialogue1 = new DialogueConversation();
        const turbonerdLoseDialogue2 = new DialogueConversation();
        const turbonerdLoseDialogue3 = new DialogueConversation();

        DialogueStorage.turbonerdDialogue.getIntroDialogueList().push(turbonerdIntroDialogue1);
        DialogueStorage.turbonerdDialogue.getIntroDialogueList().push(turbonerdIntroDialogue2);
        DialogueStorage.turbonerdDialogue.getIntroDialogueList().push(turbonerdIntroDialogue3);

        DialogueStorage.turbonerdDialogue.getWinDialogueList().push(turbonerdWinDialogue1);
        DialogueStorage.turbonerdDialogue.getWinDialogueList().push(turbonerdWinDialogue2);
        DialogueStorage.turbonerdDialogue.getWinDialogueList().push(turbonerdWinDialogue3);

        DialogueStorage.turbonerdDialogue.getLoseDialogueList().push(turbonerdLoseDialogue1);
        DialogueStorage.turbonerdDialogue.getLoseDialogueList().push(turbonerdLoseDialogue2);
        DialogueStorage.turbonerdDialogue.getLoseDialogueList().push(turbonerdLoseDialogue3);

        //intro
        //1
        turbonerdIntroDialogue1.addStep("...if my calculations are correct, you're the new coach around here.", CoachList.turbonerd, "???");
        turbonerdIntroDialogue1.addStep(["...what's it to you, NERD?", "...you needed a calculator for that?", "...did you get lost on your way to the computer lab?"], CoachList.you);
        turbonerdIntroDialogue1.addStep("...typical insults. Haven't you heard that nerds rule the world?", CoachList.turbonerd);
        turbonerdIntroDialogue1.addStep(["Yeah I have questions about that. What universe is this?", "They don't rule mine.", "This is TURBO THROWDOWN. Not Nerdo...slow down. Yeah."], CoachList.you);
        turbonerdIntroDialogue1.addStep("Enough flavour text. LET US THROW OUR BALLS DOWN. ...the court.", CoachList.turbonerd);
        //2
        turbonerdIntroDialogue2.addStep("What is the mean air velocity of an unladen turbo throw?", CoachList.turbonerd);
        //3
        turbonerdIntroDialogue3.addStep("Excelsior!", CoachList.turbonerd);

        //win
        //1
        turbonerdWinDialogue1.addStep("You have won my grudging respect. But beware! Your mind is strong, but the final coach may test its limits", CoachList.turbonerd);
        turbonerdWinDialogue1.addStep(["...are they really smart?"], CoachList.you);
        turbonerdWinDialogue1.addStep("More like really meta.", CoachList.turbonerd);
        //2
        turbonerdWinDialogue2.addStep("...that was worse than a turbo-wedgie!", CoachList.turbonerd);
        //3
        turbonerdWinDialogue3.addStep("while(currentDialogueNum >= lastTurboNerdDialogue) { return win3phrase; }", CoachList.turbonerd);

        //lose
        //1
        turbonerdLoseDialogue1.addStep("Too much Fortnite and not enough Slay the Spire!", CoachList.turbonerd);
        //2
        turbonerdLoseDialogue2.addStep("...if you see COREE, tell them I set their server room up nice.", CoachList.turbonerd);
        //3
        turbonerdLoseDialogue3.addStep("Another epic loss! ...I could point you to the source code if you want the proverbial cheat codes?", CoachList.turbonerd);
    }

    public initializeShadowkenDialogue(): void {
        const shadowkenIntroDialogue1 = new DialogueConversation();
        const shadowkenIntroDialogue2 = new DialogueConversation();
        const shadowkenIntroDialogue3 = new DialogueConversation();

        const shadowkenWinDialogue1 = new DialogueConversation();
        const shadowkenWinDialogue2 = new DialogueConversation();
        const shadowkenWinDialogue3 = new DialogueConversation();

        const shadowkenLoseDialogue1 = new DialogueConversation();
        const shadowkenLoseDialogue2 = new DialogueConversation();
        const shadowkenLoseDialogue3 = new DialogueConversation();

        DialogueStorage.shadowkenDialogue.getIntroDialogueList().push(shadowkenIntroDialogue1);
        DialogueStorage.shadowkenDialogue.getIntroDialogueList().push(shadowkenIntroDialogue2);
        DialogueStorage.shadowkenDialogue.getIntroDialogueList().push(shadowkenIntroDialogue3);

        DialogueStorage.shadowkenDialogue.getWinDialogueList().push(shadowkenWinDialogue1);
        DialogueStorage.shadowkenDialogue.getWinDialogueList().push(shadowkenWinDialogue2);
        DialogueStorage.shadowkenDialogue.getWinDialogueList().push(shadowkenWinDialogue3);

        DialogueStorage.shadowkenDialogue.getLoseDialogueList().push(shadowkenLoseDialogue1);   
        DialogueStorage.shadowkenDialogue.getLoseDialogueList().push(shadowkenLoseDialogue2);
        DialogueStorage.shadowkenDialogue.getLoseDialogueList().push(shadowkenLoseDialogue3);

        //intro
        //1
        shadowkenIntroDialogue1.addStep("Welcome to the Mojo Dojo Throwdown Court!", CoachList.shadowken, "???");
        shadowkenIntroDialogue1.addStep(["Yeah I've been here a while already, thanks.", "Your vibe seems a little...confused.", "...thank you. Is this over yet?"], CoachList.you);
        shadowkenIntroDialogue1.addStep("My job is TURBO. Your job will be LOSE!", CoachList.shadowken);
        //2
        shadowkenIntroDialogue2.addStep("People keep asking me about Street Fighter? I don't get it.", CoachList.shadowken);
        //3
        shadowkenIntroDialogue3.addStep("Come on in, I'll play THROWBALL at you", CoachList.shadowken);

        //win
        //1
        shadowkenWinDialogue1.addStep("...but I came equipped with all the ninja accessories!", CoachList.shadowken);
        //2
        shadowkenWinDialogue2.addStep("This is all because the other coaches rejected my suggestion for a Kenergy upgrade!", CoachList.shadowken);
        //3
        shadowkenWinDialogue3.addStep("🎵 Any other dojo I'd be Boss 10 🎵", CoachList.shadowken);

        //lose
        //1
        shadowkenLoseDialogue1.addStep("Glad it's over, I have a hair appointment anyway.", CoachList.shadowken);
        //2
        shadowkenLoseDialogue2.addStep("...to be honest, when I found out Turbo Throwdown wasn't just about ninjas, I almost lost interest.", CoachList.shadowken);
        //3
        shadowkenLoseDialogue3.addStep("Fact: ninjas are mammals.", CoachList.shadowken);
    }

    public initializeBoss10Dialogue(): void {
        const boss10IntroDialogue1 = new DialogueConversation();
        const boss10IntroDialogue2 = new DialogueConversation();
        const boss10IntroDialogue3 = new DialogueConversation();
        
        const boss10WinDialogue1 = new DialogueConversation();
        const boss10WinDialogue2 = new DialogueConversation();
        const boss10WinDialogue3 = new DialogueConversation();

        const boss10LoseDialogue1 = new DialogueConversation();
        const boss10LoseDialogue2 = new DialogueConversation();
        const boss10LoseDialogue3 = new DialogueConversation();

        DialogueStorage.boss10Dialogue.getIntroDialogueList().push(boss10IntroDialogue1);
        DialogueStorage.boss10Dialogue.getIntroDialogueList().push(boss10IntroDialogue2);
        DialogueStorage.boss10Dialogue.getIntroDialogueList().push(boss10IntroDialogue3);

        DialogueStorage.boss10Dialogue.getWinDialogueList().push(boss10WinDialogue1);
        DialogueStorage.boss10Dialogue.getWinDialogueList().push(boss10WinDialogue2);
        DialogueStorage.boss10Dialogue.getWinDialogueList().push(boss10WinDialogue3);

        DialogueStorage.boss10Dialogue.getLoseDialogueList().push(boss10LoseDialogue1);
        DialogueStorage.boss10Dialogue.getLoseDialogueList().push(boss10LoseDialogue2);
        DialogueStorage.boss10Dialogue.getLoseDialogueList().push(boss10LoseDialogue3);

        //intro
        //1
        boss10IntroDialogue1.addStep("So you've arrived.", CoachList.boss10, "???");
        boss10IntroDialogue1.addStep(["Are you the last boss?", "...I've arrived to THROW. DOWN.", "Let's wrap this up, I'm late for music bingo."], CoachList.you);
        boss10IntroDialogue1.addStep("Fun fact - my responses are fixed. So is this game. You can't win.", CoachList.boss10);
        boss10IntroDialogue1.addStep(["Game?", "Game?", "Game?"], CoachList.you);
        boss10IntroDialogue1.addStep("It's all just a game. One that you're about to lose, PLAYER.", CoachList.boss10);
        //2
        boss10IntroDialogue2.addStep("What upgrades did you pick this time?", CoachList.boss10);
        //3
        boss10IntroDialogue3.addStep("You're seriously still playing this?", CoachList.boss10);

        //win
        //1
        boss10WinDialogue1.addStep("How many dated references did you clock?", CoachList.boss10);
        //2
        boss10WinDialogue2.addStep("Sorry, there aren't any additional unlocks.", CoachList.boss10);
        //3
        boss10WinDialogue3.addStep("<<dialogue placeholder>>", CoachList.boss10);

        //lose
        //1
        boss10LoseDialogue1.addStep("You expected this slap-dash deckbuilder to be balanced?", CoachList.boss10);
        //2
        boss10LoseDialogue2.addStep("For all you know, a flag in the code is making me invincible.", CoachList.boss10);
        //3
        boss10LoseDialogue3.addStep("...do you like my hair?", CoachList.boss10);
    }

    public initializeMissingDialogue(): void {
        const missingIntroDialogue1 = new DialogueConversation();
        const missingWinDialogue1 = new DialogueConversation();
        const missingLoseDialogue1 = new DialogueConversation();

        DialogueStorage.missingDialogue.getIntroDialogueList().push(missingIntroDialogue1);
        DialogueStorage.missingDialogue.getWinDialogueList().push(missingWinDialogue1);
        DialogueStorage.missingDialogue.getLoseDialogueList().push(missingLoseDialogue1);

        missingIntroDialogue1.addStep("placeholder", CoachList.you);
        missingWinDialogue1.addStep("placeholder", CoachList.you);
        missingLoseDialogue1.addStep("placeholder", CoachList.you);
    }

    public initializeMissingDialogueConversation(): void {
        DialogueStorage.missingDialogueConversation.addStep("placeholder", CoachList.you);
    }

    public warnIfMissingDialogue(coachDialogue: CoachDialogue, coach: string): void {

        if (coachDialogue.getIntroDialogueList().length === 0) {
            log("Dialogue missing for " + coach + " Intro Dialogue");
        }
        coachDialogue.getIntroDialogueList().forEach((dialogue: DialogueConversation) => {
            if (dialogue.getSteps().length === 0) {
                log("Dialogue missing for " + coach + " Intro Dialogue");
            }
        });

        if (coachDialogue.getWinDialogueList().length === 0) {
            log("Dialogue missing for " + coach + " Win Dialogue");
        }
        coachDialogue.getWinDialogueList().forEach((dialogue: DialogueConversation) => {
            if (dialogue.getSteps().length === 0) {
                log("Dialogue missing for " + coach + " Win Dialogue");
            }
        });

        if (coachDialogue.getLoseDialogueList().length === 0) {
            log("Dialogue missing for " + coach + " Lose Dialogue");
        }
        coachDialogue.getLoseDialogueList().forEach((dialogue: DialogueConversation) => {
            if (dialogue.getSteps().length === 0) {
                log("Dialogue missing for " + coach + " Lose Dialogue");
            }
        });
    }

    private static dialogueMapping: { [key: string]: CoachDialogue } = {
        primo: DialogueStorage.primoDialogue,
        sporticus: DialogueStorage.sporticusDialogue,
        tycoon: DialogueStorage.tycoonDialogue,
        office: DialogueStorage.officeDialogue,
        sgtsteve: DialogueStorage.sgtsteveDialogue,
        betsy: DialogueStorage.betsyDialogue,
        coree: DialogueStorage.coreeDialogue,
        turbonerd: DialogueStorage.turbonerdDialogue,
        shadowken: DialogueStorage.shadowkenDialogue,
        boss10: DialogueStorage.boss10Dialogue,
        missing: DialogueStorage.missingDialogue
    };

    public static async saveDialogues() {
        for (const key in this.dialogueMapping) {
            if (this.dialogueMapping.hasOwnProperty(key)) {
                await StorageManager.saveDialogue(key, this.dialogueMapping[key]);
            }
        }
    }

    public static async loadDialogues() {
        for (const key in this.dialogueMapping) {
            if (this.dialogueMapping.hasOwnProperty(key)) {
                const data = await StorageManager.loadDialogue(key);
                if (data) {
                    this.dialogueMapping[key].setCurrentIntroDialogue(data.currentIntroDialogue);
                    this.dialogueMapping[key].setCurrentWinDialogue(data.currentWinDialogue);
                    this.dialogueMapping[key].setCurrentLoseDialogue(data.currentLoseDialogue);
                } else {
                    this.dialogueMapping[key].setCurrentIntroDialogue(0);
                    this.dialogueMapping[key].setCurrentWinDialogue(0);
                    this.dialogueMapping[key].setCurrentLoseDialogue(0);
                }
            }
        }
    }
}

