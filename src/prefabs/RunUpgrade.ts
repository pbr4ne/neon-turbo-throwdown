
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import { Coach } from "../throwdown/Coach";
import Player from "./Player";
/* START-USER-IMPORTS */
import Card from "./Card";
import { CardType } from "../cards/CardType";
import Game from "../scenes/Game";
import { Library } from "../throwdown/Library";
/* END-USER-IMPORTS */

export default class RunUpgrade extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, coach: Coach, player: Player) {
		super(scene, 0, 0);

		/* START-USER-CTR-CODE */
		this.coach = coach;
		this.player = player;
		
		this.selectCardImage = scene.add.image(960, 1020, "select-card");

		this.cardImage1 = scene.add.image(758, 848, "front").setInteractive({ useHandCursor: true });
        this.cardImage2 = scene.add.image(960, 848, "front").setInteractive({ useHandCursor: true });
        this.cardImage3 = scene.add.image(1162, 848, "front").setInteractive({ useHandCursor: true });

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
	private coach: Coach;
	private player: Player;
	private cardSlot1!: Phaser.GameObjects.Image;
    private cardSlot2!: Phaser.GameObjects.Image;
    private cardSlot3!: Phaser.GameObjects.Image;
	private cardImage1!: Phaser.GameObjects.Image;
    private cardImage2!: Phaser.GameObjects.Image;
    private cardImage3!: Phaser.GameObjects.Image;
	private selectCardImage: Phaser.GameObjects.Image | null = null;
	private numDraws: number = 0;
    private currentCards: CardType[] = [];

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
		//todo will probably have to reset the coaches after death
		Phaser.Utils.Array.Shuffle(this.coach.getBaseCards());
		this.currentCards = [];
		const firstCard = this.coach.getBaseCards().pop();
		const secondCard = this.coach.getBaseCards().pop();
		const thirdCard = this.coach.getBaseCards().pop();
		this.numDraws++;

		this.cardSlot1.setTexture(firstCard!.getIcon());
		this.cardSlot2.setTexture(secondCard!.getIcon());
		this.cardSlot3.setTexture(thirdCard!.getIcon());

        if (firstCard) {
            this.currentCards.push(firstCard);
        }
		if (secondCard) {
			this.currentCards.push(secondCard);
		}
		if (thirdCard) {
			this.currentCards.push(thirdCard);
		}
	}

	private handleCardSelection(cardIndex: number) {
		if (this.numDraws >= 3) {
			console.log("No more draws allowed");
			(this.scene.scene.get('Game') as Game).finishRunUpgrade()
			return;
		}

		const newCard = new Card(this.scene, this.currentCards[cardIndex-1], 0, 0, "front");
		newCard.showName(false);
		newCard.showIcon(false);
		Library.addCardType(newCard.getCardType());
		this.player.deck.addCard(newCard);

        // Draw the next set of cards
        this.drawNextSetOfCards();
    }

    private drawNextSetOfCards() {
        // Check if there are enough cards left to draw another set of three
        if (this.coach.getBaseCards().length < 3) {
            console.log("Not enough cards to draw another set.");
			(this.scene.scene.get('Game') as Game).finishRunUpgrade()
            return;
        }

        this.cardRound();

        // Re-enable interactivity
        this.cardImage1.setInteractive({ useHandCursor: true });
        this.cardImage2.setInteractive({ useHandCursor: true });
        this.cardImage3.setInteractive({ useHandCursor: true });
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
