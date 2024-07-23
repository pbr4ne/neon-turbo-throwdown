import Phaser from "phaser";
import { StorageManager } from "../utilities/StorageManager";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class Settings extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        this.createBackground(scene);
        this.createText(scene);
        this.createButtons(scene);
    }

    private createBackground(scene: Phaser.Scene) {
        const blockInput = scene.add.rectangle(0, 0, 1920, 1080, Colours.BLACK_HEX, 0.5).setOrigin(0.5, 0.5).setInteractive();
        this.add(blockInput);

        const background = scene.add.rectangle(0, 0, 500, 300, Colours.BLACK_HEX, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, Colours.CYAN_HEX);
        this.add(background);
    }

    private createText(scene: Phaser.Scene) {
        const texts = [
            { x: 0, y: -120, text: "Settings", fontSize: '20px', color: Colours.YELLOW_STRING },
            { x: 0, y: 0, text: "*This is buggy. You might need to refresh your browser afterwards!*", fontSize: '14px', color: Colours.MAGENTA_STRING, lineSpacing: 10, wordWrap: { width: 400, useAdvancedWrap: true } },
            { x: 0, y: -80, text: "Do you want to hard reset your progress?", fontSize: '16px', color: Colours.WHITE_STRING, wordWrap: { width: 450, useAdvancedWrap: true } }
        ];

        texts.forEach(config => {
            const text = TextFactory.createText(scene, config.x, config.y, config.text, {
                fontSize: config.fontSize,
                color: config.color,
                align: 'center',
                lineSpacing: config.lineSpacing,
                wordWrap: config.wordWrap
            }).setOrigin(0.5, 0.5);
            this.add(text);
        });
    }

    private createButtons(scene: Phaser.Scene) {
        const yesButton = this.createButton(scene, -80, 100, "Yes", Colours.CYAN_STRING, async () => {
            await StorageManager.clearAllData();
            this.scene.scene.start("Preload");
            this.destroy();
        });

        const noButton = this.createButton(scene, 80, 100, "No", Colours.MAGENTA_STRING, () => {
            this.destroy();
        });

        this.add(yesButton);
        this.add(noButton);
    }

    private createButton(scene: Phaser.Scene, x: number, y: number, text: string, color: string, callback: () => void) {
        const button = TextFactory.createText(scene, x, y, text, {
            fontSize: '20px',
            color: color,
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });

        button.on('pointerdown', callback);

        button.on('pointerover', () => {
            scene.input.setDefaultCursor('pointer');
        });

        button.on('pointerout', () => {
            scene.input.setDefaultCursor('default');
        });

        return button;
    }
}
