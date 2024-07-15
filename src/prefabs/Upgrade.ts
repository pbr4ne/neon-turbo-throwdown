
import { CardType } from "../cards/CardType";
import GenericCard from "./GenericCard";
import { log } from "../utilities/GameUtils";

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
		let upgradeCard = cardType.getUpgrade();

		this.upgradeImage = new Phaser.GameObjects.Image(scene, 0, 0, texture || "trophy");
        this.add(this.upgradeImage);

		if (upgradeCard && showIcon) {
			this.iconImage = new Phaser.GameObjects.Image(scene, 0, -30, upgradeCard.getIcon());
		}
        this.tooltipImage = new Phaser.GameObjects.Image(scene, 0, -205, 'tooltip');
		this.tooltipImage.setVisible(false);

		this.nameText = new Phaser.GameObjects.Text(scene, 0, 64, upgradeCard?.getName() ?? 'unknown', {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '14px',
            color: '#ffff00',
            padding: { x: 5, y: 5 },
            align: 'center'
        });
        this.nameText.setOrigin(0.5, 0.5);
        this.nameText.setWordWrapWidth(100);

		const prefix = permanent ? 'Permanently upgrades' : 'Upgrades';
		const description = `${prefix} one ${cardType.getName()} in your deck to ${upgradeCard?.getName()} (${upgradeCard?.getDescription() ?? 'unknown'})`;

		let fontSize = 16;

        this.tooltipText = new Phaser.GameObjects.Text(scene, 5, -275, description, {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '16px',
            color: '#00ffff',
            lineSpacing: 15,
            padding: { x: 5, y: 5 },
            align: 'left',
            wordWrap: { width: 350, useAdvancedWrap: true }
        });
        this.tooltipText.setOrigin(0.5, 0);

        while (this.tooltipText.height + 90 > this.tooltipImage.height) {
            fontSize--;
            this.tooltipText.setStyle({ fontSize: `${fontSize}px` });
        }

		this.tooltipText.setVisible(false);

		this.setSize(this.upgradeImage.width, this.upgradeImage.height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.upgradeImage.width, this.upgradeImage.height), Phaser.Geom.Rectangle.Contains);

		this.on('pointerover', () => { 
			this.scene.input.setDefaultCursor('pointer'); 
			this.tooltipImage.setVisible(true);
			this.tooltipText.setVisible(true);
			//log(`mouse over ${this.toString()}`)
		});
		this.on('pointerout', () => { 
			this.scene.input.setDefaultCursor('default'); 
			this.tooltipImage.setVisible(false);
			this.tooltipText.setVisible(false);
		});
		// this.scene.children.remove(this);
		// this.scene.children.add(this);

		this.add([this.upgradeImage, this.nameText, this.tooltipImage, this.tooltipText]);
		if (this.iconImage) {
			this.add(this.iconImage);
		}
	}

	public getCardType(): CardType {
		return this.cardType;
	}

}