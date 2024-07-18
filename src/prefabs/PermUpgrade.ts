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

        this.player = player;
        
        this.selectCardImage = scene.add.image(960, 1020, "select-trophy");

        this.cardSlot1 = scene.add.image(758, 848, "empty");
        this.cardSlot2 = scene.add.image(960, 848, "empty");
        this.cardSlot3 = scene.add.image(1162, 848, "empty");

        this.pointerImage = this.scene.add.image(1300, 850, "pointer");

        scene.add.existing(this);

        this.cardRound();
    }

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
    private trophiesToSelect: (TrophyType | CardType)[] = [];

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
    }

    private cardRound() {
        let eligibleTrophies = OutstandingTrophyList.getEligibleTrophyTypes();
        this.trophiesToSelect = [];
    
        const positions = [
            { x: 758, y: 848 },
            { x: 960, y: 848 },
            { x: 1162, y: 848 }
        ];

        // Shuffle the combined array
        Phaser.Utils.Array.Shuffle(eligibleTrophies);

        // Select the first 3 items
        this.trophiesToSelect = eligibleTrophies.slice(0, 3);

        // If there are no trophies or upgrades, finish the upgrade process
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

            let cardKey = selectedItem.trophyType.getCardKey();
            log("this is the list of cards in the Library pure deck that i'm going to upgrade: " + deckToModify.map(card => card.getKey()));
            if (cardKey != null) {
                //get all cards in deck with this key
                let deckCards = deckToModify.filter(card => card.getKey() === cardKey!);
                log("Found " + deckCards.length + " cards to upgrade");
                //replace all of them with the upgraded version
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

    async finalizeDeck(deckToModify: CardType[]) {
        await StorageManager.saveBaseDeck(deckToModify);
        Library.setPureDeck(deckToModify);
        log("this is the list of cards in the Library pure deck after the upgrade: " + deckToModify.map(card => card.getKey()));
        CoachList.you.setBaseCards(deckToModify);
    }
    
    findCardTypeIndexByKey(cards: CardType[], key: CardKeys): number {
        log("Finding card type index by key: " + key);
        return cards.findIndex(card => card.getKey() === key);
    }
}
