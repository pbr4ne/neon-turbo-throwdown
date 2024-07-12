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
		
		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */
	private player!: Player;
	private dialogLayer!: Phaser.GameObjects.Layer;
    private courtImage!: Phaser.GameObjects.Image;
    private dialogBox!: DialogBox;
    private dialogueStorage!: DialogueStorage;
    private runUpgrade!: RunUpgrade;
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

    doPermUpgrade() {
        //to implement
    }

    winThrowdown() {
        this.doDialogue(this.dialogueStorage.primoWinDialogue, "win");
    }

    loseThrowdown() {
        this.doDialogue(this.dialogueStorage.primoWinDialogue, "lose");
    }

    finishDialogue(type: string) {
        this.dialogBox.destroyEverything();
        this.dialogBox.destroy();
        if (type === "intro") {
            this.player = new Player(this);
            this.throwdown = new Throwdown(this, this.currentCoach, this.player);
            this.player.setThrowdown(this.throwdown);

        } else if (type === "win") {
            this.throwdown.destroy();
            this.doRunUpgrade();
            
        } else if (type === "loss") {
            this.throwdown.destroy();
            //this.doPermUpgrade();
        }
    }

    finishRunUpgrade() {
        this.runUpgrade.destroyEverything();
        this.runUpgrade.destroy();

        this.currentCoach = this.currentCoach.getNextCoach();

        this.throwdown = new Throwdown(this, this.currentCoach, this.player);
        this.player.setThrowdown(this.throwdown);
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
