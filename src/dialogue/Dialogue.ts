
import { Coach } from '../throwdown/Coach'; 

export class DialogueStep {
    private text: string | string[];
    private coach: Coach;
    private nameOverride: string;

    constructor(text: string | string[], coach: Coach, nameOverride?: string) {
        this.text = text;
        this.coach = coach;
        this.nameOverride = nameOverride!;
    }

    public getText(): string | string[] {
        return this.text;
    }

    public isList(): boolean {
        return Array.isArray(this.text);
    }

    public getCoach(): Coach {
        return this.coach;
    }

    public getNameOverride() {
        return this.nameOverride;
    }
}

export class DialogueConversation {
    private steps: DialogueStep[] = [];
    private currentStepIndex: number = 0;

    public addStep(text: string | string[], coach: Coach, nameOverride?: string): void {
        this.steps.push(new DialogueStep(text, coach, nameOverride));
    }

    public getSteps(): DialogueStep[] {
        return this.steps;
    }

    public getCurrentStep(): DialogueStep | null {
        if (this.currentStepIndex < this.steps.length) {
            return this.steps[this.currentStepIndex];
        }
        return null;
    }

    public nextStep(): DialogueStep | null {
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
        return this.currentStepIndex >= this.steps.length;
    }
}