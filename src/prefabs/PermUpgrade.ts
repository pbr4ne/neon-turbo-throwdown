
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "./Player";
import { TrophyType } from '../trophies/TrophyType';
import { Library } from "../throwdown/Library";
import Game from "../scenes/Game";
import { TrophyList } from "../trophies/TrophyList";
/* END-USER-IMPORTS */

export default class PermUpgrade extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, player: Player) {
		super(scene);

		/* START-USER-CTR-CODE */
		this.player = player;
		
		this.selectCardImage = scene.add.image(960, 1020, "select-card");

		this.cardImage1 = scene.add.image(758, 848, "upgrade").setInteractive({ useHandCursor: true });
        this.cardImage2 = scene.add.image(960, 848, "upgrade").setInteractive({ useHandCursor: true });
        this.cardImage3 = scene.add.image(1162, 848, "upgrade").setInteractive({ useHandCursor: true });

		this.cardSlot1 = scene.add.image(758, 848, "empty");
        this.cardSlot2 = scene.add.image(960, 848, "empty");
        this.cardSlot3 = scene.add.image(1162, 848, "empty");

		this.cardImage1.on('pointerdown', () => this.handleCardSelection(1));
        this.cardImage2.on('pointerdown', () => this.handleCardSelection(2));
        this.cardImage3.on('pointerdown', () => this.handleCardSelection(3));

		this.cardRound();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private player: Player;
	private cardSlot1!: Phaser.GameObjects.Image;
    private cardSlot2!: Phaser.GameObjects.Image;
    private cardSlot3!: Phaser.GameObjects.Image;
	private cardImage1!: Phaser.GameObjects.Image;
    private cardImage2!: Phaser.GameObjects.Image;
    private cardImage3!: Phaser.GameObjects.Image;
	private selectCardImage: Phaser.GameObjects.Image | null = null;
    private currentTrophies: TrophyType[] = [];

	destroyEverything() {
		this.cardSlot1.destroy();
		this.cardSlot2.destroy();
		this.cardSlot3.destroy();
		this.cardImage1.destroy();
		this.cardImage2.destroy();
		this.cardImage3.destroy();
		this.selectCardImage?.destroy();
	}

	private cardRound() {
		Phaser.Utils.Array.Shuffle(TrophyList.getTrophyTypes());
		this.currentTrophies = [];
		const firstCard = TrophyList.getTrophyTypes()[0];
		const secondCard = TrophyList.getTrophyTypes()[1];
		const thirdCard = TrophyList.getTrophyTypes()[2];

		this.cardSlot1.setTexture(firstCard!.getIcon());
		this.cardSlot2.setTexture(secondCard!.getIcon());
		this.cardSlot3.setTexture(thirdCard!.getIcon());

        if (firstCard) {
            this.currentTrophies.push(firstCard);
        }
		if (secondCard) {
			this.currentTrophies.push(secondCard);
		}
		if (thirdCard) {
			this.currentTrophies.push(thirdCard);
		}
	}

	private handleCardSelection(cardIndex: number) {
	
		const trophyType = this.currentTrophies[cardIndex-1]
		Library.addTrophyType(trophyType);

        (this.scene.scene.get('Game') as Game).finishPermUpgrade();
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
