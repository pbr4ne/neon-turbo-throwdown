
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Deck from "~/prefabs/Deck";
import Hand from "~/prefabs/Hand";
import Player from "~/prefabs/Player";
/* END-USER-IMPORTS */

export default class OpponentScene extends Phaser.Scene {
    private opponentDeck!: Deck;
    private opponentHand!: Hand;
    private enemies!: Player[];
    private opponentImage!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "OpponentScene" });
    }

    create() {
		console.log("OpponentScene created");
        // Initialize the opponent's deck and hand
        this.opponentDeck = new Deck(this);
        this.opponentHand = new Hand(this, 5);
        this.enemies = [];

		this.add.image(1630, 261, "opponentBorder");

        this.opponentDeck.createDeck();
        this.opponentDeck.drawDeck(100, 100); // Example position for the deck

		this.createEnemyAnimations();
        this.addEnemies();

        // Display the opponent's image
        this.opponentImage = this.add.image(1720, 100, "opponent1").setOrigin(1, 0); // Top right corner
    }

	addEnemies() {
        const enemy1 = new Player(this, 730, 259, 'enemy1a');
        this.add.existing(enemy1);
        enemy1.sprite.play('enemy1_anim');
        this.enemies.push(enemy1);

        const enemy2 = new Player(this, 950, 213, 'enemy2a');
        this.add.existing(enemy2);
        enemy2.sprite.play('enemy2_anim');
        this.enemies.push(enemy2);

        const enemy3 = new Player(this, 1180, 253, 'enemy3a');
        this.add.existing(enemy3);
        enemy3.sprite.play('enemy3_anim');
        this.enemies.push(enemy3);
    }

	createEnemyAnimations() {
        this.anims.create({
            key: 'enemy1_anim',
            frames: [
                { key: 'enemy1a' },
                { key: 'enemy1b' },
                { key: 'enemy1c' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy2_anim',
            frames: [
                { key: 'enemy2a' },
                { key: 'enemy2b' },
                { key: 'enemy2c' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy3_anim',
            frames: [
                { key: 'enemy3a' },
                { key: 'enemy3b' },
                { key: 'enemy3c' }
            ],
            frameRate: 3,
            repeat: -1
        });
    }
}