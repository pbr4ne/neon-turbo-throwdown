import Phaser from "phaser";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";

export default class GameStatePopup extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, message: string, x?: number, y?: number, font?: string) {
		super(scene);

		new FloatingObjectScript(this);

		this.gameOverText = new Phaser.GameObjects.Text(this.scene, 980, 500, message, {
			fontFamily: '"Press Start 2P"',
			fontSize: '72px',
			color: '#ff00ff',
            stroke: '#00ffff',
            strokeThickness: 5,
			padding: { x: 5, y: 5 },
			align: 'center'
		});
		this.add(this.gameOverText);
		this.gameOverText.setOrigin(0.5, 0.5);

		this.alpha = 0; 
		this.scene.add.existing(this);

		this.scene.tweens.add({
			targets: this,
			alpha: { from: 0, to: 1 },
			duration: 1000,
			onComplete: () => {
				this.scene.time.delayedCall(1000, this.fadeOutAndDestroy, [], this);
			}
		});
	}

	private gameOverText!: Phaser.GameObjects.Text;

	private fadeOutAndDestroy() {
		this.scene.tweens.add({
			targets: this,
			alpha: { from: 1, to: 0 },
			duration: 1000,
			onComplete: () => {
				this.destroy();
			},
		});
	}
}
