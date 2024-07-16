/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import { Coach } from "../throwdown/Coach";
import { CoachList } from "../throwdown/CoachList";
import DialogBox from "../dialogue/DialogBox";
import Player from "../prefabs/Player";
import { DialogueStorage } from "../dialogue/DialogueStorage";
import RunUpgrade from "../prefabs/RunUpgrade";
import PermUpgrade from "../prefabs/PermUpgrade";
import Throwdown from "../prefabs/Throwdown";
import { checkUrlParam, getUrlParam, log } from "../utilities/GameUtils";
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {

	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		let courtImage = this.add.image(953, 443, "court");
        courtImage.setDepth(-20);
		
		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */
	public player!: Player;
	private dialogLayer!: Phaser.GameObjects.Layer;
    private dialogBox!: DialogBox;
    private runUpgrade!: RunUpgrade;
    private permUpgrade!: PermUpgrade;
    private currentCoach: Coach = CoachList.primo;
    private cardDescription!: Phaser.GameObjects.Text;
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

        

        CoachList.primo.setDialogue(DialogueStorage.primoDialogue);
        CoachList.sporticus.setDialogue(DialogueStorage.sporticusDialogue);
        CoachList.tycoon.setDialogue(DialogueStorage.tycoonDialogue);
        CoachList.office.setDialogue(DialogueStorage.officeDialogue);
        CoachList.sgtsteve.setDialogue(DialogueStorage.sgtsteveDialogue);
        CoachList.betsy.setDialogue(DialogueStorage.betsyDialogue);
        CoachList.coree.setDialogue(DialogueStorage.coreeDialogue);
        CoachList.turbonerd.setDialogue(DialogueStorage.turbonerdDialogue);
        CoachList.shadowken.setDialogue(DialogueStorage.shadowkenDialogue);
        CoachList.boss10.setDialogue(DialogueStorage.boss10Dialogue);

        this.cardDescription = new Phaser.GameObjects.Text(this, 1500, 740, "", {
			fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
			fontSize: '16px',
			color: '#00ffff',
			padding: { x: 5, y: 5 },
			align: 'left'
		});
        this.cardDescription.setWordWrapWidth(400);
		this.dialogLayer.add(this.cardDescription);

        if (checkUrlParam("skipIntro", "true")) {
            this.throwdown = new Throwdown(this, this.currentCoach, this.player);
            this.player.setThrowdown(this.throwdown);
        } else {
            this.doDialogue(this.currentCoach, "intro");
        }
    }

    setCardDescription(description: string) {
        this.cardDescription.setText(description);
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
            log("CURRENT DECK SIZE START OF THROWDOWN: " + this.player.deck.getCards().length);
            log("CURRENT DISCARD PILE SIZE START OF THROWDOWN: " + this.player.discardPile.getCards().length);

        } else if (type === "win") {
            this.throwdown.destroy();
            this.doRunUpgrade();
        } else if (type === "lose") {
            this.throwdown.destroy();
            this.doPermUpgrade();
        }

        DialogueStorage.saveDialogues();
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

        this.player.addMembers();

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
