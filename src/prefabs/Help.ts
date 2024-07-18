import Phaser from "phaser";

export default class Help extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        const blockInput = this.scene.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.5).setOrigin(0.5, 0.5).setInteractive();
        this.add(blockInput);

        const background = this.scene.add.rectangle(0, 0, 900, 700, 0x000000, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, 0x00ffff);
        this.add(background);

		const coachImage = this.scene.add.image(340, -200, "coach")
		this.add(coachImage);

        const creditsText = this.scene.add.text(-420, -320, "Here, watch this tutor-reel:", {
            fontFamily: '"Press Start 2P"',
            fontSize: '30px',
            color: '#ffffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(creditsText);

        const helpText1 = this.scene.add.text(-420, -280, `\nDraw 5 cards, then select a card, assign it to a player, and if it's an attack, select an opponent. When you're ready, THROW DOWN!`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
			lineSpacing: 5,
            wordWrap: { width: 680, useAdvancedWrap: true }
        });
        this.add(helpText1);

		const helpText2 = this.scene.add.text(-420, -90, `Your initial deck has THROW, BLOCK, EVADE, and CATCH cards. Test them out and see what they do!`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
			lineSpacing: 5,
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(helpText2);

		const helpText3 = this.scene.add.text(-420, 20, `Alright kid, that's the tutor-reel. And if you're not sure what to do out there, just remember the three rules of Throwdown:`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(helpText3);

		const helpText4 = this.scene.add.text(-420, 90, `
            * Evasion
            \n* Envision - You gotta see victory in your brain 
            \n* Evasion again in case you forgot`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ffff00',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(helpText4);

		

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
