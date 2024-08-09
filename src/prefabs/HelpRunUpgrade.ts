import Phaser from "phaser";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class HelpRunUpgrade extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        this.createBackground(scene);
        this.createTexts(scene);
        this.createCloseButton(scene);
    }

    private createBackground(scene: Phaser.Scene) {
        const blockInput = scene.add.rectangle(0, 0, 1920, 1080, Colours.BLACK_HEX, 0.5).setOrigin(0.5, 0.5).setInteractive();
        this.add(blockInput);

        const background = scene.add.rectangle(0, 0, 900, 700, Colours.BLACK_HEX, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, Colours.CYAN_HEX);
        this.add(background);

        const coachImage = scene.add.image(330, -180, "coach");
        this.add(coachImage);
    }

    private createTexts(scene: Phaser.Scene) {
        const texts = [
            { x: -420, y: -320, text: "Here, watch this tutor-reel:", fontSize: '30px', color: Colours.WHITE_STRING, wordWrap: { width: 860, useAdvancedWrap: true } },
            { x: -420, y: -260, text: "You beat that coach!", color: Colours.CYAN_STRING, wordWrap: { width: 680, useAdvancedWrap: true } },
            { x: -420, y: -200, text: "Now you can yoink cards from their deck to add to yours, OR upgrade some of your own.", color: Colours.CYAN_STRING, wordWrap: { width: 680, useAdvancedWrap: true } },
            { x: -420, y: -100, text: "Watch out kid, because when you die,", color: Colours.CYAN_STRING, wordWrap: { width: 680, useAdvancedWrap: true } },
            { x: -325, y: -75, text: "you die in real life!", color: Colours.MAGENTA_STRING, wordWrap: { width: 860, useAdvancedWrap: true } },
            { x: -420, y: -35, text: "I mean... you lose all of the cards you nabbed. But don't worry, you'll get a little something to help you out on your next attempt.", color: Colours.CYAN_STRING, wordWrap: { width: 860, useAdvancedWrap: true } },
            { x: -420, y: 115, text: "Say it with me, kid!", color: Colours.CYAN_STRING, wordWrap: { width: 860, useAdvancedWrap: true } },
            { x: -420, y: 155, text: "* Evasion\n* Envision\n* Evasion again", color: Colours.YELLOW_STRING, wordWrap: { width: 860, useAdvancedWrap: true } }
        ];

        texts.forEach(config => {
            const text = TextFactory.createText(scene, config.x, config.y, config.text, {
                fontSize: config.fontSize || '20px',
                color: config.color,
                lineSpacing: 5,
                wordWrap: config.wordWrap
            });
            this.add(text);
        });
    }

    private createCloseButton(scene: Phaser.Scene) {
        const closeButton = TextFactory.createText(scene, 0, 320, "Close", {
            fontSize: '20px',
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
