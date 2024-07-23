import Phaser from "phaser";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class HelpThrowdown extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        const blockInput = this.scene.add.rectangle(0, 0, 1920, 1080, Colours.BLACK_HEX, 0.5).setOrigin(0.5, 0.5).setInteractive();
        this.add(blockInput);

        const background = this.scene.add.rectangle(0, 0, 900, 800, Colours.BLACK_HEX, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, Colours.CYAN_HEX);
        this.add(background);

        const coachImage = this.scene.add.image(330, -230, "coach");
        this.add(coachImage);

        const creditsText = TextFactory.createText(this.scene, -420, -370, "Here, watch this tutor-reel:", {
            fontSize: '30px',
            color: Colours.WHITE_STRING,
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(creditsText);

        const helpText1 = TextFactory.createText(this.scene, -420, -330, `\nDraw 5 cards, then select a card, assign it to a player, and if it's an attack, select an opponent. When you're ready, THROW DOWN!`, {
            color: Colours.CYAN_STRING,
            lineSpacing: 5,
            wordWrap: { width: 680, useAdvancedWrap: true }
        });
        this.add(helpText1);

        const helpText1post = TextFactory.createText(this.scene, -420, -150, `Your initial deck has:`, {
            color: Colours.CYAN_STRING,
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(helpText1post);

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

        let xPos = -420;
        const yPos = -115;

        textParts.forEach(part => {
            const text = TextFactory.createText(this.scene, xPos, yPos, part.text, {
                color: part.color,
                lineSpacing: 5,
                wordWrap: { width: 860, useAdvancedWrap: true }
            }).setOrigin(0, 0);
            this.add(text);

            if (part.text === ", " || part.text === ", and " || part.text == "CATCH") {
                xPos += 15;
            }
            xPos += text.width;
        });

        const helpText2b = TextFactory.createText(this.scene, -420, -80, `Test them out and see what they do!`, {
            color: Colours.CYAN_STRING,
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(helpText2b);

        const helpText2c = TextFactory.createText(this.scene, -420, -30, `Try out idle mode if you want your players to make their own decisions!`, {
            color: Colours.CYAN_STRING,
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(helpText2c);

        const helpText3 = TextFactory.createText(this.scene, -420, 50, `Alright kid, that's the tutor-reel. And if you're not sure what to do out there, just remember the three rules of Throwdown:`, {
            color: Colours.CYAN_STRING,
            lineSpacing: 5,
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(helpText3);

        const helpText4 = TextFactory.createText(this.scene, -420, 120, `
            * Evasion
            \n* Envision - You gotta see victory in your brain 
            \n* Evasion again, in case you forgot`, {
            color: Colours.YELLOW_STRING,
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(helpText4);

        const closeButton = TextFactory.createText(this.scene, 0, 320, "Close", {
            color: Colours.MAGENTA_STRING,
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
