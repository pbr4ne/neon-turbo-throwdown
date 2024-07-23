import { CardType } from "../cards/CardType";
import GenericCard from "./GenericCard";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class Upgrade extends GenericCard {
    private upgradeImage: Phaser.GameObjects.Image;
    private cardType: CardType;
    private nameText: Phaser.GameObjects.Text;
    private tooltipText: Phaser.GameObjects.Text;
    private iconImage?: Phaser.GameObjects.Image;
    private tooltipImage: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, cardType: CardType, x?: number, y?: number, texture?: string, showIcon: boolean = true, permanent: boolean = false) {
        super(scene, x ?? 155, y ?? 139, texture);

        this.cardType = cardType;
        const upgradeCard = cardType.getUpgrade();

        this.upgradeImage = scene.add.image(0, 0, texture || "trophy");
        this.add(this.upgradeImage);

        if (upgradeCard && showIcon) {
            this.iconImage = scene.add.image(0, -30, upgradeCard.getIcon());
        }

        this.tooltipImage = scene.add.image(0, -205, 'tooltip');
        this.tooltipImage.setVisible(false);

        this.nameText = TextFactory.createText(scene, 0, 64, upgradeCard?.getName() ?? 'unknown', {
            fontSize: '14px',
            color: Colours.YELLOW_STRING,
            align: 'center',
            wordWrap: { width: 110, useAdvancedWrap: true }
        });
        this.nameText.setOrigin(0.5, 0.5);

        const prefix = permanent ? 'Permanently upgrades' : 'Upgrades';
        const description = `${prefix} one ${cardType.getName()} in your deck to ${upgradeCard?.getName()} (${upgradeCard?.getDescription() ?? 'unknown'})`;

        this.tooltipText = TextFactory.createText(scene, 5, -275, description, {
            fontSize: '16px',
            color: Colours.CYAN_STRING,
            lineSpacing: 15,
            align: 'left',
            wordWrap: { width: 350, useAdvancedWrap: true }
        });
        this.tooltipText.setOrigin(0.5, 0);
        this.tooltipText.setVisible(false);

        let fontSize = 16;
        while (this.tooltipText.height + 90 > this.tooltipImage.height) {
            fontSize--;
            this.tooltipText.setStyle({ fontSize: `${fontSize}px` });
        }

        this.setSize(this.upgradeImage.width, this.upgradeImage.height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.upgradeImage.width, this.upgradeImage.height), Phaser.Geom.Rectangle.Contains);

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

        this.add([this.upgradeImage, this.nameText, this.tooltipImage, this.tooltipText]);
        if (this.iconImage) {
            this.add(this.iconImage);
        }
    }

    public getCardType(): CardType {
        return this.cardType;
    }
}
