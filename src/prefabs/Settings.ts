import Phaser from "phaser";
import { StorageManager } from "../utilities/StorageManager";

export default class Settings extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        const blockInput = this.scene.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.5).setOrigin(0.5, 0.5).setInteractive();
        this.add(blockInput);

        const background = this.scene.add.rectangle(0, 0, 500, 300, 0x000000, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, 0x00ffff);
        this.add(background);
    
        const titleText = this.scene.add.text(0, -120, "Settings", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ffff00',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        this.add(titleText);

        // Add the warning message
        const warningText = this.scene.add.text(0, 0, "*This is buggy. You might need to refresh your browser afterwards!*", {
            fontFamily: '"Press Start 2P"',
            fontSize: '14px',
            color: '#ff00ff',
            align: 'center',
            lineSpacing: 10,
            wordWrap: { width: 400, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);
        this.add(warningText);

        const questionText = this.scene.add.text(0, -80, "Do you want to hard reset your progress?", {
            fontFamily: '"Press Start 2P"',
            fontSize: '16px',
            color: '#ffffff',
            wordWrap: { width: 450, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);
        this.add(questionText);
    
        const yesButton = this.scene.add.text(-80, 100, "Yes", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        this.add(yesButton);

        const noButton = this.scene.add.text(80, 100, "No", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ff00ff',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        this.add(noButton);
    
        yesButton.on('pointerdown', async () => {
            await StorageManager.clearAllData();
            this.scene.scene.start("Preload");
            this.destroy();
            blockInput.destroy();
        });
    
        noButton.on('pointerdown', () => {
            this.destroy();
            blockInput.destroy();
        });
    }
}