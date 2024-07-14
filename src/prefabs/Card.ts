
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { CardType } from "../cards/CardType";
import Member from "./Member";
/* END-USER-IMPORTS */

export default class Card extends Phaser.GameObjects.Container {
    public cardType: CardType;
    private cardImage: Phaser.GameObjects.Image;
    private ringSelectedImage: Phaser.GameObjects.Image;
    private ringAssignedImage: Phaser.GameObjects.Image;
    private assignedMemberText: Phaser.GameObjects.Text;
    private nameText: Phaser.GameObjects.Text;
    private tooltipText: Phaser.GameObjects.Text;
    private iconImage: Phaser.GameObjects.Image;
    private tooltipImage: Phaser.GameObjects.Image;
    private isPoppedUp: boolean = false;
    private cardState: string;
    private order: number = 1;
    private static currentOrder: number = 1;

    constructor(scene: Phaser.Scene, cardType: CardType, cardState: string, x?: number, y?: number, texture?: string) {
        super(scene, x ?? 0, y ?? 0);

        this.cardType = cardType;
        this.cardState = cardState;

        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, texture || "front");

        this.ringSelectedImage = new Phaser.GameObjects.Image(scene, 0, 0, 'ring-selected');
        this.ringAssignedImage = new Phaser.GameObjects.Image(scene, 0, 0, 'ring-assigned');
        this.iconImage = new Phaser.GameObjects.Image(scene, 0, -30, this.cardType.getIcon());
        this.tooltipImage = new Phaser.GameObjects.Image(scene, 0, -205, 'tooltip');

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

        this.tooltipText = new Phaser.GameObjects.Text(scene, 5, -275, this.cardType.getDescription(), {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '16px',
            color: '#00ffff',
            lineSpacing: 15,
            padding: { x: 5, y: 5 },
            align: 'left'
        });
        this.tooltipText.setOrigin(0.5, 0);
        this.tooltipText.setWordWrapWidth(350);

        this.setSize(this.cardImage.width, this.cardImage.height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.cardImage.width, this.cardImage.height), Phaser.Geom.Rectangle.Contains);

        this.add([this.cardImage, this.ringSelectedImage, this.ringAssignedImage, this.assignedMemberText, this.nameText, this.iconImage, this.tooltipImage, this.tooltipText]);

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
                    console.log(`mouse over ${this.toString()}`)
                });
                this.on('pointerout', () => { 
                    this.scene.input.setDefaultCursor('default'); 
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
                    this.tooltipImage.setVisible(true);
                    this.tooltipText.setVisible(true);
                    console.log(`mouse over ${this.toString()}`)
                });
                this.on('pointerout', () => { 
                    this.scene.input.setDefaultCursor('default'); 
                    this.tooltipImage.setVisible(false);
                    this.tooltipText.setVisible(false);
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
                this.setTexture("front");
                this.cardImage.setVisible(true);
                this.nameText.setVisible(true);
                this.iconImage.setVisible(true);
                this.on('pointerover', () => { 
                    this.scene.input.setDefaultCursor('pointer'); 
                    this.tooltipImage.setVisible(true);
                    this.tooltipText.setVisible(true);
                    console.log(`mouse over ${this.toString()}`)
                });
                this.on('pointerout', () => { 
                    this.scene.input.setDefaultCursor('default'); 
                    this.tooltipImage.setVisible(false);
                    this.tooltipText.setVisible(false);
                });
            default:
                console.log(`unknown card state: ${this.cardState}`);
                break;
        }
    }

    clearCard() {
        this.cardImage.setVisible(false);
        this.nameText.setVisible(false);
        this.iconImage.setVisible(false);
        this.tooltipImage.setVisible(false);
        this.tooltipText.setVisible(false);
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
        this.assignedMemberText.setText(this.getOrder().toString());
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

    getOrder(): number {
        console.log(`getting order: ${this.order}`);
        return this.order;
    }

    getNextOrder(): number {
        console.log(`getting next order: ${Card.currentOrder}`);
        return Card.currentOrder++;
    }

    incrementOrder() {
        Card.currentOrder = Card.currentOrder++;
        console.log(`incremented order: ${Card.currentOrder}`);
    }

    static resetOrder(): void {
        console.log(`resetting order`);
        Card.currentOrder = 1;
    }

    setOrder(order: number) {
        this.order = order;
        console.log(`setting order: ${this.order}`);
    }
}