
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Member from "./Member";
import Player from "./Player";
import Team from "./Team";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
/* END-USER-IMPORTS */

export default class Boss extends Team {

    constructor(scene: Phaser.Scene) {
        super(scene, false);

        /* START-USER-CTR-CODE */
        const borderImage = new Phaser.GameObjects.Image(scene, 1674, 274, "opponentBorder");
        this.add(borderImage);

        const bossImage = new Phaser.GameObjects.Image(scene, 1780, 140, "opponent1").setOrigin(1, 0);
        this.add(bossImage);
        /* END-USER-CTR-CODE */
    }

    drawCards() {
        console.log("boss drawing cards");
        for (let i = 0; i < 5; i++) {
            this.onDeckClick();
        }
    }

    assignCards() {
        console.log("boss assigning cards");
        this.assignRandomCardsToMembers();
    }

    targetMembers() {
        const throwers = this.members.filter(member => member.getAssignedCards().includes("THROW"));
        throwers.forEach(thrower => {
            const target = this.selectRandomMember(this.opponent.members);
            thrower.setIntendedTarget(target);
        });
    }

    /* START-USER-CODE */
    
    assignRandomCardsToMembers() {
        this.members.forEach(member => {
            if (this.hand.getCards().length > 0) {
                const randomIndex = Phaser.Math.Between(0, this.hand.getCards().length - 1);
                const randomCard = this.hand.getCards()[randomIndex];
                const cardType = randomCard.getCardType();
                const whiteIconTexture = randomCard.getWhiteIconTexture();

                member.assignCard(cardType, whiteIconTexture);

                this.hand.getCards().splice(randomIndex, 1);

                
            }
        });
    }

    addMembers() {
        const enemy1 = new Member(this.scene, 730, 259, 'enemy', false, this, 4);
        const enemy2 = new Member(this.scene, 950, 213, 'enemy', false, this, 5);
        const enemy3 = new Member(this.scene, 1180, 253, 'enemy', false, this, 6);

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
        console.log("Enemy clicked");
        const playerScene = this.opponent as Player;
        playerScene.handleEnemyClick(enemy);
    }

    selectRandomMemberWithCard(cardType: string, members: Member[]): Member | null {
        const eligibleMembers = members.filter(member => member.getAssignedCards().includes(cardType));
        if (eligibleMembers.length > 0) {
            const randomIndex = Phaser.Math.Between(0, eligibleMembers.length - 1);
            return eligibleMembers[randomIndex];
        }
        return null;
    }

    selectRandomMember(members: Member[]): Member | null {
        if (members.length > 0) {
            const randomIndex = Phaser.Math.Between(0, members.length - 1);
            return members[randomIndex];
        }
        return null;
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
