
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Player extends Phaser.GameObjects.Container {
    public sprite: Phaser.GameObjects.Sprite;
    private assignedCards: string[];
    private cardIcons: Phaser.GameObjects.Image[];

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y);

        this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, texture);
        this.add(this.sprite);

        this.assignedCards = [];
        this.cardIcons = [];
        this.setSize(this.sprite.width, this.sprite.height);

        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.sprite.width, this.sprite.height), Phaser.Geom.Rectangle.Contains);
    }

    assignCard(cardType: string, whiteIconTexture: string) {
        this.assignedCards.push(cardType);

        const icon = new Phaser.GameObjects.Image(this.scene, 0, this.assignedCards.length * 30, whiteIconTexture);
        this.add(icon);
        this.cardIcons.push(icon);
    }

    getAssignedCards(): string[] {
        return this.assignedCards;
    }
}