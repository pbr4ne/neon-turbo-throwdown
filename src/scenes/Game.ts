/* START OF COMPILED CODE */

import Phaser from "phaser";
import GameplayScript from "../script-nodes/gameplay/GameplayScript";
import TextureInfoScript from "../script-nodes/gameplay/TextureInfoScript";
/* START-USER-IMPORTS */
import { Coach } from "../throwdown/Coach";
import DialogBox from "../dialogue/DialogBox";
import Player from "../prefabs/Player";
import { DialogueConversation } from "../dialogue/Dialogue";
import { DialogueStorage } from "../dialogue/DialogueStorage";
import RunUpgrade from "../prefabs/RunUpgrade";
import Throwdown from "../prefabs/Throwdown";
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {

	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		this.courtImage = this.add.image(953, 443, "court");
		
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
	private player!: Player;
	private dialogLayer!: Phaser.GameObjects.Layer;
    private courtImage!: Phaser.GameObjects.Image;
    private dialogBox!: DialogBox;
    private dialogueStorage!: DialogueStorage;
    private runUpgrade!: RunUpgrade;
    private currentState = "dialog";
    private currentCoach: Coach = Coach.primo;
    public throwdown!: Throwdown;

	create() {
		this.editorCreate();
		this.dialogLayer = this.add.layer();
        this.dialogueStorage = new DialogueStorage();
        this.doDialogue(this.dialogueStorage.introDialogue, "intro");
    }

    doDialogue(dialogueConversation: DialogueConversation, type: string) {
        
        const dialog = new DialogBox(this, 960, 542, dialogueConversation, type);

        this.dialogBox = this.dialogLayer.add(dialog);
    }

    doRunUpgrade() {
        this.runUpgrade = new RunUpgrade(this, this.currentCoach, this.player);
        this.runUpgrade = this.dialogLayer.add(this.runUpgrade);
    }

    winThrowdown() {
        this.doDialogue(this.dialogueStorage.primoWinDialogue, "win");
    }

    finishDialogue(type: string) {
        this.dialogBox.destroyEverything();
        this.dialogBox.destroy();
        if (type === "intro") {
            this.setupInitialState();

            this.throwdown = new Throwdown(this, this.currentCoach, this.player);
            this.player.setThrowdown(this.throwdown);
        } else if (type === "win") {
            this.doRunUpgrade();
        }
    }

    finishRunUpgrade() {
        this.runUpgrade.destroyEverything();
        this.runUpgrade.destroy();

        this.throwdown = new Throwdown(this, this.currentCoach, this.player);
        this.player.setThrowdown(this.throwdown);
        // this.renderGym();
        // this.nextStep();
    }

	setupInitialState() {
        this.player = new Player(this);
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
