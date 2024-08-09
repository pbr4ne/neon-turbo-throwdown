import Phaser from "phaser";
import Member from "./Member";
import Player from "./Player";
import Team from "./Team";
import { Coach } from "../throwdown/Coach";
import { CardType } from "../cards/CardType";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
import { log } from "../utilities/GameUtils";

export default class Boss extends Team {

    constructor(scene: Phaser.Scene, coach: Coach) {
        super(scene, false);

        this.coach = coach;
        const bossImage = new Phaser.GameObjects.Image(scene, 1855, 78, coach.getAvatar())
            .setOrigin(1, 0)
            .setScale(1.2);
        this.add(bossImage);
    }

    private coach: Coach;

    getCoach(): Coach {
        return this.coach;
    }

    drawCards() {
        log("boss drawing cards");
        for (let i = 0; i < 5; i++) {
            this.onDeckClick();
        }
    }

    assignCards() {
        log("boss assigning cards");
        this.assignRandomCardsToMembers();
    }

    targetMembers() {
        this.members.forEach(member => {
            const assignedCard = member.getAssignedCard();
    
            if (assignedCard && assignedCard.getCardType().needsTarget()) {
                const target = this.selectRandomMember(this.opponent.members);
                member.setIntendedTarget(target, this);
            }
        });
    }
  
    assignRandomCardsToMembers() {
        this.members.forEach(member => {
            if (member.getHP() <= 0) {
                member.hideAssignedStuff();
                return;
            }
            if (this.hand.getCards().length > 0) {
                const randomIndex = Phaser.Math.Between(0, this.hand.getCards().length - 1);
                const randomCard = this.hand.getCards()[randomIndex];
                const cardType = randomCard.getCardType();

                member.assignCard(randomCard, this);
                log("Assigned card to member: " + cardType.getName() + " " + member);

                this.hand.getCards().splice(randomIndex, 1);
                this.hand.getCardsInPlay().push(randomCard);
            }
        });
    }

    addMembers() {
        const enemy1 = new Member(this.scene, 664, 196, 'enemy1', false, this, this.coach, 4, false, 40);
        const enemy2 = new Member(this.scene, 950, 152, 'enemy2', false, this, this.coach, 5, false, 40);
        const enemy3 = new Member(this.scene, 1220, 191, 'enemy3', false, this, this.coach, 6, true, 40);

        this.add(enemy1);
        this.add(enemy2);
        this.add(enemy3);

        this.members.push(enemy1);
        this.members.push(enemy2);
        this.members.push(enemy3);

        enemy1.on("pointerdown", () => this.handleEnemyClick(enemy1));
        enemy2.on("pointerdown", () => this.handleEnemyClick(enemy2));
        enemy3.on("pointerdown", () => this.handleEnemyClick(enemy3));

        const floatingObjectMember1 = new FloatingObjectScript(enemy1);
        const floatingObjectMember2 = new FloatingObjectScript(enemy2);
        const floatingObjectMember3 = new FloatingObjectScript(enemy3);
    }

    handleEnemyClick(enemy: Member) {
        log("Enemy clicked");
        const playerScene = this.opponent as Player;
        playerScene.handleEnemyClick(enemy);
    }

    selectRandomMemberWithCard(cardType: CardType, members: Member[]): Member | null {
        const eligibleMembers = members.filter(member => 
            member.getAssignedCard()?.getCardType() == cardType
        );
        if (eligibleMembers.length > 0) {
            const randomIndex = Phaser.Math.Between(0, eligibleMembers.length - 1);
            return eligibleMembers[randomIndex];
        }
        return null;
    }

    selectRandomMember(members: Member[]): Member | null {
        const aliveMembers = members.filter(member => member.getHP() > 0);
        if (aliveMembers.length > 0) {
            const randomIndex = Phaser.Math.Between(0, aliveMembers.length - 1);
            return aliveMembers[randomIndex];
        }
        return null;
    }
}
