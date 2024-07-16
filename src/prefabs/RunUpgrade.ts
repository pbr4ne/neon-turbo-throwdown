import Phaser from "phaser";
import { Coach } from "../throwdown/Coach";
import Player from "./Player";
import Card from "./Card";
import GenericCard from "./GenericCard";
import { CardType } from "../cards/CardType";
import Game from "../scenes/Game";
import { CoachList } from "../throwdown/CoachList";
import { log } from "../utilities/GameUtils";
import Upgrade from "./Upgrade";

export default class RunUpgrade extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, coach: Coach, player: Player) {
		super(scene, 0, 0);

		this.coach = coach;
		this.player = player;
		
		this.selectCardImage = scene.add.image(960, 1020, "select-reward");

		this.cardSlot1 = scene.add.image(758, 848, "empty");
        this.cardSlot2 = scene.add.image(960, 848, "empty");
        this.cardSlot3 = scene.add.image(1162, 848, "empty");

		this.pointerImage = this.scene.add.image(1300, 850, "pointer");

		this.cardRound();
	}

	private coach: Coach;
	private player: Player;
	private cardSlot1!: Phaser.GameObjects.Image;
    private cardSlot2!: Phaser.GameObjects.Image;
    private cardSlot3!: Phaser.GameObjects.Image;
	private selectCardImage: Phaser.GameObjects.Image | null = null;
	private pointerImage: Phaser.GameObjects.Image | null = null;
	private numDraws: number = 0;
    private currentCards: CardType[] = [];
	private currentGenericCards: GenericCard[] = [];

	destroyEverything() {
		this.cardSlot1.destroy();
		this.cardSlot2.destroy();
		this.cardSlot3.destroy();
		this.selectCardImage?.destroy();
		this.pointerImage?.destroy();
	}

	getCardList() {
		const baseCards = this.coach.getBaseCards().map(card => ({ card, type: 'coach' }));

		//get all upgradeable cards
		let upgradeableCards = CoachList.you.getBaseCards()
        .filter(card => card.getUpgrade() !== null)
        .map(card => ({ card, type: 'upgradeable' }));
	
		//get up to 3 upgrades
		Phaser.Utils.Array.Shuffle(upgradeableCards);
		const selectedUpgrades = upgradeableCards.slice(0, Math.min(upgradeableCards.length, 3));

		// Combine upgrades and coach cards
		const combinedCards = [...baseCards, ...selectedUpgrades];
	
		Phaser.Utils.Array.Shuffle(combinedCards);

		return combinedCards;
	}

	private cardRound() {
		if (this.numDraws >= 3) {
			(this.scene.scene.get('Game') as Game).finishRunUpgrade();
			return;
		}

		const combinedCards = this.getCardList();
	
		const firstCard = combinedCards.pop();
		const secondCard = combinedCards.pop();
		const thirdCard = combinedCards.pop();
		this.numDraws++;
	
		if (firstCard) {
			this.createCard(firstCard.card, firstCard.type, 758, 848, 1);
		}
		if (secondCard) {
			this.createCard(secondCard.card, secondCard.type, 960, 848, 2);
		}
		if (thirdCard) {
			this.createCard(thirdCard.card, thirdCard.type, 1162, 848, 3);
		}    
	}

	private createCard(card: CardType, type: string, x: number, y: number, index: number) {
		let genericCard: GenericCard;
		if (type === 'coach') {
			genericCard = new Card(this.scene, card, "upgrade", x, y, "front", true);
		} else {
			genericCard = new Upgrade(this.scene, card, x, y, "front-gift");
		}
		genericCard.on('pointerdown', () => this.handleCardSelection(genericCard));
		this.add(genericCard);
		this.currentCards[index] = card;
	}

	private handleCardSelection(genericCard: GenericCard) {
		log(`Selected card: ${genericCard.toString()}`);
		if (this.numDraws > 3) {
			(this.scene.scene.get('Game') as Game).finishRunUpgrade()
			return;
		}

		if (genericCard instanceof Card) {
			const newCard = new Card(this.scene, genericCard.getCardType(), "playerDeck", 0, 0, "front");
			CoachList.you.getBaseCards().push(newCard.getCardType());
			this.player.deck.addCard(newCard);
			//todo - this is suspicious that i have to hide it. because it should be moved later but it stays on the screen
			newCard.hide();
		} else if (genericCard instanceof Upgrade) {
			const upgrade = genericCard.getCardType().getUpgrade();
			if (upgrade === null) {
				log("Upgrade is null");
				return;
			}
			const newCard = new Card(this.scene, upgrade, "playerDeck", 0, 0, "front");
			CoachList.you.getBaseCards().push(newCard.getCardType());
			//delete genericCard from CoachList.you.getBaseCards()
			const index = CoachList.you.getBaseCards().indexOf(genericCard.getCardType());
			if (index > -1) {
				CoachList.you.getBaseCards().splice(index, 1);
			}
			this.player.deck.addCard(newCard);
			//do this so you can see current modifiers on the card description
			newCard.getCardType().setPlayer(this.player);
			//todo - this is suspicious that i have to hide it. because it should be moved later but it stays on the screen
			newCard.hide();
		}

        // Draw the next set of cards
        this.drawNextSetOfCards();
    }

    private drawNextSetOfCards() {
        if (this.numDraws < 3 && this.getCardList().length >= 3) {
            this.cardRound();
        } else {
            (this.scene.scene.get('Game') as Game).finishRunUpgrade();
        }
    }
}
