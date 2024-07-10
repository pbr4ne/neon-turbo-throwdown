
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PreloadBarUpdaterScript from "../script-nodes/ui/PreloadBarUpdaterScript";
/* START-USER-IMPORTS */
import assetPackUrl from "../../static/assets/asset-pack.json";
import WebFont from 'webfontloader';
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// progressBar
		const progressBar = this.add.rectangle(832.5, 541, 256, 20);
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 0xff00ff;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(832.5, 541, 256, 20);
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 0x000000;
		progressBarBg.isStroked = true;
		progressBarBg.strokeColor = 0x000000;

		// loadingText
		const loadingText = this.add.text(831.5, 509, "", {});
		loadingText.text = "Turbocharging...";
		loadingText.setStyle({ "color": "#ff00ff", "fontFamily": '"Press Start 2P"', "fontSize": "25px", "strokeThickness": 2, "stroke": "#ff00ff" });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        WebFont.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
		this.editorCreate();
            }
        }); 

		this.load.pack("asset-pack", assetPackUrl);
	}

	create() {

		this.scene.start("Welcome");
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
