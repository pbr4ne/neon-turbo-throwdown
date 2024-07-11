import Boss from '../prefabs/Boss';
import { DialogueConversation } from './Dialogue';

export class DialogueStorage {
    public introDialogue: DialogueConversation = new DialogueConversation();

    public constructor() {
        this.introDialogue.addStep("You step into the gym for an ordinary day of sick gains when...", "you");
        this.introDialogue.addStep(["What...?"], "you");
        this.introDialogue.addStep("A portal appears and sucks you in!", "you");
        this.introDialogue.addStep("It still _looks_ like the local gym, but everything is strange and neon!", "you")
        this.introDialogue.addStep("I am Primo Firstman. Are you here to throwdown?", "opponent1");
        this.introDialogue.addStep(["What?"], "you");
        this.introDialogue.addStep("In other words, are you asking for a CHALLENGE?", "opponent1");
        this.introDialogue.addStep(["Throwdown as in…fight?", "I’m just here for sick gains, bro", "Prepare to be TURBO THRASHED!"], "you");
        this.introDialogue.addStep("Hahahahaha. Then prepare your team and let us BEGIN.", "opponent1");
    }
}