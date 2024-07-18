import Phaser from 'phaser';
import { Library } from '../throwdown/Library';
import { log } from '../utilities/GameUtils';

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
        const sortedTrophies = trophies.slice().sort((a, b) => a.getName().localeCompare(b.getName()));
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
