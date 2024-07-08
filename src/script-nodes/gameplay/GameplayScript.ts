
// You can write more code here

/* START OF COMPILED CODE */

import { ScriptNode } from "@phaserjs/editor-scripts-core";
import Phaser from "phaser";
import { OnEventScript } from "@phaserjs/editor-scripts-core";
import { CallbackActionScript } from "@phaserjs/editor-scripts-core";
/* START-USER-IMPORTS */
import Ball from "../../prefabs/Ball";
import { GameSounds } from "../../GameSounds";
import TextureInfoScript from "./TextureInfoScript";
import GameoverPrefab from "../../prefabs/GameoverPrefab";
/* END-USER-IMPORTS */

export default class GameplayScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		// textures
		const textures = new ScriptNode(this);

		// onGamePaused
		const onGamePaused = new OnEventScript(this);

		// callTogglePause
		const callTogglePause = new CallbackActionScript(onGamePaused);

		// onGamePaused (prefab fields)
		onGamePaused.eventName = "game-paused";
		onGamePaused.eventEmitter = "scene.events";

		// callTogglePause (prefab fields)
		callTogglePause.callback = () => this.togglePause();

		this.textures = textures;

		/* START-USER-CTR-CODE */

		this.scene.time.paused = false;
		this.scene.physics.world.isPaused = false;

		/* END-USER-CTR-CODE */
	}

	public textures: ScriptNode;

	/* START-USER-CODE */

	private _baseGravity = 50;
	private _maxSpawnDelay = 2000;
	private _points = 0;
	private _gameOver = false;

	private togglePause() {

		this.setPaused(!this.isPaused());
	}

	private isPaused() {

		return this.scene.time.paused;
	}

	private setPaused(paused: boolean) {

		this.scene.time.paused = paused;
		this.scene.physics.world.isPaused = paused;
	}

	protected override awake(): void {

		//this.spawnBall();

		//this.nextDifficultyLevel();
	}

	private nextDifficultyLevel() {

		if (this._gameOver) {

			return;
		}

		this._baseGravity += 50;
		this._maxSpawnDelay =  Math.max(this._maxSpawnDelay - 100, 0);

		this.scene.time.addEvent({
			delay: 5000,
			callback: () => this.nextDifficultyLevel()
		});
	}

	private spawnBall() {

		if (this._gameOver) {

			return;
		}

		const scene = this.scene;

		const { texture } = Phaser.Utils.Array.GetRandom(this.textures.children) as TextureInfoScript;

		const ball = new Ball(scene, 0, 0, texture.key, texture.frame);

		// set position
		const margin = 50;

		const minX = ball.width / 2 + margin;
		const maxX = scene.scale.width - ball.width / 2 - margin;

		ball.setPosition(
			Phaser.Math.Between(minX, maxX),
			scene.scale.height + ball.height / 2
		);

		// set velocity
		ball.body.velocity.y = -Phaser.Math.Between(this._baseGravity, this._baseGravity + 200);
		ball.body.angularVelocity = ball.body.velocity.y / 2 * (Math.random() < 0.5 ? -1 : 1);

		// listen pointer
		ball.once("pointerdown", () => this.pickBall(ball), this);

		// add the ball
		scene.add.existing(ball);

		// program the next spawn event
		scene.time.addEvent({
			delay: Phaser.Math.Between(100, this._maxSpawnDelay),
			callback: this.spawnBall,
			callbackScope: this
		});
	}

	private killBall(ball: Ball) {

		ball.destroy();
	}

	private get balls() {

		return this.scene.children.list.filter(obj => obj instanceof Ball) as Ball[];
	}

	protected override update(): void {

		if (this.isPaused() || this._gameOver) {

			return;
		}

		for (const ball of this.balls) {

			if (ball.y + ball.displayHeight / 2 < 0) {

				this.killBall(ball);

				this._points--;

				if (this._points < 0) {

					this._gameOver = true;

					this.showGameOverMessage();

				} else {

					this.scene.events.emit("update-points", this._points);
				}
			}
		}
	}

	private showGameOverMessage() {

		const msg = new GameoverPrefab(this.scene);

		this.scene.add.existing(msg);

		this.scene.events.emit("scene-awake");
	}

	private pickBall(ball: Ball) {

		if (this.isPaused() || this._gameOver) {

			return;
		}

		ball.animatePickBall(() => {

			this.killBall(ball);
		});

		this._points++;

		this.scene.events.emit("update-points", this._points);

		GameSounds.playball();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
