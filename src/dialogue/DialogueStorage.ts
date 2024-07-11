import { DialogueConversation } from './Dialogue';

export class DialogueStorage {
    public introDialogue: DialogueConversation = new DialogueConversation();

    public constructor() {
        this.introDialogue.addStep("You step into the gym for an ordinary day of sick gains when...");
        this.introDialogue.addStep(["What...?"]);
    }
}