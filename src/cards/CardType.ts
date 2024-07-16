import { Coach } from "../throwdown/Coach";
import Member from "../prefabs/Member";
import Team from "../prefabs/Team";
import { CardFactory } from "./CardFactory";
import { CardKeys } from "./CardKeys";
import Player from "../prefabs/Player";

export abstract class CardType {

    public key: CardKeys;
    private upgradeKey: CardKeys | null;
    private player?: Player;

    constructor(key: CardKeys | CardKeys.UNKNOWN, upgradeKey: CardKeys | null) {
        this.key = key;
        this.upgradeKey = upgradeKey;
    }

    resetTurn(): void {
        
    }

    resetRound(): void {
    }

    abstract special(member: Member, team: Team, opponentTeam: Team): boolean;

    abstract offense(member: Member, target: Member, team: Team, opponentTeam: Team): boolean;

    abstract defense(member: Member, attacker: Member, team: Team, opponentTeam: Team, canRetaliate: boolean): boolean;

    abstract needsTarget(): boolean;

    abstract getName(): string;

    abstract getIcon(): string;

    abstract getDescription(): string;

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