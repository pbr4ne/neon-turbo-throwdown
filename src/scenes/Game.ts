/* START OF COMPILED CODE */

import Phaser from "phaser";
import UILayerPrefab from "../prefabs/UILayerPrefab";
import GameplayScript from "../script-nodes/gameplay/GameplayScript";
import TextureInfoScript from "../script-nodes/gameplay/TextureInfoScript";
/* START-USER-IMPORTS */
import Deck from "../prefabs/Deck";
import Hand from "../prefabs/Hand";
import Player from "../prefabs/Player";
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {

	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// background_1
		const background_1 = this.add.image(0, 0, "background-1");
		background_1.setOrigin(0, 0);

		// background_2
		const background_2 = this.add.image(0, 0, "background-2");
		background_2.setOrigin(0, 0);

		// background_3
		const background_3 = this.add.image(0, 0, "background-3");
		background_3.setOrigin(0, 0);

		// uiLayer
		const uiLayer = new UILayerPrefab(this, 0, 0);
		this.add.existing(uiLayer);

		// opponentBorder
		this.add.image(1630, 261, "opponentBorder");

		// gameplayScript
		const gameplayScript = new GameplayScript(this);

		// yellow
		const yellow = new TextureInfoScript(gameplayScript.textures);

		// orange
		const orange = new TextureInfoScript(gameplayScript.textures);

		// green
		const green = new TextureInfoScript(gameplayScript.textures);

		// yellow (prefab fields)
		yellow.texture = {"key":"ball-cyan"};

		// orange (prefab fields)
		orange.texture = {"key":"ball-yellow"};

		// green (prefab fields)
		green.texture = {"key":"ball-magenta"};

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	public id = 0;
	private playerDeck!: Deck;
    private playerHand!: Hand;
    private enemyDeck!: Deck;
    private enemyHand!: Hand;
    private players!: Player[];
    private enemies!: Player[];
    private drawCount: number = 0;

	create() {
		this.id++;
		this.editorCreate();

        this.playerDeck = new Deck(this);
        this.playerHand = new Hand(this, 5);
        this.enemyDeck = new Deck(this);
        this.enemyHand = new Hand(this, 5);
        this.players = [];
        this.enemies = [];

        this.playerDeck.createDeck();
        this.enemyDeck.createDeck();

        const deckArea = this.playerDeck.drawDeck(100, 840);
        deckArea.on("pointerdown", this.onDeckClick.bind(this));

        this.createPlayerAnimations();
        this.createEnemyAnimations();
        this.addPlayers();
        this.addEnemies();
    }

	createPlayerAnimations() {
        this.anims.create({
            key: 'player1_anim',
            frames: [
                { key: 'player1a' },
                { key: 'player1b' },
                { key: 'player1c' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'player2_anim',
            frames: [
                { key: 'player2a' },
                { key: 'player2b' },
                { key: 'player2c' }
            ],
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'player3_anim',
            frames: [
                { key: 'player3a' },
                { key: 'player3b' },
                { key: 'player3c' }
            ],
            frameRate: 3,
            repeat: -1
        });
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

	addPlayers() {
        const player1 = new Player(this, 720, 459, 'player1a');
        this.add.existing(player1);
        player1.sprite.play('player1_anim');
        player1.on("pointerdown", () => this.handlePlayerClick(player1));
        this.players.push(player1);

        const player2 = new Player(this, 950, 583, 'player2a');
        this.add.existing(player2);
        player2.sprite.play('player2_anim');
        player2.on("pointerdown", () => this.handlePlayerClick(player2));
        this.players.push(player2);

        const player3 = new Player(this, 1211, 453, 'player3a');
        this.add.existing(player3);
        player3.sprite.play('player3_anim');
        player3.on("pointerdown", () => this.handlePlayerClick(player3));
        this.players.push(player3);
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

    handlePlayerClick(player: Player) {
        this.playerHand.assignCardToPlayer(player);
    }

    onDeckClick() {
        if (this.drawCount < 5) {
            const topCard = this.playerDeck.drawCard();
            if (topCard) {
                topCard.setTexture("cardFront");
                topCard.showName(true);
                topCard.showIcon(true);
                this.playerHand.addCard(topCard);
                this.drawCount++;
            }
        }
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
