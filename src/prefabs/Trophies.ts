import Phaser from 'phaser';
import { Library } from '../throwdown/Library';
import { log } from '../utilities/GameUtils';
import { TrophyKey } from '../trophies/TrophyKey';

export default class Trophies extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        const blockInput = this.scene.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.5).setInteractive().setOrigin(0.5, 0.5);
        this.add(blockInput);

        const background = this.scene.add.rectangle(0, 0, 900, 700, 0x000000, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, 0x00ffff);
        this.add(background);

        const titleText = this.scene.add.text(0, -320, "Trophies", {
            fontFamily: '"Press Start 2P"',
            fontSize: '24px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        this.add(titleText);

        log("library trophy types");
        const trophies = Library.getTrophyTypes();
        log(trophies.toString());

        //HACK
        const trophyOrder = [
            TrophyKey.CYAN_DECK,
            TrophyKey.YELLOW_DECK,
            TrophyKey.WHITE_DECK,
            TrophyKey.BLACK_DECK,
            TrophyKey.RED_DECK,

            TrophyKey.CARD_INSIGHT_1,
            TrophyKey.CARD_INSIGHT_2,
            TrophyKey.CARD_INSIGHT_3,
            TrophyKey.CARD_INSIGHT_4,

            TrophyKey.TARGET_INSIGHT_1,
            TrophyKey.TARGET_INSIGHT_2,
            TrophyKey.TARGET_INSIGHT_3,
            TrophyKey.TARGET_INSIGHT_4,

            TrophyKey.HEALTH_INSIGHT_1,
            TrophyKey.HEALTH_INSIGHT_2,
            TrophyKey.HEALTH_INSIGHT_3,
            TrophyKey.HEALTH_INSIGHT_4,

            TrophyKey.INCREASE_HP_1,
            TrophyKey.INCREASE_HP_2,

            TrophyKey.HEALTH_REGEN_1,
            TrophyKey.HEALTH_REGEN_2,
            TrophyKey.HEALTH_REGEN_3,

            TrophyKey.RESURRECT_1,

            TrophyKey.IDLE_SPEED_1,
            TrophyKey.IDLE_SPEED_2,
            TrophyKey.IDLE_SPEED_3,
            TrophyKey.IDLE_SPEED_4,
            TrophyKey.OFFENSIVE_STRATEGY_1,
            TrophyKey.DEFENSIVE_STRATEGY_1,
            TrophyKey.HEAL_STRATEGY_1,

            TrophyKey.THROW_2,
            TrophyKey.THROW_3,
            TrophyKey.THROW_4,
            TrophyKey.THROW_5,
            TrophyKey.THROW_6,

            TrophyKey.BLOCK_2,
            TrophyKey.BLOCK_3,
            TrophyKey.BLOCK_4,
            TrophyKey.BLOCK_5,

            TrophyKey.EVADE_2,
            TrophyKey.EVADE_3,
            TrophyKey.EVADE_4,

            TrophyKey.CATCH_2,
            TrophyKey.CATCH_3,
        ];

        const sortedTrophies = trophies.slice().sort((a, b) => {
            return trophyOrder.indexOf(a.getKey()) - trophyOrder.indexOf(b.getKey());
        });

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
            const trophyText = this.scene.add.text(xPos, yPos, `${trophy.getName()}`, {
                fontFamily: '"Press Start 2P"',
                fontSize: fontSize,
                color: '#00ffff',
                wordWrap: { width: 380, useAdvancedWrap: true }
            }).setOrigin(0, 0);
            this.add(trophyText);
            yPos += parseInt(fontSize) + 5;

            if (index === Math.floor(sortedTrophies.length / 2) - 1) {
                yPos = -260;
                leftColumn = false;
            }
        });

        const closeButton = this.scene.add.text(0, 320, "Close", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ff00ff',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });

        closeButton.on('pointerdown', () => {
            this.destroy();
        });

        closeButton.on('pointerover', () => {
            this.scene.input.setDefaultCursor('pointer');
        });

        closeButton.on('pointerout', () => {
            this.scene.input.setDefaultCursor('default');
        });

        this.add(closeButton);
    }
}
