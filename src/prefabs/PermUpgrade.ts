import Phaser from "phaser";
import Player from "./Player";
import { TrophyType } from '../trophies/TrophyType';
import { Library } from "../throwdown/Library";
import Game from "../scenes/Game";
import { OutstandingTrophyList } from "../trophies/OutstandingTrophyList";
import Trophy from "./Trophy";
import Card from "./Card";
import { CardType } from "../cards/CardType";
import { CoachList } from "../throwdown/CoachList";
import Upgrade from "./Upgrade";
import { log } from "../utilities/GameUtils";
import { StorageManager } from "../utilities/StorageManager";
import { CardKeys } from "~/cards/CardKeys";

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

    getUpgradeList() {
        let upgradeableCards = CoachList.you.getBaseCards()
            .filter(card => card.getUpgrade() !== null)
            .map(card => ({ card, type: 'upgradeable' }));

        Phaser.Utils.Array.Shuffle(upgradeableCards);
        upgradeableCards = upgradeableCards.slice(0, 3);

        Phaser.Utils.Array.Shuffle(upgradeableCards);

        return upgradeableCards;
    }

    private cardRound() {
        let eligibleTrophies = OutstandingTrophyList.getEligibleTrophyTypes();
        let upgrades = this.getUpgradeList().map(item => item.card);
        this.trophiesToSelect = [];
    
        const positions = [
            { x: 758, y: 848 },
            { x: 960, y: 848 },
            { x: 1162, y: 848 }
        ];

        // Combine the eligible trophies and upgrades
        const combinedItems: (TrophyType | CardType)[] = [...eligibleTrophies, ...upgrades];

        // Shuffle the combined array
        Phaser.Utils.Array.Shuffle(combinedItems);

        // Select the first 3 items
        this.trophiesToSelect = combinedItems.slice(0, 3);

        // If there are no trophies or upgrades, finish the upgrade process
        if (this.trophiesToSelect.length <= 0) {
            (this.scene.scene.get('Game') as Game).finishPermUpgrade();
            return;
        }

        this.trophiesToSelect.forEach((item, index) => {
            if (item instanceof TrophyType) {
                const trophy = new Trophy(this.scene, item, positions[index].x, positions[index].y, "trophy");
                trophy.on('pointerdown', () => this.handleCardSelection(trophy));
                this.add(trophy);
            } else {
                const upgrade = item.getUpgrade();
                if (upgrade === null) {
                    log("Upgrade is null");
                    return;
                }
                const upgradeCard = new Upgrade(this.scene, item, positions[index].x, positions[index].y, "trophy", false, true);
                upgradeCard.on('pointerdown', () => this.handleCardSelection(upgradeCard));
                this.add(upgradeCard);
            }
        });
    }

    private async handleCardSelection(selectedItem: Trophy | Upgrade) {
        if (selectedItem instanceof Trophy) {
            console.log("Trophy selected");
            Library.addTrophyType(selectedItem.trophyType);
            OutstandingTrophyList.removeTrophy(selectedItem.trophyType);
        } else if (selectedItem instanceof Upgrade) {
            console.log("Upgrade selected");
            const upgrade = selectedItem.getCardType().getUpgrade();
            if (upgrade === null) {
                log("Upgrade is null");
                return;
            }
            console.log("ADDING UPGRADE: " + upgrade);
            const newCard = new Card(this.scene, upgrade, "playerDeck", 0, 0, "front");
            //log all cards in baseCards
            
            // Delete the card using the key
            const index = this.findCardTypeIndexByKey(CoachList.you.getBaseCards(), selectedItem.getCardType().getKey());
    
            if (index > -1) {
                log("Found card to remove at index " + index);
                log("array length was " + CoachList.you.getBaseCards().length);
                CoachList.you.getBaseCards().splice(index, 1);
            } else {
                log("Couldn't find card to remove");
            }
            CoachList.you.getBaseCards().push(upgrade);
            await StorageManager.saveBaseDeck(CoachList.you.getBaseCards());

            log("full deck is now: ");
            CoachList.you.getBaseCards().forEach(card => {
                log(card.toString());
            });
            
            //todo - this is suspicious that i have to hide it. because it should be moved later but it stays on the screen
            newCard.hide();
        } else {
            console.log("Unknown item selected");
        }
    
        (this.scene.scene.get('Game') as Game).finishPermUpgrade();
    }
    
    findCardTypeIndexByKey(cards: CardType[], key: CardKeys): number {
        log("Finding card type index by key: " + key);
        return cards.findIndex(card => card.getKey() === key);
    }
}
