import Phaser from "phaser";
import { CardType } from "../cards/CardType";
import Member from "./Member";
import { log } from "../utilities/GameUtils";
import { Library } from "../throwdown/Library";
import { RedDeck } from "../trophies/cosmetic/RedDeck";
import { BlackDeck } from "../trophies/cosmetic/BlackDeck";
import { WhiteDeck } from "../trophies/cosmetic/WhiteDeck";
import { YellowDeck } from "../trophies/cosmetic/YellowDeck";
import { CyanDeck } from "../trophies/cosmetic/CyanDeck";
import GenericCard from "./GenericCard";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class Card extends GenericCard {
    public cardType: CardType;
    private cardImage: Phaser.GameObjects.Image;
    private ringSelectedImage: Phaser.GameObjects.Image;
    private ringAssignedImage: Phaser.GameObjects.Image;
    private assignedMemberText: Phaser.GameObjects.Text;
    private nameText: Phaser.GameObjects.Text;
    private tooltipText: Phaser.GameObjects.Text;
    private iconImage: Phaser.GameObjects.Image;
    private coachImage: Phaser.GameObjects.Image | null = null;
    private tooltipImage: Phaser.GameObjects.Image;
    private isPoppedUp: boolean = false;
    private cardState: string;
    private order: number = 1;
    private static currentOrder: number = 1;

    constructor(scene: Phaser.Scene, cardType: CardType, cardState: string, x?: number, y?: number, texture?: string, toAdd?: boolean) {
        super(scene, x ?? 0, y ?? 0);
    
        this.cardType = cardType;
        this.cardState = cardState;
    
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, texture || "front");
    
        this.ringSelectedImage = new Phaser.GameObjects.Image(scene, 0, 0, 'ring-selected');
        this.ringAssignedImage = new Phaser.GameObjects.Image(scene, 0, 0, 'ring-assigned');
        
        const coachImageTexture = this.cardType.getCoach()?.getAvatar();
        if (coachImageTexture) {
            this.iconImage = new Phaser.GameObjects.Image(scene, -28, -56, this.cardType.getIcon()).setScale(0.5);
            this.coachImage = new Phaser.GameObjects.Image(scene, 15, -10, coachImageTexture).setScale(0.4);
        } else {
            this.iconImage = new Phaser.GameObjects.Image(scene, 0, -30, this.cardType.getIcon());
        }
    
        this.tooltipImage = new Phaser.GameObjects.Image(scene, 0, -205, 'tooltip');
    
        this.assignedMemberText = TextFactory.createText(scene, 30, -90, "", {
            fontSize: '24px',
            color: Colours.BLACK_STRING,
            align: 'center'
        });
        this.assignedMemberText.setOrigin(0.5, 0.5);
    
        let cardName = this.cardType.getName();
        if (cardName === "ricochet") {
            cardName = "rico chet";
        }

        this.nameText = TextFactory.createText(scene, 0, 64, cardName, {
            fontSize: '14px',
            color: Colours.YELLOW_STRING,
            align: 'center',
            wordWrap: { width: 100, useAdvancedWrap: true }
        });
        this.nameText.setOrigin(0.5, 0.5);
    
        let description = this.cardType.getDescription();
        if (toAdd) {
            description = `Add one ${this.cardType.getName()} to your deck (${description})`;
        }
    
        let fontSize = 16;
    
        this.tooltipText = TextFactory.createText(scene, -170, -285, description, {
            fontSize: '16px',
            color: Colours.CYAN_STRING,
            lineSpacing: 15,
            wordWrap: { width: 350, useAdvancedWrap: true }
        });
        this.tooltipText.setOrigin(0, 0);
    
        while (this.tooltipText.height + 90 > this.tooltipImage.height) {
            fontSize--;
            this.tooltipText.setStyle({ fontSize: `${fontSize}px` });
        }
    
        this.add([this.tooltipImage, this.tooltipText]);
    
        this.setSize(this.cardImage.width, this.cardImage.height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.cardImage.width, this.cardImage.height), Phaser.Geom.Rectangle.Contains);
    
        const elements = [
            this.cardImage,
            this.ringSelectedImage,
            this.ringAssignedImage,
            this.assignedMemberText,
            this.nameText,
            this.iconImage,
            this.tooltipImage,
            this.tooltipText
        ];
        if (this.coachImage) {
            elements.push(this.coachImage);
        }
        this.add(elements);
    
        this.renderForState(); 
    }

    changeState(cardState: string): void {
        this.cardState = cardState;
        this.renderForState();
    }

    reAddToScene(): void {
        if (this.scene) {
            this.scene.children.remove(this);
            this.scene.children.add(this);
        }
    }

    getDeckBackTexture(): string {
        if (Library.hasTrophy(RedDeck)) {
            return "red";
        } else if (Library.hasTrophy(BlackDeck)) {
            return "black";
        } else if (Library.hasTrophy(WhiteDeck)) {
            return "white";
        } else if (Library.hasTrophy(YellowDeck)) {
            return "yellow";
        } else if (Library.hasTrophy(CyanDeck)) {
            return "cyan";
        } else {
            return "magenta";
        }
    }

    renderForState(): void {
        this.clearCard();
        
        switch (this.cardState) {
            case "playerDeck":
                this.setTexture(this.getDeckBackTexture());
                this.cardImage.setVisible(true);
                this.on('pointerover', () => { 
                    this.scene.input.setDefaultCursor('pointer'); 
                });
                this.on('pointerout', () => { 
                    this.scene.input.setDefaultCursor('default'); 
                });
                this.scene.children.remove(this);
                this.scene.children.add(this);
                break;
            case "playerDeckHidden":
            case "bossDeck":
                break;
            case "playerHand":
                this.setTexture("front");
            case "upgrade":
                this.cardImage.setVisible(true);
                this.nameText.setVisible(true);
                this.iconImage.setVisible(true);
                this.coachImage?.setVisible(true);
                this.on('pointerover', () => { 
                    this.scene.input.setDefaultCursor('pointer'); 
    
                    this.updateTooltipText();
    
                    this.tooltipImage.setVisible(true);
                    this.tooltipText.setVisible(true);
                });
                this.on('pointerout', () => { 
                    this.scene.input.setDefaultCursor('default'); 
                    this.tooltipImage.setVisible(false);
                    this.tooltipText.setVisible(false);
                });
                this.scene.children.remove(this);
                this.scene.children.add(this);
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
            default:
                log(`unknown card state: ${this.cardState}`);
                break;
        }
    }

    private updateTooltipText(): void {
        let description = this.cardType.getDescription();
        this.tooltipText.setText(description);
    
        let fontSize = 16;
    
        while (this.tooltipText.height + 90 > this.tooltipImage.height) {
            fontSize--;
            this.tooltipText.setStyle({ fontSize: `${fontSize}px` });
        }
    }

    clearCard() {
        this.cardImage.setVisible(false);
        this.nameText.setVisible(false);
        this.iconImage.setVisible(false);
        this.coachImage?.setVisible(false);
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
        return this.order;
    }

    static getStaticOrder(): number {
        return Card.currentOrder;
    }

    static incrementOrder() {
        Card.currentOrder++;
    }

    static resetOrder(): void {
        Card.currentOrder = 1;
    }

    setOrder(order: number) {
        this.order = order;
    }
}