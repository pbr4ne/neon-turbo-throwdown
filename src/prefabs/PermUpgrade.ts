
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "./Player";
import { TrophyType } from '../trophies/TrophyType';
import { Library } from "../throwdown/Library";
import Game from "../scenes/Game";
import { OutstandingTrophyList } from "../trophies/OutstandingTrophyList";
import Trophy from "./Trophy";
/* END-USER-IMPORTS */

export default class PermUpgrade extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, player: Player) {
		super(scene);

		/* START-USER-CTR-CODE */
		this.player = player;
		
		this.selectCardImage = scene.add.image(960, 1020, "select-trophy");

		this.cardSlot1 = scene.add.image(758, 848, "empty");
        this.cardSlot2 = scene.add.image(960, 848, "empty");
        this.cardSlot3 = scene.add.image(1162, 848, "empty");

		this.cardRound();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private player: Player;
	private cardSlot1!: Phaser.GameObjects.Image;
    private cardSlot2!: Phaser.GameObjects.Image;
    private cardSlot3!: Phaser.GameObjects.Image;
	private selectCardImage: Phaser.GameObjects.Image | null = null;
    private currentTrophies: TrophyType[] = [];

	destroyEverything() {
		this.cardSlot1.destroy();
		this.cardSlot2.destroy();
		this.cardSlot3.destroy();
		this.selectCardImage?.destroy();
	}

	private cardRound() {
		Phaser.Utils.Array.Shuffle(OutstandingTrophyList.getEligibleTrophyTypes());
		this.currentTrophies = [];
	
		const positions = [
			{ x: 758, y: 848 },
			{ x: 960, y: 848 },
			{ x: 1162, y: 848 }
		];
	
		OutstandingTrophyList.getEligibleTrophyTypes().slice(0, 3).forEach((trophyType, index) => {
			if (trophyType) {
				this.currentTrophies.push(trophyType);
				const trophy = new Trophy(this.scene, trophyType, positions[index].x, positions[index].y, "upgrade");
				trophy.on('pointerdown', () => this.handleCardSelection(index + 1));
				this.add(trophy);
				OutstandingTrophyList.removeTrophy(trophyType);
			}
		});
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
