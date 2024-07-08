
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Card extends Phaser.GameObjects.Image {

	public cardType: string;

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 310, y ?? 107, texture || "cardFront", frame);

		this.cardType = ""; // Initialize with an empty string or a default type

        this.setInteractive();
    }

	/* START-USER-CODE */

    setType(type: string) {
        this.cardType = type;
        // You can add logic here to change the texture or frame based on the type
    }

	

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
