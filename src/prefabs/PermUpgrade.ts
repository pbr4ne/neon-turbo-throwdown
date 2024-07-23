import Phaser from "phaser";
import Player from "./Player";
import { TrophyType } from '../trophies/TrophyType';
import { Library } from "../throwdown/Library";
import Game from "../scenes/Game";
import { OutstandingTrophyList } from "../trophies/OutstandingTrophyList";
import Trophy from "./Trophy";
import { CardType } from "../cards/CardType";
import { CoachList } from "../throwdown/CoachList";
import Upgrade from "./Upgrade";
import { log } from "../utilities/GameUtils";
import { StorageManager } from "../utilities/StorageManager";
import { CardKeys } from "../cards/CardKeys";
import { GameSounds } from "../utilities/GameSounds";
import HelpPermUpgrade from "./HelpPermUpgrade";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class PermUpgrade extends Phaser.GameObjects.Container {

    constructor(scene: Phaser.Scene, player: Player) {
        super(scene);

        this.spiritCornerImage = this.createImage(1625, 193, "coach-corner-spirit");
        this.courtImage = this.createImage(953, 443, "court-cyan", -10);

        this.spiritCoachImage = this.createImage(1855, 78, "spirit", 0, 1.2).setOrigin(1, 0);
        this.add(this.spiritCoachImage);

        this.coachName = TextFactory.createText(this.scene, 1720, 340, "Turbovoid", {
            fontSize: '20px',
            color: Colours.BLACK_STRING,
            stroke: Colours.BLACK_STRING,
            strokeThickness: 1,
            padding: { x: 5, y: 5 },
            align: 'left'
        }).setOrigin(0.5, 0.5);
        this.scene.add.existing(this.coachName);

        this.player = player;

        this.selectCardImage = this.createImage(960, 1020, "select-trophy");
        this.cardSlot1 = this.createImage(758, 848, "empty");
        this.cardSlot2 = this.createImage(960, 848, "empty");
        this.cardSlot3 = this.createImage(1162, 848, "empty");

        this.pointerImage = this.createImage(1300, 850, "pointer");

        this.helpBtn = this.createImage(1840, 1020, "help", 0, 1, true, this.showHelp);

        scene.add.existing(this);

        this.cardRound();
    }

    private player: Player;
    private courtImage: Phaser.GameObjects.Image;
    private spiritCornerImage: Phaser.GameObjects.Image;
    private spiritCoachImage: Phaser.GameObjects.Image;
    private coachName: Phaser.GameObjects.Text;
    private cardSlot1: Phaser.GameObjects.Image;
    private cardSlot2: Phaser.GameObjects.Image;
    private cardSlot3: Phaser.GameObjects.Image;
    private selectCardImage: Phaser.GameObjects.Image | null = null;
    private pointerImage: Phaser.GameObjects.Image | null = null;
    private trophiesToSelect: (TrophyType | CardType)[] = [];
    private helpBtn: Phaser.GameObjects.Image | null = null;

    private createImage(x: number, y: number, texture: string, depth: number = 0, scale: number = 1, interactive: boolean = false, callback?: () => void): Phaser.GameObjects.Image {
        const image = this.scene.add.image(x, y, texture).setDepth(depth).setScale(scale);
        if (interactive) {
            image.setInteractive({ useHandCursor: true })
                .on('pointerover', () => this.scene.input.setDefaultCursor('pointer'))
                .on('pointerout', () => this.scene.input.setDefaultCursor('default'));
            if (callback) {
                image.on('pointerdown', callback, this);
            }
        }
        this.add(image);
        return image;
    }

    private showHelp() {
        const helpPopup = new HelpPermUpgrade(this.scene);
        this.scene.add.existing(helpPopup);
    }

    destroyEverything() {
        this.courtImage?.destroy();
        this.cardSlot1?.destroy();
        this.cardSlot2?.destroy();
        this.cardSlot3?.destroy();
        this.spiritCornerImage?.destroy();
        this.spiritCoachImage?.destroy();
        this.coachName?.destroy();
        this.selectCardImage?.destroy();
        this.pointerImage?.destroy();
        this.helpBtn?.destroy();
    }

    private cardRound() {
        const eligibleTrophies = OutstandingTrophyList.getEligibleTrophyTypes();
        this.trophiesToSelect = [];

        const positions = [
            { x: 758, y: 848 },
            { x: 960, y: 848 },
            { x: 1162, y: 848 }
        ];

        Phaser.Utils.Array.Shuffle(eligibleTrophies);
        this.trophiesToSelect = eligibleTrophies.slice(0, 3);

        if (this.trophiesToSelect.length <= 0) {
            this.finalizeDeck(Library.getPureDeck());
            (this.scene.scene.get('Game') as Game).finishPermUpgrade();
            return;
        }

        this.trophiesToSelect.forEach((item, index) => {
            if (item instanceof TrophyType) {
                const trophy = new Trophy(this.scene, item, positions[index].x, positions[index].y, "trophy");
                trophy.on('pointerdown', () => this.handleCardSelection(trophy));
                this.add(trophy);
            }
        });
    }

    private async handleCardSelection(selectedItem: Trophy | Upgrade) {
        GameSounds.playCard();
        const deckToModify = Library.getPureDeck();

        if (selectedItem instanceof Trophy) {
            log("Trophy selected");
            Library.addTrophyType(selectedItem.trophyType);
            OutstandingTrophyList.removeTrophy(selectedItem.trophyType);

            const cardKey = selectedItem.trophyType.getCardKey();
            log("this is the list of cards in the Library pure deck that i'm going to upgrade: " + deckToModify.map(card => card.getKey()));
            if (cardKey != null) {
                const deckCards = deckToModify.filter(card => card.getKey() === cardKey!);
                log("Found " + deckCards.length + " cards to upgrade");
                deckCards.forEach(card => {
                    const upgrade = card.getUpgrade();
                    if (upgrade === null) {
                        log("Upgrade is null");
                        return;
                    }
                    const index = this.findCardTypeIndexByKey(deckToModify, cardKey!);
                    if (index > -1) {
                        log("Found card to remove at index " + index);
                        log("array length was " + deckToModify.length);
                        deckToModify.splice(index, 1);
                    } else {
                        log("Couldn't find card to remove");
                    }
                    deckToModify.push(upgrade);
                });
            }
        } else {
            log("Unknown item selected");
        }

        this.finalizeDeck(deckToModify);
        (this.scene.scene.get('Game') as Game).finishPermUpgrade();
    }

    private async finalizeDeck(deckToModify: CardType[]) {
        await StorageManager.saveBaseDeck(deckToModify);
        Library.setPureDeck(deckToModify);
        log("this is the list of cards in the Library pure deck after the upgrade: " + deckToModify.map(card => card.getKey()));
        CoachList.you.setBaseCards(deckToModify);
    }

    private findCardTypeIndexByKey(cards: CardType[], key: CardKeys): number {
        log("Finding card type index by key: " + key);
        return cards.findIndex(card => card.getKey() === key);
    }
}
