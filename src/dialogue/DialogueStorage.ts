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
        DialogueStorage.firstSpiritDialogue.addStep("My child. Do not despair. Choose a consolationnn I mean participation trophy and continue thy quest.", CoachList.spirit, "???");
        DialogueStorage.firstSpiritDialogue.addStep(["Can I go home instead?", "How do I beat the gym bosses?", "I'm gonna turbo-slice that (insert non-offensive 80s insult here)"], CoachList.you);
        DialogueStorage.firstSpiritDialogue.addStep("All will be revealed... in time... ", CoachList.spirit);
    }

    public initializeFinalDialogue(): void {
        DialogueStorage.finalDialogue.addStep("It was all a dream.", CoachList.you);
    }

    public initializePrimoDialogue(): void {
        log("Initializing Primo Dialogue");
        const primoIntroDialogue1 = new DialogueConversation();
        const primoIntroDialogue2 = new DialogueConversation();
        const primoWinDialogue1 = new DialogueConversation();
        const primoWinDialogue2 = new DialogueConversation();
        const primoWinDialogue3 = new DialogueConversation();
        const primoLoseDialogue1 = new DialogueConversation();
        const primoLoseDialogue2 = new DialogueConversation();

        DialogueStorage.primoDialogue.getIntroDialogueList().push(primoIntroDialogue1);
        DialogueStorage.primoDialogue.getIntroDialogueList().push(primoIntroDialogue2);
        DialogueStorage.primoDialogue.getWinDialogueList().push(primoWinDialogue1);
        DialogueStorage.primoDialogue.getWinDialogueList().push(primoWinDialogue2);
        DialogueStorage.primoDialogue.getWinDialogueList().push(primoWinDialogue3);
        DialogueStorage.primoDialogue.getLoseDialogueList().push(primoLoseDialogue1);
        DialogueStorage.primoDialogue.getLoseDialogueList().push(primoLoseDialogue2);

        //Intro Dialogue
        //1
        primoIntroDialogue1.addStep("You step into the gym for an ordinary day of sick gains when...", CoachList.you);
        primoIntroDialogue1.addStep(["What...?", "Huh...?"], CoachList.you);
        primoIntroDialogue1.addStep("A portal appears and sucks you in!", CoachList.you);
        primoIntroDialogue1.addStep("It still _looks_ like the local gym, but everything is strange and neon!", CoachList.you)
        primoIntroDialogue1.addStep("I am Primo Firstman. Are you here to throwdown?", CoachList.primo, "???");
        primoIntroDialogue1.addStep(["What?"], CoachList.you);
        primoIntroDialogue1.addStep("In other words, are you asking for a CHALLENGE?", CoachList.primo);
        primoIntroDialogue1.addStep(["Throwdown as in... fight?", "I'm just here for sick gains, bro", "Prepare to be TURBO THRASHED!"], CoachList.you);
        primoIntroDialogue1.addStep("Hahahahaha. Then prepare your team and let us BEGIN.", CoachList.primo);
        primoIntroDialogue1.addStep("Hey kid, wait!", CoachList.coach);
        primoIntroDialogue1.addStep(["Who?", "What?", "I'm 37"], CoachList.you);
        primoIntroDialogue1.addStep("I know a rookie when I see one. Come find me in the corner and I'll give you some pointers.", CoachList.coach);
        primoIntroDialogue1.addStep(["Pointers for what? My aerobics class?", "I don't need anyone's help, old man", "Sure, I'll ask you how to “throw down” or whatever"], CoachList.you);
        // primoIntroDialogue1.addStep(`You'll change your tune when these gym bosses turbo-thrash you, kid. Here, watch this tutor-reel:
        //     \nDraw 5 cards, then select a card, assign it to a player, and if it's an attack, select an opponent. When you're ready, THROW DOWN!
        //     \nYour initial deck has THROW, BLOCK, EVADE, and CATCH cards. Test them out and see what they do!`, CoachList.coach);
        // primoIntroDialogue1.addStep(`Alright kid, that's the tutor-reel. And if you're not sure what to do out there, just remember the three rules of Throwdown:
        //     \n* Evasion
        //     \n* Envision - You gotta see victory in your brain 
        //     \n* Evasion again in case you forgot`, CoachList.coach);
        // primoIntroDialogue1.addStep(["Thanks coach!", "Coach? You literally just put on a video", "I guess I have no choice but to “throw down”"], CoachList.you);
        //2
        primoIntroDialogue2.addStep("You're back at the strange gym.", CoachList.you);

        //Win Dialogue Primo
        //1
        primoWinDialogue1.addStep("Waaaah! I got turbo-thrashed!", CoachList.primo);
        primoWinDialogue1.addStep(["More like Primo WORSTman", "Yayyyy can I go home now?"], CoachList.you);
        primoWinDialogue1.addStep("Ya did it, kid! Only 9 more gym bosses to go!", CoachList.coach);
        primoWinDialogue1.addStep(["Nine?", "I told you, I'm not a kid.", "TURBO-SLICED!!!!"], CoachList.you);
        //2
        primoWinDialogue2.addStep("Turbo-thrashed again!", CoachList.primo);
        //3
        primoWinDialogue3.addStep("I better learn some new moves", CoachList.primo);
        //Lose Dialogue Primo
        //1
        primoLoseDialogue1.addStep("Don't mess with the best! The best being me and of course all the other bosses who occupy a more enviable position in this gym.", CoachList.primo);
        //2
        primoLoseDialogue2.addStep("How does LAST feel... 'cause first feels great! ‘Cause Primo means first. In case that wasn't clear. Before.", CoachList.primo);
        //3primoLoseDialogue3.addStep("Being FIRST comes easy to me!", CoachList.primo);
    }

    public initializeSporticusDialogue(): void {
        const sporticusIntroDialogue1 = new DialogueConversation();
        const sporticusIntroDialogue2 = new DialogueConversation();
        const sporticusWinDialogue1 = new DialogueConversation();
        const sporticusWinDialogue2 = new DialogueConversation();
        const sporticusLoseDialogue1 = new DialogueConversation();
        const sporticusLoseDialogue2 = new DialogueConversation();

        DialogueStorage.sporticusDialogue.getIntroDialogueList().push(sporticusIntroDialogue1);
        DialogueStorage.sporticusDialogue.getIntroDialogueList().push(sporticusIntroDialogue2);
        DialogueStorage.sporticusDialogue.getWinDialogueList().push(sporticusWinDialogue1);
        DialogueStorage.sporticusDialogue.getWinDialogueList().push(sporticusWinDialogue2);
        DialogueStorage.sporticusDialogue.getLoseDialogueList().push(sporticusLoseDialogue1);
        DialogueStorage.sporticusDialogue.getLoseDialogueList().push(sporticusLoseDialogue2);

        //intro
        //1
        sporticusIntroDialogue1.addStep("I am Sporticus!!", CoachList.sporticus, "???");
        sporticusIntroDialogue1.addStep(["No, I am Sporticus!", "....'cause Sports?", "I am 37."], CoachList.you);
        //2
        sporticusIntroDialogue2.addStep("Let the battle be THROWN!", CoachList.sporticus);

        //win
        //1
        sporticusWinDialogue1.addStep("By the tender tendon of Achilles! I lost!", CoachList.sporticus);
        //2
        sporticusWinDialogue2.addStep("Et Tu, Coach?", CoachList.sporticus);

        //lose
        //1
        sporticusLoseDialogue1.addStep("Your team should've worn better protection! Might I suggest the Trojan method?", CoachList.sporticus);
        sporticusLoseDialogue1.addStep("Rome wasn't thrown down in a day.", CoachList.sporticus);


    }

    public initializeTycoonDialogue(): void {  
        const tycoonIntroDialogue1 = new DialogueConversation();
        const tycoonIntroDialogue2 = new DialogueConversation();
        const tycoonIntroDialogue3 = new DialogueConversation();
        const tycoonWinDialogue1 = new DialogueConversation();
        const tycoonWinDialogue2 = new DialogueConversation();
        const tycoonLoseDialogue1 = new DialogueConversation();
        const tycoonLoseDialogue2 = new DialogueConversation();

        DialogueStorage.tycoonDialogue.getIntroDialogueList().push(tycoonIntroDialogue1);
        DialogueStorage.tycoonDialogue.getIntroDialogueList().push(tycoonIntroDialogue2);
        DialogueStorage.tycoonDialogue.getIntroDialogueList().push(tycoonIntroDialogue3);
        DialogueStorage.tycoonDialogue.getWinDialogueList().push(tycoonWinDialogue1);
        DialogueStorage.tycoonDialogue.getWinDialogueList().push(tycoonWinDialogue2);
        DialogueStorage.tycoonDialogue.getLoseDialogueList().push(tycoonLoseDialogue1);
        DialogueStorage.tycoonDialogue.getLoseDialogueList().push(tycoonLoseDialogue2);

        //intro
        //1
        tycoonIntroDialogue1.addStep("I say, old bean! Shall we have a sporting match of sports match?", CoachList.tycoon, "???");
        tycoonIntroDialogue1.addStep(["I thought it was called Turbo Throwdown?", "How... are you a gym coach exactly?", "I'm 37, I'm not old"], CoachList.you);
        tycoonIntroDialogue1.addStep("Hahahaha, capital!", CoachList.tycoon);
        //2
        tycoonIntroDialogue2.addStep("I used to coach croquet, but alas, it's so passé!", CoachList.tycoon);
        //3
        tycoonIntroDialogue3.addStep("...so I told them a pair would be called a binocle but did they listen to me? Nooooo... ", CoachList.tycoon);

        //win
        //1
        tycoonWinDialogue1.addStep("Curses! I didn't wax my balls enough!", CoachList.tycoon);
        //2
        tycoonWinDialogue2.addStep("Zounds and turbo-zounds!", CoachList.tycoon);

        //lose
        //1
        tycoonLoseDialogue1.addStep("Capital match, old bean!", CoachList.tycoon);
        //2
        tycoonLoseDialogue2.addStep("Do say hello to the spirit coach for me, won't you?", CoachList.tycoon);

    }

    public initializeOfficeDialogue(): void {
        const officeIntroDialogue1 = new DialogueConversation();
        const officeWinDialogue1 = new DialogueConversation();
        const officeLoseDialogue1 = new DialogueConversation();

        DialogueStorage.officeDialogue.getIntroDialogueList().push(officeIntroDialogue1);
        DialogueStorage.officeDialogue.getWinDialogueList().push(officeWinDialogue1);
        DialogueStorage.officeDialogue.getLoseDialogueList().push(officeLoseDialogue1);

        //intro
        //1
        officeIntroDialogue1.addStep("placeholder", CoachList.office, "???");

        //win
        //1
        officeWinDialogue1.addStep("This will reflect well in your performance review", CoachList.office);
        officeWinDialogue1.addStep(["You're not the boss of me", "Whatever, Shoulderpads.", "Thanks, Boss"], CoachList.you);

        //lose
        //1
        officeLoseDialogue1.addStep("You forgot about the AGILE method. Always Give In (to) Leg Energy!", CoachList.office);
    }

    public initializeSgtsteveDialogue(): void {
        const sgtsteveIntroDialogue1 = new DialogueConversation();
        const sgtsteveWinDialogue1 = new DialogueConversation();
        const sgtsteveWinDialogue2 = new DialogueConversation();
        const sgtsteveLoseDialogue1 = new DialogueConversation();

        DialogueStorage.sgtsteveDialogue.getIntroDialogueList().push(sgtsteveIntroDialogue1);
        DialogueStorage.sgtsteveDialogue.getWinDialogueList().push(sgtsteveWinDialogue1);
        DialogueStorage.sgtsteveDialogue.getWinDialogueList().push(sgtsteveWinDialogue2);
        DialogueStorage.sgtsteveDialogue.getLoseDialogueList().push(sgtsteveLoseDialogue1);

        //intro
        //1
        sgtsteveIntroDialogue1.addStep("Throwdown is my business, and business is good!", CoachList.sgtsteve, "???");

        //win
        //1
        sgtsteveWinDialogue1.addStep("This was your finest five minutes", CoachList.sgtsteve);
        //2
        sgtsteveWinDialogue2.addStep("The greatest victory is that which requires no balls.", CoachList.sgtsteve);
        
        //lose
        //1
        sgtsteveLoseDialogue1.addStep("Nothing can stop the throwing of balls except other balls", CoachList.sgtsteve);
    }

    public initializeBetsyDialogue(): void {
        const betsyIntroDialogue1 = new DialogueConversation();
        const betsyWinDialogue1 = new DialogueConversation();
        const betsyLoseDialogue1 = new DialogueConversation();

        DialogueStorage.betsyDialogue.getIntroDialogueList().push(betsyIntroDialogue1);
        DialogueStorage.betsyDialogue.getWinDialogueList().push(betsyWinDialogue1);
        DialogueStorage.betsyDialogue.getLoseDialogueList().push(betsyLoseDialogue1);

        //intro
        //1
        betsyIntroDialogue1.addStep("placeholder", CoachList.betsy, "???");

        //win
        //1
        betsyWinDialogue1.addStep("placeholder", CoachList.betsy);

        //lose
        //1
        betsyLoseDialogue1.addStep("placeholder", CoachList.betsy);
    }

    public initializeCoreeDialogue(): void {
        const coreeIntroDialogue1 = new DialogueConversation();
        const coreeWinDialogue1 = new DialogueConversation();
        const coreeLoseDialogue1 = new DialogueConversation();

        DialogueStorage.coreeDialogue.getIntroDialogueList().push(coreeIntroDialogue1);
        DialogueStorage.coreeDialogue.getWinDialogueList().push(coreeWinDialogue1);
        DialogueStorage.coreeDialogue.getLoseDialogueList().push(coreeLoseDialogue1);

        //intro
        //1
        coreeIntroDialogue1.addStep("I AM THE CONTRACTUALLY OBLIGATED ROBOT ELECTRIC ENEMY.", CoachList.coree, "???");

        //win
        //1
        coreeWinDialogue1.addStep("C.O.R.E.E: DOES NOT COMPUTE.", CoachList.coree);

        //lose
        //1
        coreeLoseDialogue1.addStep("YOU FORGOT ABOUT THE 4TH E OF THROWDOWN. EXTERMINATE.", CoachList.coree);
    }

    public initializeTurbonerdDialogue(): void {
        const turbonerdIntroDialogue1 = new DialogueConversation();
        const turbonerdWinDialogue1 = new DialogueConversation();
        const turbonerdLoseDialogue1 = new DialogueConversation();

        DialogueStorage.turbonerdDialogue.getIntroDialogueList().push(turbonerdIntroDialogue1);
        DialogueStorage.turbonerdDialogue.getWinDialogueList().push(turbonerdWinDialogue1);
        DialogueStorage.turbonerdDialogue.getLoseDialogueList().push(turbonerdLoseDialogue1);

        //intro
        //1
        turbonerdIntroDialogue1.addStep("placeholder", CoachList.turbonerd, "???");

        //win
        //1
        turbonerdWinDialogue1.addStep("placeholder", CoachList.turbonerd);

        //lose
        //1
        turbonerdLoseDialogue1.addStep("placeholder", CoachList.turbonerd);
    }

    public initializeShadowkenDialogue(): void {
        const shadowkenIntroDialogue1 = new DialogueConversation();
        const shadowkenWinDialogue1 = new DialogueConversation();
        const shadowkenLoseDialogue1 = new DialogueConversation();

        DialogueStorage.shadowkenDialogue.getIntroDialogueList().push(shadowkenIntroDialogue1);
        DialogueStorage.shadowkenDialogue.getWinDialogueList().push(shadowkenWinDialogue1);
        DialogueStorage.shadowkenDialogue.getLoseDialogueList().push(shadowkenLoseDialogue1);

        //intro
        //1
        shadowkenIntroDialogue1.addStep("placeholder", CoachList.shadowken, "???");

        //win
        //1
        shadowkenWinDialogue1.addStep("placeholder", CoachList.shadowken);

        //lose
        //1
        shadowkenLoseDialogue1.addStep("placeholder", CoachList.shadowken);
    }

    public initializeBoss10Dialogue(): void {
        const boss10IntroDialogue1 = new DialogueConversation();
        const boss10IntroDialogue2 = new DialogueConversation();
        const boss10IntroDialogue3 = new DialogueConversation();
        const boss10WinDialogue1 = new DialogueConversation();
        const boss10WinDialogue2 = new DialogueConversation();
        const boss10LoseDialogue1 = new DialogueConversation();

        DialogueStorage.boss10Dialogue.getIntroDialogueList().push(boss10IntroDialogue1);
        DialogueStorage.boss10Dialogue.getIntroDialogueList().push(boss10IntroDialogue2);
        DialogueStorage.boss10Dialogue.getIntroDialogueList().push(boss10IntroDialogue3);
        DialogueStorage.boss10Dialogue.getWinDialogueList().push(boss10WinDialogue1);
        DialogueStorage.boss10Dialogue.getWinDialogueList().push(boss10WinDialogue2);
        DialogueStorage.boss10Dialogue.getLoseDialogueList().push(boss10LoseDialogue1);

        //intro
        //1
        boss10IntroDialogue1.addStep("So you've arrived.", CoachList.boss10, "???");
        boss10IntroDialogue1.addStep(["Are you the last boss?"], CoachList.you);
        boss10IntroDialogue1.addStep("Fun fact - my responses are fixed. So is this game. You can't win.", CoachList.boss10);
        boss10IntroDialogue1.addStep(["Game?", "Game?", "Game?"], CoachList.you);
        boss10IntroDialogue1.addStep("It's all just a game. One that you're about to lose, PLAYER.", CoachList.boss10);
        //2
        boss10IntroDialogue2.addStep("What upgrades did you pick this time?", CoachList.boss10);
        //3
        boss10IntroDialogue3.addStep("You're seriously still playing this?", CoachList.boss10);

        //win
        //1
        boss10WinDialogue1.addStep("Looks like you've unlocked Eternal Mode. Whoop-dee-f...", CoachList.boss10);
        //2
        boss10WinDialogue2.addStep("Sorry, there aren't any additional unlocks.", CoachList.boss10);

        //lose
        //1
        boss10LoseDialogue1.addStep("placeholder", CoachList.boss10);
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

