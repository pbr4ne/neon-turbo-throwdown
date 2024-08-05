import Phaser from "phaser";
import { StorageManager } from "../utilities/StorageManager";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";
import { Library } from "../throwdown/Library";
import { OutstandingTrophyList } from "../trophies/OutstandingTrophyList";
import { DialogueStorage } from "../dialogue/DialogueStorage";
import { log } from "../utilities/GameUtils";

declare global {
    interface Window {
        scanLines: boolean;
    }
}

window.scanLines = window.scanLines !== undefined ? window.scanLines : true;

export default class Settings extends Phaser.GameObjects.Container {
    private scanLinesButton: Phaser.GameObjects.Text | null = null;
    private styleElement: HTMLStyleElement;

    constructor(scene: Phaser.Scene) {
        super(scene, 960, 540);

        this.createBackground(scene);
        this.createText(scene);
        this.createButtons(scene);

        this.styleElement = document.getElementById('scanline-style') as HTMLStyleElement;
        if (!this.styleElement) {
            this.styleElement = document.createElement('style');
            this.styleElement.id = 'scanline-style';
            document.head.appendChild(this.styleElement);
        }

        this.updateScanlines();

        scene.events.on(Phaser.Scenes.Events.RESUME, this.updateScanlines, this);
    }

    private createBackground(scene: Phaser.Scene) {
        const blockInput = scene.add.rectangle(0, 0, 1920, 1080, Colours.BLACK_HEX, 0.5).setOrigin(0.5, 0.5).setInteractive();
        this.add(blockInput);

        const background = scene.add.rectangle(0, 0, 500, 400, Colours.BLACK_HEX, 0.8).setOrigin(0.5, 0.5);
        background.setStrokeStyle(4, Colours.CYAN_HEX);
        this.add(background);
    }

    private createText(scene: Phaser.Scene) {
        const texts = [
            { x: 0, y: -120, text: "Settings", fontSize: '20px', color: Colours.YELLOW_STRING },
        ];

        texts.forEach(config => {
            const text = TextFactory.createText(scene, config.x, config.y, config.text, {
                fontSize: config.fontSize,
                color: config.color,
                align: 'center',
            }).setOrigin(0.5, 0.5);
            this.add(text);
        });
    }

    private createButtons(scene: Phaser.Scene) {
        const hardResetButton = this.createButton(scene, 0, 0, "Hard reset", Colours.RED_STRING, true, async () => {
            await StorageManager.clearAllData();
            Library.resetPureDeck();
            Library.setNumRuns(0);
            OutstandingTrophyList.resetTrophyTypes();
            DialogueStorage.loadDialogues();
            this.scene.scene.start("Init");
            this.destroy();
        });

        this.scanLinesButton = this.createButton(scene, 0, 60, window.scanLines ? "Turn off scanlines" : "Turn on scanlines", Colours.MAGENTA_STRING, true, () => {
            this.toggleScanlines();
        });

        const closeButton = this.createButton(scene, 0, 150, "Close", Colours.CYAN_STRING, false, () => {
            this.destroy();
        });

        this.add(hardResetButton);
        this.add(this.scanLinesButton);
        this.add(closeButton);
    }

    private createButton(scene: Phaser.Scene, x: number, y: number, text: string, color: string, border: boolean, callback: () => void): Phaser.GameObjects.Text {
        const button = TextFactory.createText(scene, x, y, text, {
            fontSize: '20px',
            color: color,
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });

        button.on('pointerdown', callback);

        button.on('pointerover', () => {
            scene.input.setDefaultCursor('pointer');
        });

        button.on('pointerout', () => {
            scene.input.setDefaultCursor('default');
        });

        if (border) {
            const buttonBackground = scene.add.rectangle(x, y, button.width + 20, button.height + 10, Colours.BLACK_HEX, 0.8).setOrigin(0.5, 0.5);
            buttonBackground.setStrokeStyle(2, Colours.WHITE_HEX);
            this.add(buttonBackground);
        }

        this.add(button);

        return button;
    }

    private toggleScanlines() {
        window.scanLines = !window.scanLines;
        this.updateScanlines();
        this.scanLinesButton!.setText(window.scanLines ? "Turn off scanlines" : "Turn on scanlines");
    }

    private updateScanlines() {
        if (window.scanLines) {
            this.turnOnScanlines();
        } else {
            this.turnOffScanlines();
        }
    }

    private turnOffScanlines() {
        log("turn off scanlines");
        this.styleElement.innerHTML = `
            body::after {
                background: none !important;
            }
        `;
    }

    private turnOnScanlines() {
        log("turn on scanlines");
        this.styleElement.innerHTML = `
            body::after {
                background: linear-gradient(0deg, #000 50%, #fff 50%);
                background-size: 1px 0.5%;
                z-index: 2;
                mix-blend-mode: overlay;
                opacity: 0.5;
            }
        `;
    }
}
