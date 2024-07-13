import { DialogueConversation } from './Dialogue';

export class CoachDialogue {
    private introDialogueList: DialogueConversation[] = [];
    private winDialogueList: DialogueConversation[] = [];
    private loseDialogueList: DialogueConversation[] = [];

    private currentIntroDialogue: number = 0;
    private currentWinDialogue: number = 0;
    private currentLoseDialogue: number = 0;

    public getIntroDialogueList(): DialogueConversation[] {
        return this.introDialogueList;
    }

    public getWinDialogueList(): DialogueConversation[] {
        return this.winDialogueList;
    }

    public getLoseDialogueList(): DialogueConversation[] {
        return this.loseDialogueList;
    }

    public getAndIncrementIntroDialogue(): DialogueConversation {
        if (this.currentIntroDialogue < this.introDialogueList.length) {
            return this.introDialogueList[this.currentIntroDialogue++];
        } else {
            return this.introDialogueList[this.currentIntroDialogue];
        }
    }

    public getAndIncrementWinDialogue(): DialogueConversation {
        if (this.currentWinDialogue < this.winDialogueList.length) {
            return this.winDialogueList[this.currentWinDialogue++];
        } else {
            return this.winDialogueList[this.currentWinDialogue];
        }
    }

    public getAndIncrementLoseDialogue(): DialogueConversation {
        if (this.currentLoseDialogue < this.loseDialogueList.length) {
            return this.loseDialogueList[this.currentLoseDialogue++];
        } else {
            return this.loseDialogueList[this.currentLoseDialogue];
        }
    }
}