import Phaser from "phaser";

export default class HelpPermUpgrade extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        const blockInput = this.scene.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.5).setOrigin(0.5, 0.5).setInteractive();
        this.add(blockInput);

        const background = this.scene.add.rectangle(0, 0, 800, 700, 0x000000, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, 0x00ffff);
        this.add(background);

		const coachImage = this.scene.add.image(270, -180, "spirit")
		this.add(coachImage);

        const creditsText = this.scene.add.text(-370, -320, "Help from the Turbovoid:", {
            fontFamily: '"Press Start 2P"',
            fontSize: '30px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 760, useAdvancedWrap: true }
        });
        this.add(creditsText);

		const helpText2 = this.scene.add.text(-370, -230, `You will lose your current deck to the vast infiniteness of the turbovoid.`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
			lineSpacing: 5,
            wordWrap: { width: 560, useAdvancedWrap: true }
        });
        this.add(helpText2);

        const helpText1 = this.scene.add.text(-370, -70, `These participation trophies are permanent upgrades to your starting deck, your players or your vibes.`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
			lineSpacing: 5,
            wordWrap: { width: 680, useAdvancedWrap: true }
        });
        this.add(helpText1);

		const helpText5 = this.scene.add.text(-370, 115, `...Were you waiting for something?`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            lineSpacing: 5,
            wordWrap: { width: 760, useAdvancedWrap: true }
        });
        this.add(helpText5);

		const helpText3 = this.scene.add.text(-370, 175, `Oh. We don't say the Throwdown catchphrase in the Turbovoid.`, {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            lineSpacing: 5,
            wordWrap: { width: 760, useAdvancedWrap: true }
        });
        this.add(helpText3);

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
