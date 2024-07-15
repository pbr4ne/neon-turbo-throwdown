import { Throw } from "./Throw";

export class TurboThrow extends Throw {
    protected offenseDamage: number = 2;

    getName(): string {
        return "turbo throw";
    }

    getIcon(): string {
        return "throw-turbo";
    }

}