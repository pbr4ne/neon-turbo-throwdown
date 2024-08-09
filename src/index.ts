import Phaser from "phaser";
import Game from "./scenes/Game";
import Preload from "./scenes/Preload";
import Welcome from "./scenes/Welcome";
import Init from "./scenes/Init";

const game = new Phaser.Game({
    width: 1920,
    height: 1080,
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH
    },
    physics: {
        default: "arcade",
    },
    scene: [Preload, Init, Welcome, Game],
    transparent: true,
    input: {
        activePointers: 3,
    }
});

game.scene.start("Preload");