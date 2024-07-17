import { CardKeys } from "../../CardKeys";
import { CardType } from "../../CardType";
import Member from "../../../prefabs/Member";
import Team from "../../../prefabs/Team";
import { GameSounds } from "../../../utilities/GameSounds";
import { log } from "../../../utilities/GameUtils";
import Player from "../../../prefabs/Player";
import { OfficeCard } from "./OfficeCard";
import { ThrowdownPhase } from "../../../throwdown/ThrowdownPhase";

export class LevelSet extends OfficeCard {

    constructor() {
        super(CardKeys.LEVEL_SET, null, ThrowdownPhase.SPECIAL);
    }

    special(member: Member, target: Member | null, team: Team, opponentTeam: Team): boolean {
        
        const teamMembers = this.getAllAliveMembers(team);
    
        if (teamMembers.length < 2) {
            return false;
        }
    
        let healthiestMember = teamMembers[0];
        let mostWoundedMember = teamMembers[0];
    
        for (const teamMember of teamMembers) {
            if (teamMember.getHP() > healthiestMember.getHP()) {
                healthiestMember = teamMember;
            }
            if (teamMember.getHP() < mostWoundedMember.getHP()) {
                mostWoundedMember = teamMember;
            }
        }
    
        if (healthiestMember.getHP() > 1 && healthiestMember !== mostWoundedMember) { 
            healthiestMember.reduceHP(1);
            mostWoundedMember.increaseHP(1);

            member.showFloatingAction(this.getName());

            GameSounds.playHeal();
    
            return true;
        }
    
        return false;
    }

    getName(): string {
        return "level set";
    }

    getIcon(): string {
        return "group-heal-turbo";
    }

    getDescription(): string {
        return "Remove 1 HP from your healthiest team member & assign to your most wounded";
    }
}