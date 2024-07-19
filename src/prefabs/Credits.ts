import Phaser from 'phaser';

export default class Credits extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        const blockInput = this.scene.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.5).setInteractive().setOrigin(0.5, 0.5);
        this.add(blockInput);

        const background = this.scene.add.rectangle(0, 0, 900, 700, 0x000000, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, 0x00ffff);
        this.add(background);

        const titleText = this.scene.add.text(0, -320, "Credits", {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5, 0.5);
        this.add(titleText);

        const creditEntries = [
            { title: "Code Jockey:", text: "pbrane", linkText: "github", link: "https://github.com/pbr4ne" },
            { title: "Verbs & Turbs:", text: "James Funfer", linkText: "author page", link: "https://jamesfunfer.com" },
            { title: "Design Nerd:", text: "Blake Mann", linkText: "", link: "" },
            { title: "Gam Design:", text: "pbrane, James Funfer, Travis", linkText: "", link: "" },
            { title: "Throwdown Tunes:", text: "terranaut1066", linkText: "youtube", link: "https://www.youtube.com/user/Kitchen1066" },
            { title: "Rival Renderers:", text: "atgeaux", linkText: "instagram", link: "https://www.instagram.com/artgeaux/" },
            { title: "", text: "David Baumgart", linkText: "portfolio", link: "https://davidportfolio.com" },
            { title: "", text: "pbrane", linkText: "", link: "" },
            { title: "Court Testers:", text: "Julz", text2: "Mystic", linkText: "", link: "" },
            { title: "", text: "Rhap", text2: "Zelda", linkText: "", link: "" },
            { title: "Special Thanks:", text: "Kakumeii", linkText: "", link: "" }
        ];

        let yPos = -270;
        const titleX = -420;
        const textX = -100;
        const linkX = 200;

        creditEntries.forEach(entry => {
            const titleText = this.scene.add.text(titleX, yPos, entry.title, {
                fontFamily: '"Press Start 2P"',
                fontSize: '18px', 
                color: '#ff00ff', 
                align: 'left',
                wordWrap: { width: 860, useAdvancedWrap: true }
            });
            this.add(titleText);

            const entryText = this.scene.add.text(textX, yPos, entry.text, {
                fontFamily: '"Press Start 2P"',
                fontSize: '18px', 
                color: '#00ffff',
                align: 'left',
                wordWrap: { width: 860, useAdvancedWrap: true }
            });
            this.add(entryText);

            if (entry.linkText && entry.link) {
                const linkText = this.scene.add.text(linkX, yPos, entry.linkText, {
                    fontFamily: '"Press Start 2P"',
                    fontSize: '18px',
                    color: '#ffff00',
                    align: 'left'
                }).setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                    window.open(entry.link, '_blank');
                });
                this.add(linkText);
            }

            if (entry.text2) {
                const entryText2 = this.scene.add.text(linkX, yPos, entry.text2, {
                    fontFamily: '"Press Start 2P"',
                    fontSize: '18px',
                    color: '#00ffff',
                    align: 'left',
                    wordWrap: { width: 860, useAdvancedWrap: true }
                });
                this.add(entryText2);
            }
            yPos += 50;
        });

        const closeButton = this.scene.add.text(0, 320, "Close", {
            fontFamily: '"Press Start 2P"',
            fontSize: '18px', 
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
