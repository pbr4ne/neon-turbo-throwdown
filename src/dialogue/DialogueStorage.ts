import { Coach } from './Coach';
import { DialogueConversation } from './Dialogue';

export class DialogueStorage {
    public introDialogue: DialogueConversation = new DialogueConversation();

    public constructor() {
        this.introDialogue.addStep("You step into the gym for an ordinary day of sick gains when...", Coach.you);
        this.introDialogue.addStep(["What...?"], Coach.you);
        this.introDialogue.addStep("A portal appears and sucks you in!", Coach.you);
        this.introDialogue.addStep("It still _looks_ like the local gym, but everything is strange and neon!", Coach.you)
        this.introDialogue.addStep("I am Primo Firstman. Are you here to throwdown?", Coach.primo, "???");
        this.introDialogue.addStep(["What?"], Coach.you);
        this.introDialogue.addStep("In other words, are you asking for a CHALLENGE?", Coach.primo);
        this.introDialogue.addStep(["Throwdown as in…fight?", "I’m just here for sick gains, bro", "Prepare to be TURBO THRASHED!"], Coach.you);
        this.introDialogue.addStep("Hahahahaha. Then prepare your team and let us BEGIN.", Coach.primo);
    }
}