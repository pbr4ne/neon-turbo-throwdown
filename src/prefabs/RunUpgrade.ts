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
import { GameSounds } from "../utilities/GameSounds";
import HelpRunUpgrade from "./HelpRunUpgrade";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class RunUpgrade extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, coach: Coach, player: Player) {
        super(scene, 0, 0);

        this.coach = coach;
        this.player = player;

        this.createUIElements(scene);
        this.cardListToChooseFrom = this.getCardList();
        this.cardRound();
    }

    private coach: Coach;
    private player: Player;
    private selectCardImage: Phaser.GameObjects.Image | null = null;
    private pointerImage: Phaser.GameObjects.Image | null = null;
    private numDraws: number = 0;
    private currentGenericCards: GenericCard[] = [];
    private skipButton!: Phaser.GameObjects.Text;
	private skipButtonBackground!: Phaser.GameObjects.Rectangle;
    private cardListToChooseFrom: { card: CardType, type: string }[] = [];
    private helpBtn: Phaser.GameObjects.Image | null = null;

    private createUIElements(scene: Phaser.Scene) {
        this.selectCardImage = this.createImage(scene, 960, 1020, "select-reward");

        this.pointerImage = this.createImage(scene, 600, 850, "pointer");
        this.pointerImage.rotation = Math.PI;

        this.skipButtonBackground = this.createRectangle(scene, 1350, 848, 110, 40, Colours.BLACK_HEX, 0, 2, Colours.YELLOW_HEX);
        this.skipButton = this.createText(scene, 1350, 848, 'skip', {
            fontSize: '18px',
            color: Colours.YELLOW_STRING,
            padding: { x: 10, y: 5 },
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
        
        this.skipButton.on('pointerdown', () => this.drawNextSetOfCards());

        this.helpBtn = this.createImage(scene, 1840, 1020, "help", true, this.showHelp);

        scene.add.existing(this);
    }

    private createImage(scene: Phaser.Scene, x: number, y: number, texture: string, interactive: boolean = false, callback?: () => void): Phaser.GameObjects.Image {
        const image = scene.add.image(x, y, texture);
        if (interactive) {
            image.setInteractive({ useHandCursor: true })
                .on('pointerover', () => scene.input.setDefaultCursor('pointer'))
                .on('pointerout', () => scene.input.setDefaultCursor('default'));
            if (callback) {
                image.on('pointerdown', callback, this);
            }
        }
        this.add(image);
        return image;
    }

    private createRectangle(scene: Phaser.Scene, x: number, y: number, width: number, height: number, fillColor: number, fillAlpha: number, lineWidth: number, strokeColor: number): Phaser.GameObjects.Rectangle {
        const rectangle = scene.add.rectangle(x, y, width, height, fillColor, fillAlpha)
            .setStrokeStyle(lineWidth, strokeColor);
        this.add(rectangle);
        return rectangle;
    }

    private createText(scene: Phaser.Scene, x: number, y: number, text: string, style: Phaser.Types.GameObjects.Text.TextStyle): Phaser.GameObjects.Text {
        const textObject = TextFactory.createText(scene, x, y, text, style);
        this.add(textObject);
        return textObject;
    }

    private showHelp() {
        const helpPopup = new HelpRunUpgrade(this.scene);
        this.scene.add.existing(helpPopup);
    }

    destroyEverything() {
        this.selectCardImage?.destroy();
        this.pointerImage?.destroy();
        this.skipButton?.destroy();
		this.skipButtonBackground?.destroy();
        this.helpBtn?.destroy();
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
        if (this.numDraws >= 3 || this.cardListToChooseFrom.length < 3) {
            (this.scene.scene.get('Game') as Game).finishRunUpgrade();
            return;
        }

        const firstCard = this.cardListToChooseFrom.pop();
        const secondCard = this.cardListToChooseFrom.pop();
        const thirdCard = this.cardListToChooseFrom.pop();
        this.numDraws++;
    
        this.clearCurrentCards();

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
            genericCard = new Card(this.scene, card, "upgrade", x, y, "front-gift", true);
        } else {
            genericCard = new Upgrade(this.scene, card, x, y, "front-upgrade");
        }
        genericCard.on('pointerdown', () => this.handleCardSelection(genericCard));
        this.add(genericCard);
        this.currentGenericCards[index] = genericCard;
    }

    private handleCardSelection(genericCard: GenericCard) {
        log(`Selected card: ${genericCard.toString()}`);
        GameSounds.playCard();
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

    private clearCurrentCards() {
        this.currentGenericCards.forEach(genericCard => genericCard.setVisible(false));
        this.currentGenericCards = [];
    }

    private drawNextSetOfCards() {
        if (this.numDraws < 3) {
            this.cardRound();
        } else {
            (this.scene.scene.get('Game') as Game).finishRunUpgrade();
        }
    }
}
