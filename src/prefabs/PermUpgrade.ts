
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
		this.courtImage.setDepth(-10);

		this.spiritCoachImage = new Phaser.GameObjects.Image(scene, 1855, 78, "spirit")
            .setOrigin(1, 0)
            .setScale(1.2);
        this.add(this.spiritCoachImage);

		this.coachName = new Phaser.GameObjects.Text(this.scene, 1720, 340, "Turbovoid", {
			fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
			fontSize: '20px',
			color: '#000000',
            stroke: '#000000',
            strokeThickness: 1,
			padding: { x: 5, y: 5 },
			align: 'left'
		});
		this.scene.add.existing(this.coachName);
		this.coachName.setOrigin(0.5, 0.5);

		/* START-USER-CTR-CODE */
		this.player = player;
		
		this.selectCardImage = scene.add.image(960, 1020, "select-trophy");

		this.cardSlot1 = scene.add.image(758, 848, "empty");
        this.cardSlot2 = scene.add.image(960, 848, "empty");
        this.cardSlot3 = scene.add.image(1162, 848, "empty");

		this.pointerImage = this.scene.add.image(1300, 850, "pointer");

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
	private pointerImage: Phaser.GameObjects.Image | null = null;
    private trophiesToSelect: TrophyType[] = [];

	destroyEverything() {
		this.courtImage.destroy();
		this.cardSlot1.destroy();
		this.cardSlot2.destroy();
		this.cardSlot3.destroy();
		this.spiritCornerImage.destroy();
		this.spiritCoachImage.destroy();
		this.coachName.destroy();
		this.selectCardImage?.destroy();
		this.pointerImage?.destroy();
	}

	private cardRound() {
		let eligibleTrophies = OutstandingTrophyList.getEligibleTrophyTypes();
		this.trophiesToSelect = [];
	
		const positions = [
			{ x: 758, y: 848 },
			{ x: 960, y: 848 },
			{ x: 1162, y: 848 }
		];
	
		if (eligibleTrophies.length <= 0) {
			(this.scene.scene.get('Game') as Game).finishPermUpgrade();
			return;
		}
		Phaser.Utils.Array.Shuffle(eligibleTrophies);

		eligibleTrophies.slice(0, 3).forEach((trophyType, index) => {
			if (trophyType) {
				this.trophiesToSelect.push(trophyType);
				const trophy = new Trophy(this.scene, trophyType, positions[index].x, positions[index].y, "trophy");
				trophy.on('pointerdown', () => this.handleCardSelection(index + 1));
				this.add(trophy);
			}
		});
	}

	private handleCardSelection(cardIndex: number) {
	
		const trophyType = this.trophiesToSelect[cardIndex-1]
		Library.addTrophyType(trophyType);
		OutstandingTrophyList.removeTrophy(trophyType);
        (this.scene.scene.get('Game') as Game).finishPermUpgrade();
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
