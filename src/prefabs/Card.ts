
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Card extends Phaser.GameObjects.Container {
    public cardType: string;
    private cardImage: Phaser.GameObjects.Image;
    private ringSelectedImage: Phaser.GameObjects.Image;
    private ringAssignedImage: Phaser.GameObjects.Image;
    private nameText: Phaser.GameObjects.Text;
    private iconImage: Phaser.GameObjects.Image;
    private isPoppedUp: boolean;

    constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string, name?: string) {
        super(scene, x ?? 0, y ?? 0);
        
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, texture || "front", frame);
        this.add(this.cardImage);

        this.ringSelectedImage = new Phaser.GameObjects.Image(scene, 0, 0, 'ring-selected');
        this.add(this.ringSelectedImage);
        this.ringSelectedImage.setVisible(false);

        this.ringAssignedImage = new Phaser.GameObjects.Image(scene, 0, 0, 'ring-assigned');
        this.add(this.ringAssignedImage);
        this.ringAssignedImage.setVisible(false);

        this.cardType = name || "Unknown";

        this.nameText = new Phaser.GameObjects.Text(scene, 0, 64, this.cardType, {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '14px',
            color: '#ffff00',
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
            case 'block':
                this.iconImage.setTexture('blockWhite');
                break;
            case 'catch':
                this.iconImage.setTexture('catchWhite');
                break;
            case 'evade':
                this.iconImage.setTexture('dodgeWhite');
                break;
            case 'throw':
                this.iconImage.setTexture('throwWhite');
                break;
            default:
                this.iconImage.setTexture('');
                break;
        }
    }

    togglePopUp() {
        if (this.isPoppedUp) {
            //this.y += 20;
            this.ringSelectedImage.setVisible(false);
        } else {
            //this.y -= 20;
            this.ringSelectedImage.setVisible(true);
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
            case 'block':
                return 'blockWhite';
            case 'catch':
                return 'catchWhite';
            case 'evade':
                return 'dodgeWhite';
            case 'throw':
                return 'throwWhite';
            default:
                return '';
        }
    }
}