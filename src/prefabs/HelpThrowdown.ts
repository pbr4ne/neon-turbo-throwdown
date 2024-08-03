import Phaser from "phaser";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class HelpThrowdown extends Phaser.GameObjects.Container {
    private onCloseCallback: () => void;

    constructor(scene: Phaser.Scene, onCloseCallback: () => void) {
        super(scene, 960, 540);

        this.onCloseCallback = onCloseCallback;

        this.createBackground(scene);
        this.createText(scene);
        this.createCloseButton(scene);
    }

    private createBackground(scene: Phaser.Scene) {
        const blockInput = scene.add.rectangle(0, 0, 1920, 1080, Colours.BLACK_HEX, 0.5).setOrigin(0.5, 0.5).setInteractive();
        this.add(blockInput);

        const background = scene.add.rectangle(0, 0, 900, 800, Colours.BLACK_HEX, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, Colours.CYAN_HEX);
        this.add(background);

        const coachImage = scene.add.image(330, -230, "coach");
        this.add(coachImage);
    }

    private createText(scene: Phaser.Scene) {
        const textConfigs = [
            { x: -420, y: -370, text: "Here, watch this tutor-reel:", fontSize: '30px', wordWrapWidth: 860 },
            { x: -420, y: -330, text: `\nDraw 5 cards, then select a card, assign it to a player, and if it's an attack, select an opponent. When you're ready, THROW DOWN!`, wordWrapWidth: 680 },
            { x: -420, y: -150, text: `Your initial deck has:`, wordWrapWidth: 860 },
            { x: -420, y: -80, text: `Test them out and see what they do!`, wordWrapWidth: 860 },
            { x: -420, y: -30, text: `Try out idle mode if you want your players to make their own decisions!`, wordWrapWidth: 860 },
            { x: -420, y: 50, text: `Alright kid, that's the tutor-reel. And if you're not sure what to do out there, just remember the three rules of Throwdown:`, wordWrapWidth: 860 },
            { x: -420, y: 120, text: `\n* Evasion\n* Envision - You gotta see victory in your brain\n* Evasion again, in case you forgot`, wordWrapWidth: 860, color: Colours.YELLOW_STRING }
        ];

        textConfigs.forEach(config => {
            const text = TextFactory.createText(scene, config.x, config.y, config.text, {
                fontSize: config.fontSize || '20px',
                color: config.color || Colours.CYAN_STRING,
                lineSpacing: 5,
                wordWrap: { width: config.wordWrapWidth, useAdvancedWrap: true }
            });
            this.add(text);
        });

        this.createInlineText(scene, -420, -115);
    }

    private createInlineText(scene: Phaser.Scene, x: number, y: number) {
        const textParts = [
            { text: 'THROW', color: Colours.MAGENTA_STRING },
            { text: ', ', color: Colours.CYAN_STRING },
            { text: 'BLOCK', color: Colours.MAGENTA_STRING },
            { text: ', ', color: Colours.CYAN_STRING },
            { text: 'EVADE', color: Colours.MAGENTA_STRING },
            { text: ', and ', color: Colours.CYAN_STRING },
            { text: 'CATCH', color: Colours.MAGENTA_STRING },
            { text: 'cards.', color: Colours.CYAN_STRING }
        ];

        textParts.forEach(part => {
            const text = TextFactory.createText(scene, x, y, part.text, {
                color: part.color,
                lineSpacing: 5,
                wordWrap: { width: 860, useAdvancedWrap: true }
            }).setOrigin(0, 0);
            this.add(text);

            if (part.text === ", " || part.text === ", and " || part.text === "CATCH") {
                x += 15;
            }
            x += text.width;
        });
    }

    private createCloseButton(scene: Phaser.Scene) {
        const closeButton = TextFactory.createText(scene, 0, 320, "Close", {
            color: Colours.MAGENTA_STRING,
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });

        closeButton.on('pointerdown', () => {
            this.destroy();
            this.onCloseCallback();
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
