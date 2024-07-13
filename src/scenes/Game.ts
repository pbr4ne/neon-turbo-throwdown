/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { Coach } from "../throwdown/Coach";
import { CoachList } from "../throwdown/CoachList";
import DialogBox from "../dialogue/DialogBox";
import Player from "../prefabs/Player";
import { DialogueConversation } from "../dialogue/Dialogue";
import { DialogueStorage } from "../dialogue/DialogueStorage";
import RunUpgrade from "../prefabs/RunUpgrade";
import PermUpgrade from "../prefabs/PermUpgrade";
import Throwdown from "../prefabs/Throwdown";
import { Library } from "../throwdown/Library";
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
    private permUpgrade!: PermUpgrade;
    private currentCoach: Coach = CoachList.primo;
    public throwdown!: Throwdown;
    private numRuns: number = 0;

	create() {
		this.editorCreate();

		this.dialogLayer = this.add.layer();
        this.dialogueStorage = new DialogueStorage();
        //this.doRunUpgrade();

        this.player = new Player(this);
        Library.initializeLibrary();

        CoachList.primo.setDialogue(DialogueStorage.primoDialogue);
        CoachList.sporticus.setDialogue(DialogueStorage.sporticusDialogue);
        CoachList.russ.setDialogue(DialogueStorage.russDialogue);
        CoachList.boss.setDialogue(DialogueStorage.bossDialogue);
        CoachList.steve.setDialogue(DialogueStorage.steveDialogue);
        CoachList.betsy.setDialogue(DialogueStorage.betsyDialogue);
        CoachList.coree.setDialogue(DialogueStorage.coreeDialogue);
        CoachList.turbo.setDialogue(DialogueStorage.turboDialogue);
        CoachList.shadow.setDialogue(DialogueStorage.shadowDialogue);
        CoachList.boss10.setDialogue(DialogueStorage.boss10Dialogue);

        this.doDialogue(this.currentCoach, "intro");
    }

    doDialogue(coach: Coach, type: string) {
        
        const dialog = new DialogBox(this, 960, 542, coach, type);

        this.dialogBox = this.dialogLayer.add(dialog);
    }

    finishDialogue(type: string) {
        this.dialogBox.destroyEverything();
        this.dialogBox.destroy();
        if (type === "intro") {
            this.throwdown = new Throwdown(this, this.currentCoach, this.player);
            this.player.setThrowdown(this.throwdown);
            console.log("CURRENT DECK SIZE START OF THROWDOWN: " + this.player.deck.getCards().length);

        } else if (type === "win") {
            this.throwdown.destroy();
            this.doRunUpgrade();
            
        } else if (type === "lose") {
            this.throwdown.destroy();
            this.doPermUpgrade();
        }
    }

    winThrowdown() {
        this.doDialogue(this.currentCoach, "win");
    }

    loseThrowdown() {
        this.doDialogue(this.currentCoach, "lose");
    }

    doRunUpgrade() {
        this.runUpgrade = new RunUpgrade(this, this.currentCoach, this.player);
        this.runUpgrade = this.dialogLayer.add(this.runUpgrade);
    }

    finishRunUpgrade() {
        this.runUpgrade.destroyEverything();
        this.runUpgrade.destroy();

        this.currentCoach = this.currentCoach.getNextCoach();

        this.doDialogue(this.currentCoach, "intro");
    }

    doPermUpgrade() {
        this.permUpgrade = new PermUpgrade(this, this.player);
        this.permUpgrade = this.dialogLayer.add(this.permUpgrade);
    }

    finishPermUpgrade() {
        this.permUpgrade.destroyEverything();
        this.permUpgrade.destroy();

        this.scene.start('Welcome');
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
