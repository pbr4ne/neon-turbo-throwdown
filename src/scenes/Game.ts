import Phaser from "phaser";
import { Coach } from "../throwdown/Coach";
import { CoachList } from "../throwdown/CoachList";
import DialogueBox from "../dialogue/DialogueBox";
import Player from "../prefabs/Player";
import { DialogueStorage } from "../dialogue/DialogueStorage";
import RunUpgrade from "../prefabs/RunUpgrade";
import PermUpgrade from "../prefabs/PermUpgrade";
import Throwdown from "../prefabs/Throwdown";
import { checkUrlParam, getUrlParam, log } from "../utilities/GameUtils";
import { Library } from "../throwdown/Library";
import BaseScene from "./BaseScene";

export default class Game extends BaseScene {

	constructor() {
		super("Game");
	}

	editorCreate(): void {
        super.create();

		let courtImage = this.add.image(953, 443, "court");
        courtImage.setDepth(-20);
		
		this.events.emit("scene-awake");
	}

	public player!: Player;
	private dialogLayer!: Phaser.GameObjects.Layer;
    private dialogBox!: DialogueBox;
    private runUpgrade!: RunUpgrade;
    private permUpgrade!: PermUpgrade;
    private currentCoach: Coach = CoachList.primo;
    public throwdown!: Throwdown;

    create() {
        this.editorCreate();

        this.dialogLayer = this.add.layer();

        this.player = new Player(this);
        this.player.addMembers();

        const overrideCoach = getUrlParam("setCoach");
        if (overrideCoach) {
            this.currentCoach = CoachList.getCoachByName(overrideCoach);
        } else {
            //reset back to first coach
            this.currentCoach = CoachList.primo;
        }

        
    
        if (checkUrlParam("skipIntro", "true")) {
            this.throwdown = new Throwdown(this, this.currentCoach, this.player);
            this.player.setThrowdown(this.throwdown);
        } else {
            this.doDialogue(this.currentCoach, "intro", true);
        }
    }

    doDialogue(coach: Coach, type: string, initial: boolean = false, spiritCoachDialogue: boolean = false) {
        const dialog = new DialogueBox(this, 960, 542, coach, type, initial, spiritCoachDialogue);

        this.dialogBox = this.dialogLayer.add(dialog);
    }

    finishDialogue(type: string) {
        this.dialogBox.destroyEverything();
        this.dialogBox.destroy();
        if (type === "intro") {
            this.throwdown = new Throwdown(this, this.currentCoach, this.player);
            this.player.setThrowdown(this.throwdown);
            log("CURRENT DECK SIZE START OF THROWDOWN: " + this.player.deck.getCards().length);
            log("CURRENT DISCARD PILE SIZE START OF THROWDOWN: " + this.player.discardPile.getCards().length);

        } else if (type === "win") {
            this.throwdown.destroy();
            this.doRunUpgrade();
        } else if (type === "lose") {
            this.throwdown.destroy();
            log("after lose dialogue");
            if (Library.getNumRuns() === 1) {
                log("number of runs is 0, running initialLose dialogue");
                this.doDialogue(this.currentCoach, "initialLose", false, true);
            } else {
                log("number of runs is not 0, running perm upgrade");
                this.doPermUpgrade();
            }
        } else if (type === "initialLose") {
            log('done initialLose dialogue');
            this.throwdown.destroy();
            this.doPermUpgrade();
        } else if (type === "final") {
            this.throwdown.destroy();
            Library.incrementNumRuns();
            Library.setWon(true);
            this.scene.start('Init');
        }

        DialogueStorage.saveDialogues();
    }

    winThrowdown() {
        this.doDialogue(this.currentCoach, "win");
    }

    loseThrowdown() {
        this.doDialogue(this.currentCoach, "lose");
    }

    doFinalDialogue() {
        this.doDialogue(this.currentCoach, "final");
    }

    doRunUpgrade() {
        this.runUpgrade = new RunUpgrade(this, this.currentCoach, this.player);
        this.runUpgrade = this.dialogLayer.add(this.runUpgrade);
    }

    finishRunUpgrade() {
        this.runUpgrade.destroyEverything();
        this.runUpgrade.destroy();

        this.currentCoach = this.currentCoach.getNextCoach();
        
        if (this.currentCoach === CoachList.you) {
            this.doFinalDialogue();
        } else {
            this.player.addMembers();

            this.doDialogue(this.currentCoach, "intro");
        }
    }

    doPermUpgrade() {
        this.permUpgrade = new PermUpgrade(this, this.player);
        this.permUpgrade = this.dialogLayer.add(this.permUpgrade);
    }

    finishPermUpgrade() {
        this.permUpgrade?.destroyEverything();
        this.permUpgrade?.destroy();

        this.scene.start('Init');
    }
}
