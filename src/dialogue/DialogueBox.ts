import Phaser from "phaser";
import Game from "../scenes/Game";
import { DialogueConversation, DialogueStep } from "./Dialogue";
import { Coach } from "../throwdown/Coach";
import { DialogueStorage } from "./DialogueStorage";
import { log } from "../utilities/GameUtils";
import { GameSounds } from "../utilities/GameSounds";
import { Library } from "../throwdown/Library";
import TextFactory from "../utilities/TextUtils";
import { Colours } from "../utilities/Colours";

export default class DialogueBox extends Phaser.GameObjects.Container {

	private dialogueType: string;
    private dialogueConversation!: DialogueConversation;
    private dialogueText!: Phaser.GameObjects.Text;
    private nextButton!: Phaser.GameObjects.Rectangle;
    private buttonText!: Phaser.GameObjects.Text;
    private optionText1!: Phaser.GameObjects.Text;
    private optionText2!: Phaser.GameObjects.Text;
    private optionText3!: Phaser.GameObjects.Text;
    private optionInstructions!: Phaser.GameObjects.Text;
    private avatar!: Phaser.GameObjects.Image;
    private avatarName!: Phaser.GameObjects.Text;
    private skipButton!: Phaser.GameObjects.Rectangle;
    private skipButtonText!: Phaser.GameObjects.Text;
    private idleModeImage!: Phaser.GameObjects.Image;
    private idleModeText!: Phaser.GameObjects.Text;
    private coachName!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, coach: Coach, dialogueType: string, initialDialogue: boolean, spiritCoachDialogue: boolean) {
        super(scene, x ?? 960, y ?? 542);

        this.dialogueType = dialogueType;
        log(`Dialogue type: ${dialogueType}  - spiritCoachDialogue: ${spiritCoachDialogue}`);

        if (!spiritCoachDialogue) {
            GameSounds.switchSong(this.scene, "neon-turbo-throwdown-chill");
        }

        this.createDialogueBackground(scene, spiritCoachDialogue);
        this.createIdleModeElements(initialDialogue);
        this.setupDialogueConversation(coach, dialogueType);

        if (this.dialogueConversation) {
            this.generateDialogue();
        }
    }

    private createDialogueBackground(scene: Phaser.Scene, spiritCoachDialogue: boolean) {
        const rectangle_1 = scene.add.rectangle(-12, 340, 132, 128);
        rectangle_1.scaleX = 10.314571568183906;
        rectangle_1.scaleY = 2.6941724549327337;
        rectangle_1.isStroked = true;
        rectangle_1.strokeColor = spiritCoachDialogue ? Colours.CYAN_HEX : Colours.MAGENTA_HEX;
        this.add(rectangle_1);
    }

    private createIdleModeElements(initialDialogue: boolean) {
        if (!initialDialogue) {
            this.idleModeImage = this.scene.add.image(135, 840, Library.getIdleMode() ? "switch-active" : "switch-idle")
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => {
                    this.scene.input.setDefaultCursor('pointer');
                })
                .on('pointerout', () => {
                    this.scene.input.setDefaultCursor('default');
                })
                .on('pointerdown', () => {
                    this.switchIdleMode();
                });

            this.idleModeText = TextFactory.createText(this.scene, 135, 920, "(for next combat)", {
                fontSize: '14px',
                color: Colours.YELLOW_STRING,
                align: 'center'
            });
            this.idleModeText.setOrigin(0.5, 0.5);
        }
    }

    private setupDialogueConversation(coach: Coach, dialogueType: string) {
        this.dialogueConversation = DialogueStorage.missingDialogueConversation;

        switch (dialogueType) {
            case "intro":
                this.dialogueConversation = coach.getDialogue()?.getAndIncrementIntroDialogue() || this.dialogueConversation;
                break;
            case "win":
                this.dialogueConversation = coach.getDialogue()?.getAndIncrementWinDialogue() || this.dialogueConversation;
                break;
            case "lose":
                this.dialogueConversation = coach.getDialogue()?.getAndIncrementLoseDialogue() || this.dialogueConversation;
                break;
            case "initialLose":
                log('initialLose dialogue!');
                this.dialogueConversation = DialogueStorage.firstSpiritDialogue;
                this.createSpiritDialogueScene();
                break;
            case "final":
                this.dialogueConversation = DialogueStorage.finalDialogue;
                break;
        }
    }

    private createSpiritDialogueScene() {
        this.scene.add.image(1625, 193, "coach-corner-spirit");
        this.scene.add.image(953, 443, "court-cyan");
        this.scene.add.existing(new Phaser.GameObjects.Image(this.scene, 1855, 78, "spirit").setOrigin(1, 0).setScale(1.2));
        this.coachName = TextFactory.createText(this.scene, 1720, 340, "Turbovoid", {
            color: Colours.BLACK_STRING,
            stroke: Colours.BLACK_STRING,
            strokeThickness: 1,
            padding: { x: 5, y: 5 },
        });
        this.coachName.setOrigin(0.5, 0.5);
    }

    private switchIdleMode() {
        Library.setIdleMode(!Library.getIdleMode());
        this.idleModeImage.setTexture(Library.getIdleMode() ? "switch-active" : "switch-idle");
    }

    generateDialogue() {
        var step = this.dialogueConversation.getCurrentStep();

        if (step == null) {
            log("No dialogue step found. setting missing dialogue");
            step = DialogueStorage.missingDialogueStep;
        }

        this.initializeTextAreas();
        this.renderText(step!);
    }

    handleNextButtonClick() {
        log("Next button clicked");
        var next = this.dialogueConversation.nextStep();
        var step = this.dialogueConversation.getCurrentStep();

        GameSounds.playButton();

        if (!next) {
            (this.scene.scene.get('Game') as Game).finishDialogue(this.dialogueType);
        } else {
            this.renderText(step!);
        }
    }

    handleSkipButtonClick() {
        log("Skip button clicked");
        GameSounds.playButton();
        (this.scene.scene.get('Game') as Game).finishDialogue(this.dialogueType);
    }

    hideAllTextAreas() {
        const elements = [
            this.dialogueText,
            this.optionText1,
            this.optionText2,
            this.optionText3,
            this.optionInstructions,
            this.nextButton,
            this.buttonText,
            this.skipButton,
            this.skipButtonText
        ];
        elements.forEach(element => element.setVisible(false));
    }

    renderText(step: DialogueStep) {
        this.hideAllTextAreas();
        log(step.getText() + "");
        const text = step.getText();
        this.avatar.setTexture(step.getCoach().getAvatar());
        this.avatarName.setText(step.getNameOverride() ?? step.getCoach().getName());

        if (typeof text === 'string') {
            this.dialogueText.setText(text);
            this.dialogueText.setVisible(true);
            this.nextButton.setVisible(true);
            this.buttonText.setVisible(true);
            this.skipButton.setVisible(true);
            this.skipButtonText.setVisible(true);

            if (text === "It's never over.") {
                GameSounds.playItsNeverOver();
            }

        } else if (Array.isArray(text)) {
            this.optionText1.setText(`1. ${text[0]}`);
            this.optionText1.setVisible(true);
            this.optionInstructions.setVisible(true);
            this.skipButton.setVisible(true);
            this.skipButtonText.setVisible(true);

            if (text.length > 1) {
                this.optionText2.setText(`2. ${text[1]}`);
                this.optionText2.setVisible(true);
            }

            if (text.length > 2) {
                this.optionText3.setText(`3. ${text[2]}`);
                this.optionText3.setVisible(true);
            }
        }
    }

    destroyEverything() {
        const elements = [
            this.dialogueText,
            this.optionText1,
            this.optionText2,
            this.optionText3,
            this.optionInstructions,
            this.nextButton,
            this.buttonText,
            this.avatar,
            this.avatarName,
            this.skipButton,
            this.skipButtonText,
            this.idleModeImage,
            this.idleModeText
        ];
        elements.forEach(element => element?.destroy());
    }

    initializeTextAreas() {
        this.avatar = this.scene.add.image(1760, 850, 'you');

        this.avatarName = TextFactory.createText(this.scene, 800, 430, "", {
            fontSize: '16px',
            align: 'center',
            wordWrap: { width: 250, useAdvancedWrap: true }
        });
        this.avatarName.setOrigin(0.5, 0.5);
        this.add(this.avatarName);

        this.dialogueText = TextFactory.createText(this.scene, -630, 200, "", {
            fontSize: '18px',
            color: Colours.CYAN_STRING,
            lineSpacing: 15,
            wordWrap: { width: 1100, useAdvancedWrap: true }
        });
        this.add(this.dialogueText);

        this.optionText1 = this.createOptionText(-630, 200);
        this.optionText2 = this.createOptionText(-630, 250);
        this.optionText3 = this.createOptionText(-630, 300);

        this.optionInstructions = TextFactory.createText(this.scene, 300, 453, "[click on an option]", {
            fontSize: '16px',
            color: Colours.CYAN_STRING,
        });
        this.add(this.optionInstructions);

        this.createNextButton();
        this.createSkipButton();

        this.hideAllTextAreas();
    }

    private createOptionText(x: number, y: number): Phaser.GameObjects.Text {
        const text = TextFactory.createText(this.scene, x, y, "", {
            fontSize: '18px',
            color: Colours.CYAN_STRING,
            wordWrap: { width: 1200, useAdvancedWrap: true }
        });
        this.add(text);
        text.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.handleNextButtonClick())
            .on('pointerover', () => text.setColor(Colours.MAGENTA_STRING))
            .on('pointerout', () => text.setColor(Colours.CYAN_STRING));
        return text;
    }

    private createNextButton() {
        this.nextButton = this.scene.add.rectangle(1500, 995, 125, 50, Colours.BLACK_HEX, 0);
        this.nextButton.setStrokeStyle(2, Colours.CYAN_HEX);
        this.nextButton.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.handleNextButtonClick())
            .on('pointerover', () => {
                this.nextButton.setStrokeStyle(2, Colours.MAGENTA_HEX);
                this.buttonText.setColor(Colours.MAGENTA_STRING);
            })
            .on('pointerout', () => {
                if (this.nextButton && this.buttonText) {
                    this.nextButton.setStrokeStyle(2, Colours.CYAN_HEX);
                    this.buttonText.setColor(Colours.CYAN_STRING);
                }
            });

        this.buttonText = TextFactory.createText(this.scene, 540, 453, 'next', {
            fontSize: '16px',
            color: Colours.CYAN_STRING
        });
        this.buttonText.setOrigin(0.5, 0.5);
        this.add(this.buttonText);
    }

    private createSkipButton() {
        this.skipButton = this.scene.add.rectangle(-700, -480, 500, 50, Colours.BLACK_HEX, 0);
        this.skipButton.setStrokeStyle(2, Colours.YELLOW_HEX);
        this.skipButton.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.handleSkipButtonClick())
            .on('pointerover', () => {
                this.skipButton.setStrokeStyle(2, Colours.MAGENTA_HEX);
                this.skipButtonText.setColor(Colours.MAGENTA_STRING);
            })
            .on('pointerout', () => {
                if (this.skipButton && this.skipButtonText) {
                    this.skipButton.setStrokeStyle(2, Colours.YELLOW_HEX);
                    this.skipButtonText.setColor(Colours.YELLOW_STRING);
                }
            });

        this.skipButtonText = TextFactory.createText(this.scene, 0, 0, 'skip dialogue (too much lore)', {
            fontSize: '16px',
            color: Colours.YELLOW_STRING
        });
        this.skipButtonText.setOrigin(0.5, 0.5);
        this.skipButtonText.setPosition(this.skipButton.x, this.skipButton.y);
        this.add(this.skipButton);
        this.add(this.skipButtonText);
    }
}
