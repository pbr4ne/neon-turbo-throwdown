
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

		this.spiritCornerImage = this.scene.add.image(1625, 193, "coach-corner-spirit");

		this.courtImage = this.scene.add.image(953, 443, "court-cyan");

		this.coachName = new Phaser.GameObjects.Text(this.scene, 1720, 340, "spirit coach", {
			fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
			fontSize: '16px',
			color: '#000000',
            stroke: '#000000',
            strokeThickness: 1,
			padding: { x: 5, y: 5 },
			align: 'left'
		});
		this.add(this.coachName);
		this.coachName.setOrigin(0.5, 0.5);

		this.spiritCoachImage = new Phaser.GameObjects.Image(scene, 1855, 78, "spirit")
            .setOrigin(1, 0)
            .setScale(1.2);
        this.add(this.spiritCoachImage);

		/* START-USER-CTR-CODE */
		this.player = player;
		
		this.selectCardImage = scene.add.image(960, 1020, "select-trophy");

		this.cardSlot1 = scene.add.image(758, 848, "empty");
        this.cardSlot2 = scene.add.image(960, 848, "empty");
        this.cardSlot3 = scene.add.image(1162, 848, "empty");

		scene.add.existing(this);

		this.cardRound();
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private player: Player;
	private courtImage: Phaser.GameObjects.Image;
	private spiritCornerImage: Phaser.GameObjects.Image;
	private spiritCoachImage: Phaser.GameObjects.Image;
	private coachName: Phaser.GameObjects.Text;
	private cardSlot1!: Phaser.GameObjects.Image;
    private cardSlot2!: Phaser.GameObjects.Image;
    private cardSlot3!: Phaser.GameObjects.Image;
	private selectCardImage: Phaser.GameObjects.Image | null = null;
    private currentTrophies: TrophyType[] = [];

	destroyEverything() {
		this.courtImage.destroy();
		this.cardSlot1.destroy();
		this.cardSlot2.destroy();
		this.cardSlot3.destroy();
		this.spiritCornerImage.destroy();
		this.spiritCoachImage.destroy();
		this.coachName.destroy();
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
	
		if (OutstandingTrophyList.getEligibleTrophyTypes().length <= 0) {
			(this.scene.scene.get('Game') as Game).finishPermUpgrade();
			return;
		}

		OutstandingTrophyList.getEligibleTrophyTypes().slice(0, 3).forEach((trophyType, index) => {
			if (trophyType) {
				this.currentTrophies.push(trophyType);
				const trophy = new Trophy(this.scene, trophyType, positions[index].x, positions[index].y, "upgrade");
				trophy.on('pointerdown', () => this.handleCardSelection(index + 1));
				this.add(trophy);
			}
		});
	}

	private handleCardSelection(cardIndex: number) {
	
		const trophyType = this.currentTrophies[cardIndex-1]
		Library.addTrophyType(trophyType);
		OutstandingTrophyList.removeTrophy(trophyType);
        (this.scene.scene.get('Game') as Game).finishPermUpgrade();
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
