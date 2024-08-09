import Phaser from "phaser";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class HelpPermUpgrade extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        this.createBackground(scene);
        this.createText(scene);
        this.createCloseButton(scene);
    }

    private createBackground(scene: Phaser.Scene) {
        const blockInput = scene.add.rectangle(0, 0, 1920, 1080, Colours.BLACK_HEX, 0.5).setOrigin(0.5, 0.5).setInteractive();
        this.add(blockInput);

        const background = scene.add.rectangle(0, 0, 800, 700, Colours.BLACK_HEX, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, Colours.CYAN_HEX);
        this.add(background);

        const coachImage = scene.add.image(270, -180, "spirit");
        this.add(coachImage);
    }

    private createText(scene: Phaser.Scene) {
        const textConfigs = [
            { x: -370, y: -320, text: "Help from the Turbovoid:", fontSize: '30px', wordWrapWidth: 760 },
            { x: -370, y: -230, text: `You will lose your current deck to the vast infiniteness of the turbovoid.`, wordWrapWidth: 560 },
            { x: -370, y: -70, text: `These participation trophies are permanent upgrades to your starting deck, your players or your vibes.`, wordWrapWidth: 680 },
            { x: -370, y: 115, text: `...were you waiting for something?`, wordWrapWidth: 760 },
            { x: -370, y: 175, text: `Oh. We don't say the Throwdown catchphrase in the Turbovoid.`, wordWrapWidth: 760 }
        ];

        textConfigs.forEach(config => {
            const text = TextFactory.createText(scene, config.x, config.y, config.text, {
                fontSize: config.fontSize || '20px',
                color: Colours.CYAN_STRING,
                lineSpacing: 5,
                wordWrap: { width: config.wordWrapWidth, useAdvancedWrap: true }
            });
            this.add(text);
        });
    }

    private createCloseButton(scene: Phaser.Scene) {
        const closeButton = TextFactory.createText(scene, 0, 320, "Close", {
            color: Colours.MAGENTA_STRING,
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });

        closeButton.on('pointerdown', () => {
            this.destroy();
        });

        closeButton.on('pointerover', () => {
            scene.input.setDefaultCursor('pointer');
        });

        closeButton.on('pointerout', () => {
            scene.input.setDefaultCursor('default');
        });

        this.add(closeButton);
    }
}

