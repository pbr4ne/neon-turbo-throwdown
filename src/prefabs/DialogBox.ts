
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class DialogBox extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 960, y ?? 542);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(0, 0, 128, 128);
		rectangle_1.scaleX = 12.676747471753808;
		rectangle_1.scaleY = 6.840386290493101;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 16776960;
		this.add(rectangle_1);

		// triangle_1
		const triangle_1 = scene.add.triangle(674, 275, 0, 128, 64, 0, 128, 128);
		triangle_1.angle = 41;
		triangle_1.isFilled = true;
		triangle_1.fillColor = 16711935;
		this.add(triangle_1);

		// polygon_1
		const polygon_1 = scene.add.polygon(718, 103, "35 100 0 50 70 0 140 50 105 100");
		polygon_1.scaleX = 1.1086378699451604;
		polygon_1.scaleY = 1.4460733084592845;
		polygon_1.isFilled = true;
		polygon_1.fillColor = 65535;
		this.add(polygon_1);

		// ellipse_1
		const ellipse_1 = scene.add.ellipse(459, 303, 128, 128);
		ellipse_1.isFilled = true;
		ellipse_1.fillColor = 65535;
		this.add(ellipse_1);

		// rectangle_2
		const rectangle_2 = scene.add.rectangle(547, 140, 128, 128);
		rectangle_2.scaleX = 0.7659057515471057;
		rectangle_2.scaleY = 0.6967991683535075;
		rectangle_2.angle = 35;
		rectangle_2.isFilled = true;
		rectangle_2.fillColor = 16711935;
		this.add(rectangle_2);

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	generateDialog(text: string, options: string[]) {
		// const modalBackground = this.scene.add.rectangle(this.scene.scale.width / 2, this.scene.scale.height / 2, this.scene.scale.width, this.scene.scale.height, 0x000000, 0.5);
        // this.add(modalBackground);

        // const background = this.scene.add.rectangle(0, 0, 400, 200, 0xffffff, 1);
        // background.setStrokeStyle(2, 0x000000);
        // background.setOrigin(0.5);
        // this.add(background);

        const dialogText = this.scene.add.text(0, -50, text, {
            fontSize: '20px',
            color: '#000000',
            wordWrap: { width: 380 }
        }).setOrigin(0.5);
        this.add(dialogText);

        options.forEach((option, index) => {
            const optionText = this.scene.add.text(0, -10 + index * 30, option, {
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
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
