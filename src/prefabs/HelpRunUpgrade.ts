import Phaser from "phaser";

export default class HelpRunUpgrade extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        const blockInput = this.scene.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.5).setOrigin(0.5, 0.5).setInteractive();
        this.add(blockInput);

        const background = this.scene.add.rectangle(0, 0, 900, 700, 0x000000, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, 0x00ffff);
        this.add(background);

		const coachImage = this.scene.add.image(330, -180, "coach")
		this.add(coachImage);

        const creditsText = this.scene.add.text(-420, -320, "Here, watch this tutor-reel:", {
            fontFamily: '"Press Start 2P"',
            fontSize: '30px',
            color: '#ffffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(creditsText);

        const helpText1 = this.scene.add.text(-420, -260, `You beat that coach!`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
			lineSpacing: 5,
            wordWrap: { width: 680, useAdvancedWrap: true }
        });
        this.add(helpText1);

		const helpText2 = this.scene.add.text(-420, -200, `Now you can yoink cards from their deck to add to yours, OR upgrade some of your own.`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
			lineSpacing: 5,
            wordWrap: { width: 680, useAdvancedWrap: true }
        });
        this.add(helpText2);

		const helpText2b = this.scene.add.text(-420, -100, `Watch out kid, because when you die,`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
			lineSpacing: 5,
            wordWrap: { width: 680, useAdvancedWrap: true }
        });
        this.add(helpText2b);

        const helpText1post = this.scene.add.text(-325, -75, `you die in real life!`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ff00ff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });

        this.add(helpText1post);

		const helpText2c = this.scene.add.text(-420, -35, `I mean... you lose all of the cards you nabbed. But don't worry, you'll get a little something to help you out on your next attempt.`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
			lineSpacing: 5,
            wordWrap: { width: 860, useAdvancedWrap: true }
        });

        this.add(helpText2c);
		

		const helpText3 = this.scene.add.text(-420, 115, `Say it with me, kid!`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            lineSpacing: 5,
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(helpText3);

		const helpText4 = this.scene.add.text(-420, 155, `
            * Evasion
            \n* Envision
            \n* Evasion again`, {
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
