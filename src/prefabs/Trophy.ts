
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { TrophyType } from "../trophies/TrophyType";
/* END-USER-IMPORTS */

export default class Trophy extends Phaser.GameObjects.Container {
    public trophyType: TrophyType;
    private cardImage: Phaser.GameObjects.Image;
    private ringSelectedImage: Phaser.GameObjects.Image;
    private ringAssignedImage: Phaser.GameObjects.Image;
    private nameText: Phaser.GameObjects.Text;
    private iconImage: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, trophyType: TrophyType, x?: number, y?: number, texture?: string) {
        super(scene, x ?? 0, y ?? 0);
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, texture || "front");
        this.add(this.cardImage);

        this.ringSelectedImage = new Phaser.GameObjects.Image(scene, 0, 0, 'ring-selected');
        this.add(this.ringSelectedImage);
        this.ringSelectedImage.setVisible(false);

        this.ringAssignedImage = new Phaser.GameObjects.Image(scene, 0, 0, 'ring-assigned');
        this.add(this.ringAssignedImage);
        this.ringAssignedImage.setVisible(false);

        this.trophyType = trophyType;

        this.nameText = new Phaser.GameObjects.Text(scene, 0, 64, this.trophyType.getName(), {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '14px',
            color: '#ffff00',
            padding: { x: 5, y: 5 },
            align: 'center'
        });
        this.nameText.setOrigin(0.5, 0.5);
        this.add(this.nameText);

        this.iconImage = new Phaser.GameObjects.Image(scene, 0, -30, this.trophyType.getIcon());
        this.add(this.iconImage);

        this.setSize(this.cardImage.width, this.cardImage.height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.cardImage.width, this.cardImage.height), Phaser.Geom.Rectangle.Contains);

        this.on('pointerover', () => { this.scene.input.setDefaultCursor('pointer'); });
        this.on('pointerout', () => { this.scene.input.setDefaultCursor('default'); });
    }

    clearCard() {
        this.ringSelectedImage.setVisible(false);
        this.ringAssignedImage.setVisible(false);
    }

    setTexture(texture: string) {
        this.cardImage.setTexture(texture);
    }

    showName(visible: boolean) {
        this.nameText.setVisible(visible);
    }

    showIcon(visible: boolean) {
        this.iconImage.setVisible(visible);
    }

    showAssignedRing() {
        this.ringAssignedImage.setVisible(true);
    }

    hide() {
        this.setVisible(false);
    }

    getTrophyType(): TrophyType {
        return this.trophyType;
    }

    getIconTexture(): string {
        return this.iconImage.texture.key;
    }
}