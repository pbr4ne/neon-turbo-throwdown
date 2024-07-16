import { Coach } from "../throwdown/Coach";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";
import { CardFactory } from "./CardFactory";
import { CardKeys } from "./CardKeys";
import Player from "../prefabs/Player";
import { ThrowdownPhase } from "../throwdown/ThrowdownPhase";

export abstract class CardType {

    public key: CardKeys;
    private upgradeKey: CardKeys | null;
    private player?: Player;
    private phase: ThrowdownPhase;

    constructor(key: CardKeys | CardKeys.UNKNOWN, upgradeKey: CardKeys | null, phase: ThrowdownPhase = ThrowdownPhase.NONE) {
        this.key = key;
        this.upgradeKey = upgradeKey;
        this.phase = phase;
    }

    //should be overridden if the card has things to reset at the end of the turn
    resetTurn(): void {
    }

    //should be overridden if the card has things to reset at the end of the round
    resetRound(): void {
    }

    //should be overridden if the card has a special effect
    special(member: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    //should be overridden if the card has an attack
    offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean {
        return false;
    }

    //should be overridden if the card has a defense
    defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean {
        return false;
    }

    //should be overridden if the card needs a target
    needsTarget(): boolean {
        return false;
    }

    abstract getName(): string;

    abstract getIcon(): string;

    abstract getDescription(): string;

    getPhase(): ThrowdownPhase {
        return this.phase;
    }

    getCoach(): Coach | null {
        return null;
    }

    getKey(): CardKeys {
        return this.key;
    }

    getUpgrade(): CardType | null {
        if (this.upgradeKey != null) {
            return CardFactory.createCardType(this.upgradeKey);
        }
        return null;
    }

    getAllAliveMembers(opponentTeam: Team): Member[] {
        return opponentTeam.getMembers().filter((member) => member.getHP() > 0);
    }

    getRandomAliveMembers(opponentTeam: Team, target: Member | null, numTargets: number): Member[] {
        var opponentMembers = opponentTeam.getMembers().filter((member) => member !== target && member.getHP() > 0);
        const shuffledMembers = Phaser.Utils.Array.Shuffle([...opponentMembers]);
        return shuffledMembers.slice(0, Math.min(numTargets, shuffledMembers.length));
    }

    getRandomDeadMembers(team: Team, numTargets: number): Member[] {
        var teamMembers = team.getMembers().filter((member) => member.getHP() <= 0);
        const shuffledMembers = Phaser.Utils.Array.Shuffle([...teamMembers]);
        return shuffledMembers.slice(0, Math.min(numTargets, shuffledMembers.length));
    }

    getRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getNicePercentage(fraction: number): string {
        return (fraction * 100).toFixed(0)
    }

    setPlayer(player: Player): void {
        this.player = player;
    }

    getPlayer(): Player | undefined {
        return this.player;
    }

    toString(): string {
        return `CardType: ${this.getKey()}`;
    }
}