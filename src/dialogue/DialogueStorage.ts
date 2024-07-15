import { CoachList } from '../throwdown/CoachList';
import { CoachDialogue } from './CoachDialogue';
import { DialogueConversation, DialogueStep } from './Dialogue';
import { StorageManager } from '../utilities/StorageManager';
import { log } from "../utilities/GameUtils";

export class DialogueStorage {

    public static primoDialogue: CoachDialogue = new CoachDialogue();
    public static sporticusDialogue: CoachDialogue = new CoachDialogue();
    public static russDialogue: CoachDialogue = new CoachDialogue();
    public static bossDialogue: CoachDialogue = new CoachDialogue();
    public static steveDialogue: CoachDialogue = new CoachDialogue();
    public static betsyDialogue: CoachDialogue = new CoachDialogue();
    public static coreeDialogue: CoachDialogue = new CoachDialogue();
    public static turboDialogue: CoachDialogue = new CoachDialogue();
    public static shadowDialogue: CoachDialogue = new CoachDialogue();
    public static boss10Dialogue: CoachDialogue = new CoachDialogue();
    public static missingDialogue: CoachDialogue = new CoachDialogue();
    public static missingDialogueConversation: DialogueConversation = new DialogueConversation();
    public static missingDialogueStep: DialogueStep = new DialogueStep("placeholder", CoachList.you);

    public constructor() {
        this.initializePrimoDialogue();
        this.initializeSporticusDialogue();
        this.initializeRussDialogue();
        this.initializeBossDialogue();
        this.initializeSteveDialogue();
        this.initializeBetsyDialogue();
        this.initializeCoreeDialogue();
        this.initializeTurboDialogue();
        this.initializeShadowDialogue();
        this.initializeBoss10Dialogue();
        this.initializeMissingDialogue();
        this.initializeMissingDialogueConversation();

        this.warnIfMissingDialogue(DialogueStorage.primoDialogue, "primo");
        this.warnIfMissingDialogue(DialogueStorage.sporticusDialogue, "sporticus");
        this.warnIfMissingDialogue(DialogueStorage.russDialogue, "russ");
        this.warnIfMissingDialogue(DialogueStorage.bossDialogue, "boss");
        this.warnIfMissingDialogue(DialogueStorage.steveDialogue, "steve");
        this.warnIfMissingDialogue(DialogueStorage.betsyDialogue, "betsy");
        this.warnIfMissingDialogue(DialogueStorage.coreeDialogue, "coree");
        this.warnIfMissingDialogue(DialogueStorage.turboDialogue, "turbo");
        this.warnIfMissingDialogue(DialogueStorage.shadowDialogue, "shadow");
        this.warnIfMissingDialogue(DialogueStorage.boss10Dialogue, "boss10");
    }

    public initializePrimoDialogue(): void {
        const primoIntroDialogue1 = new DialogueConversation();
        const primoIntroDialogue2 = new DialogueConversation();
        const primoWinDialogue1 = new DialogueConversation();
        const primoWinDialogue2 = new DialogueConversation();
        const primoLoseDialogue1 = new DialogueConversation();
        const primoLoseDialogue2 = new DialogueConversation();

        DialogueStorage.primoDialogue.getIntroDialogueList().push(primoIntroDialogue1);
        DialogueStorage.primoDialogue.getIntroDialogueList().push(primoIntroDialogue2);
        DialogueStorage.primoDialogue.getWinDialogueList().push(primoWinDialogue1);
        DialogueStorage.primoDialogue.getWinDialogueList().push(primoWinDialogue2);
        DialogueStorage.primoDialogue.getLoseDialogueList().push(primoLoseDialogue1);
        DialogueStorage.primoDialogue.getLoseDialogueList().push(primoLoseDialogue2);

        //Intro Dialogue
        primoIntroDialogue1.addStep("You step into the gym for an ordinary day of sick gains when...", CoachList.you);
        primoIntroDialogue1.addStep(["What...?"], CoachList.you);
        primoIntroDialogue1.addStep("A portal appears and sucks you in!", CoachList.you);
        primoIntroDialogue2.addStep("You're back at the strange gym.", CoachList.you);
        // primoIntroDialogue1.addStep("It still _looks_ like the local gym, but everything is strange and neon!", CoachList.you)
        // primoIntroDialogue1.addStep("I am Primo Firstman. Are you here to throwdown?", CoachList.primo, "???");
        // primoIntroDialogue1.addStep(["What?"], CoachList.you);
        // primoIntroDialogue1.addStep("In other words, are you asking for a CHALLENGE?", CoachList.primo);
        // primoIntroDialogue1.addStep(["Throwdown as in... fight?", "I'm just here for sick gains, bro", "Prepare to be TURBO THRASHED!"], CoachList.you);
        // primoIntroDialogue1.addStep("Hahahahaha. Then prepare your team and let us BEGIN.", CoachList.primo);
        // primoIntroDialogue1.addStep("Hey kid, wait!", CoachList.coach);
        // primoIntroDialogue1.addStep(["Who?", "What?", "I'm 37"], CoachList.you);
        // primoIntroDialogue1.addStep("I know a rookie when I see one. Let me give you some pointers.", CoachList.coach);
        //Win Dialogue Primo
        primoWinDialogue1.addStep("Waaaah! I got turbo-thrashed!", CoachList.primo);
        primoWinDialogue1.addStep(["More like Primo WORSTman", "Yayyyy can I go home now?"], CoachList.you);
        primoWinDialogue1.addStep("Ya did it, kid! Only 9 more gym bosses to go!", CoachList.coach);
        primoWinDialogue1.addStep(["Nine?", "I told you, I'm not a kid.", "TURBO-SLICED!!!!"], CoachList.you);
        //Lose Dialogue Primo
        //to add
    }

    public initializeSporticusDialogue(): void {
        const sporticusIntroDialogue1 = new DialogueConversation();
        DialogueStorage.sporticusDialogue.getIntroDialogueList().push(sporticusIntroDialogue1);

        sporticusIntroDialogue1.addStep("I am Sporticus!!", CoachList.sporticus, "???");
        sporticusIntroDialogue1.addStep(["No, I am Sporticus!", "....'cause Sports?", "I am 37."], CoachList.you);
    }

    public initializeRussDialogue(): void {   
    }

    public initializeBossDialogue(): void {
    }

    public initializeSteveDialogue(): void {
    }

    public initializeBetsyDialogue(): void {
    }

    public initializeCoreeDialogue(): void {
    }

    public initializeTurboDialogue(): void {
    }

    public initializeShadowDialogue(): void {
    }

    public initializeBoss10Dialogue(): void {
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
        russ: DialogueStorage.russDialogue,
        boss: DialogueStorage.bossDialogue,
        steve: DialogueStorage.steveDialogue,
        betsy: DialogueStorage.betsyDialogue,
        coree: DialogueStorage.coreeDialogue,
        turbo: DialogueStorage.turboDialogue,
        shadow: DialogueStorage.shadowDialogue,
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
                }
            }
        }
    }
}

