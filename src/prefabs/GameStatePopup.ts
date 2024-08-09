import Phaser from "phaser";
import FloatingObjectScript from "../script-nodes/ui/FloatingObjectScript";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class GameStatePopup extends Phaser.GameObjects.Container {
    private gameOverText!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, message: string, x?: number, y?: number, font?: string) {
        super(scene);

        new FloatingObjectScript(this);

        this.gameOverText = TextFactory.createText(this.scene, 980, 500, message, {
            fontSize: '72px',
            color: Colours.MAGENTA_STRING,
            stroke: Colours.CYAN_STRING,
            strokeThickness: 5,
            align: 'center'
        });
        this.gameOverText.setOrigin(0.5, 0.5);
        this.add(this.gameOverText);

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
