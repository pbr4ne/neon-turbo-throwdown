import Phaser from 'phaser';

export default class Credits extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        const blockInput = this.scene.add.rectangle(960, 540, 1920, 1080, 0x000000, 0.5).setInteractive();
        this.add(blockInput);

        const background = this.scene.add.rectangle(0, 0, 900, 700, 0x000000, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, 0x00ffff);
        this.add(background);

        const creditsText = this.scene.add.text(-420, -320, "Credits:", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ffffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(creditsText);

        const developerText = this.scene.add.text(-420, -270, "Code Jockey: pbrane", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(developerText);

        const developerLink = this.scene.add.text(0, -270, "github", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ffff00',
        }).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            window.open('https://github.com/pbr4ne', '_blank');
        });
        this.add(developerLink);

        const writerText = this.scene.add.text(-420, -220, "Verbs & Vibes: James Funfer", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(writerText);

        const writerLink = this.scene.add.text(150, -220, "author page", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ffff00',
        }).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            window.open('https://jamesfunfer.com', '_blank');
        });
        this.add(writerLink);

        const uiArtistText = this.scene.add.text(-420, -170, "Design Nerd: Blake Mann", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(uiArtistText);

        const musicText = this.scene.add.text(-420, -120, "Throwdown Tunes: terranaut1066", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(musicText);

        const musicLink = this.scene.add.text(210, -120, "youtube", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ffff00',
        }).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            window.open('https://www.youtube.com/user/Kitchen1066', '_blank');
        });
        this.add(musicLink);

        const artistText = this.scene.add.text(-420, -70, "Rival Renderers: atgeaux", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(artistText);

        const artistLink = this.scene.add.text(100, -70, "instagram", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ffff00',
        }).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            window.open('https://www.instagram.com/artgeaux/', '_blank');
        });
        this.add(artistLink);

        const testerText = this.scene.add.text(-420, -20, "Court Testers: Julz", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(testerText);

        const tester1Text = this.scene.add.text(-120, 30, "Mystic", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(tester1Text);

        const tester2Text = this.scene.add.text(-120, 80, "Rhap", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(tester2Text);

        const tester3Text = this.scene.add.text(-120, 130, "Zelda", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(tester3Text);

        const thanksText = this.scene.add.text(-420, 180, "Special Thanks: Kakumeii", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#00ffff',
            align: 'left',
            wordWrap: { width: 860, useAdvancedWrap: true }
        });
        this.add(thanksText);

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
