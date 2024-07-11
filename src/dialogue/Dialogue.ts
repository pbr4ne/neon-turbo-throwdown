import Boss from "~/prefabs/Boss";

export class DialogueStep {
    private text: string | string[];
    private avatar: string;

    constructor(text: string | string[], avatar: string) {
        this.text = text;
        this.avatar = avatar as string;
    }

    public getText(): string | string[] {
        return this.text;
    }

    public isList(): boolean {
        return Array.isArray(this.text);
    }

    public getAvatar(): string {
        return this.avatar;
    }
}

export class DialogueConversation {
    private steps: DialogueStep[] = [];
    private currentStepIndex: number = 0;

    public addStep(text: string | string[], avatar: string): void {
        this.steps.push(new DialogueStep(text, avatar));
    }

    public getCurrentStep(): DialogueStep | null {
        if (this.currentStepIndex < this.steps.length) {
            return this.steps[this.currentStepIndex];
        }
        return null;
    }

    public nextStep(): DialogueStep | null {
        console.log("nextStep: " + this.currentStepIndex + "<" + (this.steps.length - 1));
        if (this.currentStepIndex < this.steps.length - 1) {
            this.currentStepIndex++;
            return this.steps[this.currentStepIndex];
        }
        return null;
    }

    public reset(): void {
        this.currentStepIndex = 0;
    }

    public isFinished(): boolean {
        console.log("isFinished: " + this.currentStepIndex + ">=" + this.steps.length);
        return this.currentStepIndex >= this.steps.length;
    }
}