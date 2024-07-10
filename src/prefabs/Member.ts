
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Team from "./Team";
/* END-USER-IMPORTS */

export default class Member extends Phaser.GameObjects.Container {
    public sprite: Phaser.GameObjects.Sprite;
    private assignedCards: string[];
    private cardIcons: Phaser.GameObjects.Image[];
    private visibleMove: boolean = true;
    private hp: number;
    private team: Team;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, visibleMove: boolean, team: Team) {
        super(scene, x, y);

        this.visibleMove = visibleMove;
        this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, texture);
        this.add(this.sprite);

        this.assignedCards = [];
        this.cardIcons = [];
        this.hp = 30;
        this.team = team;
        this.setSize(this.sprite.width, this.sprite.height);

        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.sprite.width, this.sprite.height), Phaser.Geom.Rectangle.Contains);

        this.on('pointerover', () => { this.scene.input.setDefaultCursor('pointer'); });
        this.on('pointerout', () => { this.scene.input.setDefaultCursor('default'); });
    }

    assignCard(cardType: string, whiteIconTexture: string) {
        if (this.assignedCards.length >= 1) {
            return;
        }
        this.assignedCards.push(cardType);

        if (this.visibleMove)  {
            const icon = new Phaser.GameObjects.Image(this.scene, 0, -20, whiteIconTexture);
            this.add(icon);
            this.cardIcons.push(icon);
        }
    }

    getAssignedCards(): string[] {
        return this.assignedCards;
    }

    getHP(): number {
        return this.hp;
    }

    hit(damage: number) {
        this.hp -= damage;
        this.showFloatingDamage(damage);
        if (this.hp <= 0) {
            this.hp = 0;
            this.destroyMember();
        }
    }

    showFloatingDamage(damage: number) {
        if (!this.scene) {
            return;
        }
        const damageText = this.scene.add.text(this.x, this.y - this.sprite.height / 2, damage.toString(), {
            fontSize: '48px',
            color: '#ffffff',
            stroke: '#ffffff',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.scene.add.tween({
            targets: damageText,
            y: this.y - this.sprite.height / 2 - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                damageText.destroy();
            }
        });
    }

    destroyMember() {
        this.team.removeMember(this);
        this.destroy(); 
    }
}