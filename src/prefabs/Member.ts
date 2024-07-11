
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Card from "./Card";
import Team from "./Team";
/* END-USER-IMPORTS */

export default class Member extends Phaser.GameObjects.Container {
    public sprite: Phaser.GameObjects.Sprite;
    private assignedCards: Card[];
    private cardIcons: Phaser.GameObjects.Image[];
    private visibleMove: boolean = true;
    private hp: number;
    private team: Team;
    private intendedTarget: Member | null = null;
    private number: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, visibleMove: boolean, team: Team, number: number, flip: boolean = false) {
        super(scene, x, y);

        this.visibleMove = visibleMove;
        this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, texture);
        
        this.add(this.sprite);
        if (flip) {
            console.log("flipping");
            this.sprite.toggleFlipX();
        }

        console.log("sprite properties: " + this.sprite.flipX);

        this.assignedCards = [];
        this.cardIcons = [];
        this.hp = 3;
        this.team = team;
        this.number = number;
        this.setSize(this.sprite.width, this.sprite.height);

        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.sprite.width, this.sprite.height), Phaser.Geom.Rectangle.Contains);

        this.on('pointerover', () => { this.scene.input.setDefaultCursor('pointer'); });
        this.on('pointerout', () => { this.scene.input.setDefaultCursor('default'); });
    }

    setIntendedTarget(target: Member | null) {
        if (target) {
            console.log(`${this} targets ${target}`);
        }
        this.intendedTarget = target;
    }

    getIntendedTarget(): Member | null {
        return this.intendedTarget;
    }

    assignCard(card: Card, whiteIconTexture: string) {
        if (this.assignedCards.length >= 1) {
            return;
        }
        this.assignedCards.push(card);
        card.showAssignedRing();
        console.log("Assigned " + card.cardType + " to " + this);

        if (this.visibleMove)  {
            const icon = new Phaser.GameObjects.Image(this.scene, 0, -20, whiteIconTexture);
            this.add(icon);
            this.cardIcons.push(icon);
        }
    }

    getAssignedCards(): Card[] {
        return this.assignedCards;
    }

    clearAssignedCards() {
        this.assignedCards = [];
        //delete icon
        this.cardIcons.forEach(icon => icon.destroy());
    }

    getHP(): number {
        return this.hp;
    }

    hit(damage: number, attacker: Member) {
        const cardTypes = this.assignedCards.map(card => card.cardType);

        if (cardTypes.includes("evade")) {
            this.showFloatingAction("evaded");
        } else if (cardTypes.includes("block")) {
            this.showFloatingAction("blocked");
            attacker.hit(1, this);
        } else if (cardTypes.includes("catch")) {
            this.showFloatingAction("caught");
            attacker.hit(3, this);
        } else {
            this.hp -= damage;
            this.showFloatingAction(damage.toString());
            if (this.hp <= 0) {
                this.hp = 0;
                this.destroyMember();
            }
        }
    }

    showFloatingAction(action: string) {
        if (!this.scene) {
            return;
        }
        const actionText = this.scene.add.text(this.x, this.y - this.sprite.height / 2, action, {
            fontSize: '48px',
            color: '#ffffff',
            stroke: '#ffffff',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.scene.add.tween({
            targets: actionText,
            y: this.y - this.sprite.height / 2 - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                actionText.destroy();
            }
        });
    }

    destroyMember() {
        this.team.removeMember(this);
        this.destroy(); 
    }

    enableGlow() {
        this.sprite.setTint(0xff00ff);
    }

    disableGlow() {
        this.sprite.clearTint();
    }

    toString(): string {
        return `Member ${this.number}`;
    }
}