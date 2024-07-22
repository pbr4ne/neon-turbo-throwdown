import Phaser from 'phaser';
import TextFactory from '../utilities/TextUtils';

export default class Credits extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        const blockInput = this.scene.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.5).setInteractive().setOrigin(0.5, 0.5);
        this.add(blockInput);

        const background = this.scene.add.rectangle(0, 0, 900, 700, 0x000000, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, 0x00ffff);
        this.add(background);

        const titleText = TextFactory.createText(this.scene, 0, -320, "Credits", {
            fontSize: '20px',
            color: '#ffffff'
        });
        titleText.setOrigin(0.5, 0.5);
        this.add(titleText);

        const creditEntries = [
            { title: "Code Jockey:", text: "pbrane", linkText: "github", link: "https://github.com/pbr4ne" },
            { title: "Verbs & Turbs:", text: "James Funfer", linkText: "author page", link: "https://jamesfunfer.com" },
            { title: "Design Nerd:", text: "Blake Mann", linkText: "", link: "" },
            { title: "Gam Design:", text: "pbrane, James Funfer, Travis", linkText: "", link: "" },
            { title: "Throwdown Tunes:", text: "terranaut1066", linkText: "youtube", link: "https://www.youtube.com/user/Kitchen1066" },
            { title: "Rival Renderers:", text: "artgeaux", linkText: "instagram", link: "https://www.instagram.com/artgeaux/" },
            { title: "", text: "David Baumgart", linkText: "website", link: "https://www.dgbaumgart.com/" },
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
            const titleText = TextFactory.createText(this.scene, titleX, yPos, entry.title, {
                fontSize: '18px',
                color: '#ff00ff'
            });
            titleText.setOrigin(0, 0);
            this.add(titleText);

            const entryText = TextFactory.createText(this.scene, textX, yPos, entry.text, {
                fontSize: '18px',
                color: '#00ffff'
            });
            entryText.setOrigin(0, 0);
            this.add(entryText);

            if (entry.linkText && entry.link) {
                const linkText = TextFactory.createText(this.scene, linkX, yPos, entry.linkText, {
                    fontSize: '18px',
                    color: '#ffff00'
                });
                linkText.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                    window.open(entry.link, '_blank');
                });
                linkText.setOrigin(0, 0);
                this.add(linkText);
            }

            if (entry.text2) {
                const entryText2 = TextFactory.createText(this.scene, linkX, yPos, entry.text2, {
                    fontSize: '18px',
                    color: '#00ffff'
                });
                entryText2.setOrigin(0, 0);
                this.add(entryText2);
            }
            yPos += 50;
        });

        const closeButton = TextFactory.createText(this.scene, 0, 320, "Close", {
            fontSize: '18px',
            color: '#ff00ff',
            padding: { x: 10, y: 5 }
        });
        closeButton.setInteractive({ useHandCursor: true });

        closeButton.on('pointerdown', () => {
            this.destroy();
        });

        closeButton.on('pointerover', () => {
            this.scene.input.setDefaultCursor('pointer');
        });

        closeButton.on('pointerout', () => {
            this.scene.input.setDefaultCursor('default');
        });

        closeButton.setOrigin(0.5, 0.5);
        this.add(closeButton);
    }
}
