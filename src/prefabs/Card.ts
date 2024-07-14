
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { CardType } from "../cards/CardType";
import Game from "../scenes/Game";
import Member from "./Member";
/* END-USER-IMPORTS */

export default class Card extends Phaser.GameObjects.Container {
    public cardType: CardType;
    private cardImage: Phaser.GameObjects.Image;
    private ringSelectedImage: Phaser.GameObjects.Image;
    private ringAssignedImage: Phaser.GameObjects.Image;
    private assignedMemberText: Phaser.GameObjects.Text;
    private nameText: Phaser.GameObjects.Text;
    private iconImage: Phaser.GameObjects.Image;
    private isPoppedUp: boolean = false;
    private cardState: string;

    constructor(scene: Phaser.Scene, cardType: CardType, cardState: string, x?: number, y?: number, texture?: string) {
        super(scene, x ?? 0, y ?? 0);

        this.cardType = cardType;
        this.cardState = cardState;

        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, texture || "front");

        this.ringSelectedImage = new Phaser.GameObjects.Image(scene, 0, 0, 'ring-selected');
        this.ringAssignedImage = new Phaser.GameObjects.Image(scene, 0, 0, 'ring-assigned');
        this.iconImage = new Phaser.GameObjects.Image(scene, 0, -30, this.cardType.getIcon());

        this.assignedMemberText = new Phaser.GameObjects.Text(scene, 30, -90, "", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '24px',
            color: '#000000',
            padding: { x: 5, y: 5 },
            align: 'center'
        });
        this.assignedMemberText.setOrigin(0.5, 0.5);

        this.nameText = new Phaser.GameObjects.Text(scene, 0, 64, this.cardType.getName(), {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '14px',
            color: '#ffff00',
            padding: { x: 5, y: 5 },
            align: 'center'
        });
        this.nameText.setOrigin(0.5, 0.5);
        this.nameText.setWordWrapWidth(100);

        this.setSize(this.cardImage.width, this.cardImage.height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.cardImage.width, this.cardImage.height), Phaser.Geom.Rectangle.Contains);

        this.add([this.cardImage, this.ringSelectedImage, this.ringAssignedImage, this.assignedMemberText, this.nameText, this.iconImage]);

        this.renderForState();

        
    }

    changeState(cardState: string): void {
        this.cardState = cardState;
        this.renderForState();
    }

    renderForState(): void {
        this.clearCard();
        console.log(`rendering for state: ${this.toString()}`);
        switch (this.cardState) {
            case "playerDeck":
                this.setTexture("magenta");
                this.cardImage.setVisible(true);
                this.on('pointerover', () => { 
                    this.scene.input.setDefaultCursor('pointer'); 
                    (this.scene.scene.get('Game') as Game).setCardDescription(this.cardType.getDescription());
                    console.log(`mouse over ${this.toString()}`)
                });
                this.on('pointerout', () => { 
                    this.scene.input.setDefaultCursor('default'); 
                    (this.scene.scene.get('Game') as Game).setCardDescription("");
                });
                break;
            case "playerDeckHidden":
            case "bossDeck":
                break;
            case "playerHand":
                this.setTexture("front");
                this.cardImage.setVisible(true);
                this.nameText.setVisible(true);
                this.iconImage.setVisible(true);
                this.on('pointerover', () => { 
                    this.scene.input.setDefaultCursor('pointer'); 
                    (this.scene.scene.get('Game') as Game).setCardDescription(this.cardType.getDescription());
                    console.log(`mouse over ${this.toString()}`)
                });
                this.on('pointerout', () => { 
                    this.scene.input.setDefaultCursor('default'); 
                    (this.scene.scene.get('Game') as Game).setCardDescription("");
                });
                break;
            case "bossHand":
                break;
            case "playerDiscard":
                this.off("pointerout");
                this.off("pointerover");
                this.off("pointerdown");
                break;
            case "bossDiscard":
                break;
            case "upgrade":
                break;
            default:
                console.log(`unknown card state: ${this.cardState}`);
                break;
        }
    }

    clearCard() {
        this.cardImage.setVisible(false);
        this.nameText.setVisible(false);
        this.iconImage.setVisible(false);
        this.ringSelectedImage.setVisible(false);
        this.ringAssignedImage.setVisible(false);
        this.assignedMemberText.setVisible(false);
        this.assignedMemberText.setText("");
        this.off("pointerout");
        this.off("pointerover");
    }

    setTexture(texture: string) {
        this.cardImage.setTexture(texture);
    }

    showAssignedRing(member: Member) {
        this.ringAssignedImage.setVisible(true);
        this.assignedMemberText.setVisible(true);
        this.assignedMemberText.setText(member.getNumber().toString());
    }

    togglePopUp() {
        if (this.isPoppedUp) {
            this.ringSelectedImage.setVisible(false);
        } else {
            this.ringSelectedImage.setVisible(true);
        }
        this.isPoppedUp = !this.isPoppedUp;
    }

    hide() {
        this.setVisible(false);
    }

    getCardType(): CardType {
        return this.cardType;
    }

    getIconTexture(): string {
        return this.iconImage.texture.key;
    }

    toString(): string {
        return `${this.cardState} (${this.cardType.getName()})`;
    }
}