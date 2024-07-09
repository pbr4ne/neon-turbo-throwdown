
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class DialogBox extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number, text: string, options: string[]) {
        super(scene, x, y);

        const modalBackground = scene.add.rectangle(scene.scale.width / 2, scene.scale.height / 2, scene.scale.width, scene.scale.height, 0x000000, 0.5);
        this.add(modalBackground);

        const background = scene.add.rectangle(0, 0, 400, 200, 0xffffff, 1);
        background.setStrokeStyle(2, 0x000000);
        background.setOrigin(0.5);
        this.add(background);

        const dialogText = scene.add.text(0, -50, text, {
            fontSize: '20px',
            color: '#000000',
            wordWrap: { width: 380 }
        }).setOrigin(0.5);
        this.add(dialogText);

        options.forEach((option, index) => {
            const optionText = scene.add.text(0, -10 + index * 30, option, {
                fontSize: '18px',
                color: '#00ff00',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            }).setOrigin(0.5).setInteractive();

            optionText.on('pointerover', () => {
                optionText.setStyle({ fill: '#ff0' });
            });

            optionText.on('pointerout', () => {
                optionText.setStyle({ fill: '#00ff00' });
            });

            optionText.on('pointerdown', () => {
                this.emit('optionSelected', option);
                this.destroy();
            });

            this.add(optionText);
        });

        //scene.add.existing(this);
    }
}

/* END OF COMPILED CODE */

// You can write more code here
