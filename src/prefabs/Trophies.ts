import Phaser from 'phaser';
import { Library } from '../throwdown/Library';
import { log } from '../utilities/GameUtils';
import { TrophyKey } from '../trophies/TrophyKey';
import TextFactory from '../utilities/TextUtils';
import { Colours } from '../utilities/Colours';

export default class Trophies extends Phaser.GameObjects.Container {
    private tooltipImage!: Phaser.GameObjects.Image;
    private tooltipText!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        this.createBackground(scene);
        this.createTitle(scene);
        this.createTooltip(scene);
        this.displayTrophies(scene);
        this.createCloseButton(scene);
    }

    private createBackground(scene: Phaser.Scene) {
        const blockInput = scene.add.rectangle(0, 0, 1920, 1080, Colours.BLACK_HEX, 0.5).setInteractive().setOrigin(0.5, 0.5);
        this.add(blockInput);

        const background = scene.add.rectangle(0, 0, 900, 700, Colours.BLACK_HEX, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, Colours.CYAN_HEX);
        this.add(background);
    }

    private createTitle(scene: Phaser.Scene) {
        const titleText = TextFactory.createText(scene, 0, -320, "Trophies", {
            fontSize: '24px',
            color: Colours.WHITE_STRING,
            align: 'center'
        }).setOrigin(0.5, 0.5);
        this.add(titleText);
    }

    private createTooltip(scene: Phaser.Scene) {
        this.tooltipImage = scene.add.image(0, 0, 'tooltip').setVisible(false);
        this.tooltipText = TextFactory.createText(scene, 0, 0, '', {
            fontSize: '16px',
            color: Colours.YELLOW_STRING,
            lineSpacing: 15,
            wordWrap: { width: 350, useAdvancedWrap: true }
        }).setVisible(false);
        this.add(this.tooltipImage);
        this.add(this.tooltipText);
    }

    private displayTrophies(scene: Phaser.Scene) {
        log("library trophy types");
        const trophies = Library.getTrophyTypes();
        log(trophies.toString());

        //HACK
        const trophyOrder = [
            TrophyKey.CYAN_DECK, TrophyKey.YELLOW_DECK, TrophyKey.WHITE_DECK, TrophyKey.BLACK_DECK, TrophyKey.RED_DECK,
            TrophyKey.CARD_INSIGHT_1, TrophyKey.CARD_INSIGHT_2, TrophyKey.CARD_INSIGHT_3, TrophyKey.CARD_INSIGHT_4,
            TrophyKey.TARGET_INSIGHT_1, TrophyKey.TARGET_INSIGHT_2, TrophyKey.TARGET_INSIGHT_3, TrophyKey.TARGET_INSIGHT_4,
            TrophyKey.HEALTH_INSIGHT_1, TrophyKey.HEALTH_INSIGHT_2, TrophyKey.HEALTH_INSIGHT_3, TrophyKey.HEALTH_INSIGHT_4,
            TrophyKey.INCREASE_HP_1, TrophyKey.INCREASE_HP_2,
            TrophyKey.HEALTH_REGEN_1, TrophyKey.HEALTH_REGEN_2, TrophyKey.HEALTH_REGEN_3,
            TrophyKey.RESURRECT_1,
            TrophyKey.IDLE_SPEED_1, TrophyKey.IDLE_SPEED_2, TrophyKey.IDLE_SPEED_3, TrophyKey.IDLE_SPEED_4,
            TrophyKey.OFFENSIVE_STRATEGY_1, TrophyKey.DEFENSIVE_STRATEGY_1, TrophyKey.HEAL_STRATEGY_1,
            TrophyKey.THROW_2, TrophyKey.THROW_3, TrophyKey.THROW_4, TrophyKey.THROW_5, TrophyKey.THROW_6,
            TrophyKey.BLOCK_2, TrophyKey.BLOCK_3, TrophyKey.BLOCK_4, TrophyKey.BLOCK_5,
            TrophyKey.EVADE_2, TrophyKey.EVADE_3, TrophyKey.EVADE_4,
            TrophyKey.CATCH_2, TrophyKey.CATCH_3,
        ];

        const sortedTrophies = trophies.slice().sort((a, b) => trophyOrder.indexOf(a.getKey()) - trophyOrder.indexOf(b.getKey()));
        log(sortedTrophies.toString());

        const maxPopupHeight = 700;
        const titleHeight = 40;
        const closeButtonHeight = 40;
        const availableHeight = maxPopupHeight - titleHeight - closeButtonHeight - 60;
        const lineHeight = 30;
        const maxLines = Math.floor(availableHeight / lineHeight);

        let fontSize = '18px';
        if (sortedTrophies.length > maxLines * 2) {
            fontSize = `${Math.floor((availableHeight / (sortedTrophies.length / 2)) * 0.6)}px`;
        }

        let yPos = -260;
        let leftColumn = true;
        const columnOffset = 400;

        sortedTrophies.forEach((trophy, index) => {
            log(`trophy: ${trophy.getName()}`);
            const xPos = leftColumn ? -columnOffset : 0;
            const trophyText = TextFactory.createText(scene, xPos, yPos, `${trophy.getName()}`, {
                fontSize: fontSize,
                color: Colours.CYAN_STRING,
                wordWrap: { width: 380, useAdvancedWrap: true }
            }).setOrigin(0, 0);
            this.add(trophyText);

            trophyText.setInteractive({ useHandCursor: true });
            trophyText.on('pointerover', () => this.showTooltip(trophy.getDescription(), trophyText));
            trophyText.on('pointerout', () => this.hideTooltip());

            yPos += parseInt(fontSize) + 5;

            if (index === Math.floor(sortedTrophies.length / 2) - 1) {
                yPos = -260;
                leftColumn = false;
            }
        });
    }

    private createCloseButton(scene: Phaser.Scene) {
        const closeButton = TextFactory.createText(scene, 0, 320, "Close", {
            fontSize: '20px',
            color: Colours.MAGENTA_STRING,
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });

        closeButton.on('pointerdown', () => this.destroy());
        closeButton.on('pointerover', () => scene.input.setDefaultCursor('pointer'));
        closeButton.on('pointerout', () => scene.input.setDefaultCursor('default'));

        this.add(closeButton);
    }

    private showTooltip(description: string, trophyText: Phaser.GameObjects.Text) {
        this.tooltipText.setText(description);
        let fontSize = 16;

        while (this.tooltipText.height + 90 > this.tooltipImage.height) {
            fontSize--;
            this.tooltipText.setStyle({ fontSize: `${fontSize}px` });
        }

        const x = trophyText.x + trophyText.width / 2;
        const y = trophyText.y - this.tooltipText.height - 10;

        this.tooltipImage.setPosition(x, y);
        this.tooltipText.setPosition(x - 170, y - 80);

        this.tooltipImage.setVisible(true);
        this.tooltipText.setVisible(true);

        this.bringToTop(this.tooltipImage);
        this.bringToTop(this.tooltipText);
    }

    private hideTooltip() {
        this.tooltipImage.setVisible(false);
        this.tooltipText.setVisible(false);
    }
}
