
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Card extends Phaser.GameObjects.Container {
    public cardType: string;
    private cardImage: Phaser.GameObjects.Image;
    private nameText: Phaser.GameObjects.Text;
    private iconImage: Phaser.GameObjects.Image;
    private isPoppedUp: boolean;

    constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string, name?: string) {
        super(scene, x ?? 0, y ?? 0);
        
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, texture || "cardFront", frame);
        this.add(this.cardImage);

        this.cardType = name || "Unknown";

        this.nameText = new Phaser.GameObjects.Text(scene, 0, 40, this.cardType, {
            fontSize: '16px',
            color: '#000000',
			stroke: '#000000',
			strokeThickness: 1.25,
            padding: { x: 5, y: 5 },
            align: 'center'
        });
        this.nameText.setOrigin(0.5, 0.5);
        this.add(this.nameText);

        this.iconImage = new Phaser.GameObjects.Image(scene, 0, -40, '');
        this.add(this.iconImage);

        this.isPoppedUp = false;

        this.setSize(this.cardImage.width, this.cardImage.height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.cardImage.width, this.cardImage.height), Phaser.Geom.Rectangle.Contains);

        this.on('pointerover', () => { this.scene.input.setDefaultCursor('pointer'); });
        this.on('pointerout', () => { this.scene.input.setDefaultCursor('default'); });
    }

    setType(type: string) {
        this.cardType = type;
        this.nameText.setText(this.cardType);
        this.updateIcon();
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

    updateIcon() {
        switch (this.cardType) {
            case 'BLOCK':
                this.iconImage.setTexture('block');
                break;
            case 'CATCH':
                this.iconImage.setTexture('catch');
                break;
            case 'DODGE':
                this.iconImage.setTexture('dodge');
                break;
            case 'THROW':
                this.iconImage.setTexture('throw');
                break;
            default:
                this.iconImage.setTexture('');
                break;
        }
    }

    togglePopUp() {
        if (this.isPoppedUp) {
            this.y += 20;
        } else {
            this.y -= 20;
        }
        this.isPoppedUp = !this.isPoppedUp;
    }

    hide() {
        this.setVisible(false);
    }

    getCardType(): string {
        return this.cardType;
    }

    getIconTexture(): string {
        return this.iconImage.texture.key;
    }

    getWhiteIconTexture(): string {
        switch (this.cardType) {
            case 'BLOCK':
                return 'blockWhite';
            case 'CATCH':
                return 'catchWhite';
            case 'DODGE':
                return 'dodgeWhite';
            case 'THROW':
                return 'throwWhite';
            default:
                return '';
        }
    }
}