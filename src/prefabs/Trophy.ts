import Phaser from "phaser";
import { TrophyType } from "../trophies/TrophyType";
import GenericCard from "./GenericCard";

export default class Trophy extends GenericCard {
    public trophyType: TrophyType;
    private cardImage: Phaser.GameObjects.Image;
    private nameText: Phaser.GameObjects.Text;
    private tooltipText: Phaser.GameObjects.Text;
    private tooltipImage: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, trophyType: TrophyType, x?: number, y?: number, texture?: string) {
        super(scene, x ?? 0, y ?? 0);
        
        this.cardImage = new Phaser.GameObjects.Image(scene, 0, 0, texture || "trophy");
        this.add(this.cardImage);

        this.setDepth(10);

        this.tooltipImage = new Phaser.GameObjects.Image(scene, 0, -205, 'tooltip');
        this.add(this.tooltipImage);
        this.tooltipImage.setVisible(false);

        this.trophyType = trophyType;

        this.nameText = new Phaser.GameObjects.Text(scene, 5, 64, this.trophyType.getName(), {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '14px',
            color: '#ffff00',
            padding: { x: 5, y: 5 },
            align: 'center'
        });
        this.nameText.setOrigin(0.5, 0.5);
        this.nameText.setWordWrapWidth(100);
        this.add(this.nameText);

        this.tooltipText = new Phaser.GameObjects.Text(scene, 5, -275, this.trophyType.getDescription(), {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '16px',
            color: '#00ffff',
            lineSpacing: 15,
            padding: { x: 5, y: 5 },
            align: 'left'
        });
        this.tooltipText.setOrigin(0.5, 0);
        this.tooltipText.setWordWrapWidth(350);
        this.tooltipText.setVisible(false);
        this.add(this.tooltipText);

        this.setSize(this.cardImage.width, this.cardImage.height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.cardImage.width, this.cardImage.height), Phaser.Geom.Rectangle.Contains);

        this.on('pointerover', () => { 
            this.scene.input.setDefaultCursor('pointer'); 
            this.tooltipImage.setVisible(true);
            this.tooltipText.setVisible(true);
            
        });
        this.on('pointerout', () => { 
            this.scene.input.setDefaultCursor('default'); 
            this.tooltipImage.setVisible(false);
            this.tooltipText.setVisible(false);
        });
    }

    setTexture(texture: string) {
        this.cardImage.setTexture(texture);
    }

    showName(visible: boolean) {
        this.nameText.setVisible(visible);
    }

    hide() {
        this.setVisible(false);
    }

    getTrophyType(): TrophyType {
        return this.trophyType;
    }
}