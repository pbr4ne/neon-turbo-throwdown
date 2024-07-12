import { Coach } from '../throwdown/Coach';
import { DialogueConversation } from './Dialogue';

export class DialogueStorage {
    public introDialogue: DialogueConversation = new DialogueConversation();
    public primoWinDialogue: DialogueConversation = new DialogueConversation();
    public spiritDialogue: DialogueConversation = new DialogueConversation();
    public sportacusIntroDialogue: DialogueConversation = new DialogueConversation();

    public constructor() {
        //Intro Dialogue
        this.introDialogue.addStep("You step into the gym for an ordinary day of sick gains when...", Coach.you);
        this.introDialogue.addStep(["What...?"], Coach.you);
        this.introDialogue.addStep("A portal appears and sucks you in!", Coach.you);
        this.introDialogue.addStep("It still _looks_ like the local gym, but everything is strange and neon!", Coach.you)
        //Intro Dialogue Primo
        this.introDialogue.addStep("I am Primo Firstman. Are you here to throwdown?", Coach.primo, "???");
        this.introDialogue.addStep(["What?"], Coach.you);
        this.introDialogue.addStep("In other words, are you asking for a CHALLENGE?", Coach.primo);
        this.introDialogue.addStep(["Throwdown as in…fight?", "I'm just here for sick gains, bro", "Prepare to be TURBO THRASHED!"], Coach.you);
        this.introDialogue.addStep("Hahahahaha. Then prepare your team and let us BEGIN.", Coach.primo);
        this.introDialogue.addStep("Hey kid, wait!", Coach.coach);
        this.introDialogue.addStep(["Who?", "What?", "I'm 37"], Coach.you);
        this.introDialogue.addStep("I know a rookie when I see one. Let me give you some pointers.", Coach.coach);
        //Win Dialogue Primo
        this.primoWinDialogue.addStep("Primo: Waaaah! I got turbo-thrashed!", Coach.primo);
        this.primoWinDialogue.addStep(["More like Primo WORSTman", "Yayyyy can I go home now?"], Coach.you);
        this.primoWinDialogue.addStep("Ya did it, kid! Only 9 more gym bosses to go!", Coach.coach);
        this.primoWinDialogue.addStep(["Nine?", "I told you, I'm not a kid.", "TURBO-SLICED!!!!"], Coach.you);
        //Lose Dialogue Primo
        this.spiritDialogue.addStep("It's ok", Coach.coach);
        //Intro Dialogue Sporticus
        this.sportacusIntroDialogue.addStep("I am Sporticus!!", Coach.sporticus, "???");
        this.sportacusIntroDialogue.addStep(["No, I am Sporticus!", "....'cause Sports?", "I am 37."], Coach.you);
        //Win Dialogue Sporticus
        //Lose Dialogue Sporticus        
        //Intro Dialogue Russ Tyler
        //Win Dialogue Russ Tyler
        //Lose Dialogue Russ Tyler     
        //Intro Dialogue The Boss
        //Win Dialogue The Boss
        //Lose Dialogue The Boss     
        //Intro Dialogue Sgt. Steve
        //Win Dialogue Sgt. Steve
        //Lose Dialogue Sgt. Steve     
        //Intro Dialogue Betsy and the Nets
        //Win Dialogue Betsy and the Nets
        //Lose Dialogue Betsy and the Nets     
        //Intro Dialogue (C.O.R.E.E.) Contractually obligated robotic electric enemy
        //Win Dialogue (C.O.R.E.E.) Contractually obligated robotic electric enemy
        //Lose Dialogue (C.O.R.E.E.) Contractually obligated robotic electric enemy   
        //Intro Dialogue Turbo Nerd
        //Win Dialogue Turbo Nerd
        //Lose Dialogue Turbo Nerd   
        //Intro Dialogue Shadow Ken
        //Win Dialogue Shadow Ken
        //Lose Dialogue Shadow Ken   
        //Intro Dialogue Photoboss
        //Win Dialogue Photoboss
        //Lose Dialogue Photoboss   

    }
}