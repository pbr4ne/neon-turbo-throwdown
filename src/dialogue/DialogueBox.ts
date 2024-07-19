import Phaser from "phaser";
import Game from "../scenes/Game";
import { DialogueConversation, DialogueStep } from "./Dialogue";
import { Coach } from "../throwdown/Coach";
import { DialogueStorage } from "./DialogueStorage";
import { log } from "../utilities/GameUtils";
import { GameSounds } from "../utilities/GameSounds";
import { Library } from "../throwdown/Library";

export default class DialogueBox extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x: number, y: number, coach: Coach, dialogueType: string, initialDialogue: boolean, spiritCoachDialogue: boolean) {
		super(scene, x ?? 960, y ?? 542);
	
		this.dialogueType = dialogueType;
		log(`Dialogue type: ${dialogueType}  - spiritCoachDialogue: ${spiritCoachDialogue}`);

		//i need this for some reason or the sound crashes. is it cuz it was already doing that sound?
		if (!spiritCoachDialogue) {
			GameSounds.switchSong(this.scene, "neon-turbo-throwdown-chill");
		}
	
		const rectangle_1 = scene.add.rectangle(-12, 340, 132, 128);
		rectangle_1.scaleX = 10.314571568183906;
		rectangle_1.scaleY = 2.6941724549327337;
		rectangle_1.isStroked = true;
		if (spiritCoachDialogue) {
			rectangle_1.strokeColor = 0x00ffff;
		} else {
			rectangle_1.strokeColor = 0xff00ff
		}
		this.add(rectangle_1);
	
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
		
			this.idleModeText = this.scene.add.text(135, 920, "(for next combat)", {
				fontFamily: '"Press Start 2P"',
				fontSize: '14px',
				color: '#ffff00',
				align: 'center'
			}).setOrigin(0.5, 0.5);
		}
	
		this.dialogueConversation = DialogueStorage.missingDialogueConversation;
	
		if (dialogueType === "intro") {
			const convo = coach.getDialogue()?.getAndIncrementIntroDialogue();
			if (convo != null) {
				this.dialogueConversation = convo;
			}
		} else if (dialogueType === "win") {
			const convo = coach.getDialogue()?.getAndIncrementWinDialogue();
			if (convo != null) {
				this.dialogueConversation = convo;
			}
		} else if (dialogueType === "lose") {
			const convo = coach.getDialogue()?.getAndIncrementLoseDialogue();
			if (convo != null) {
				this.dialogueConversation = convo;
			}
		} else if (dialogueType === "initialLose") {
			log('initialLose dialogue!');
			this.dialogueConversation = DialogueStorage.firstSpiritDialogue;
			this.scene.add.image(1625, 193, "coach-corner-spirit");

			this.scene.add.image(953, 443, "court-cyan");

			this.scene.add.existing(new Phaser.GameObjects.Image(scene, 1855, 78, "spirit")
			.setOrigin(1, 0)
			.setScale(1.2));

			let coachName = new Phaser.GameObjects.Text(this.scene, 1720, 340, "Turbovoid", {
				fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
				fontSize: '20px',
				color: '#000000',
				stroke: '#000000',
				strokeThickness: 1,
				padding: { x: 5, y: 5 },
				align: 'left'
			});
			this.scene.add.existing(coachName);
			coachName.setOrigin(0.5, 0.5);
		} else if (dialogueType === "final") {
			this.dialogueConversation =  DialogueStorage.finalDialogue;
		}
	
		if (this.dialogueConversation) {
			this.generateDialogue();
		}
	}
	

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
        // Logic to advance the dialogue
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
		this.dialogueText.setVisible(false);
		this.optionText1.setVisible(false);
		this.optionText2.setVisible(false);
		this.optionText3.setVisible(false);
		this.optionInstructions.setVisible(false);
		this.nextButton.setVisible(false);
		this.buttonText.setVisible(false);
		this.skipButton.setVisible(false);
		this.skipButtonText.setVisible(false);
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

			if(text === "It's never over.") {
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
		this.dialogueText.destroy();
		this.optionText1.destroy();
		this.optionText2.destroy();
		this.optionText3.destroy();
		this.optionInstructions.destroy();
		this.nextButton.destroy();
		this.buttonText.destroy();
		this.avatar.destroy();
		this.avatarName.destroy();
		this.skipButton.destroy();
		this.skipButtonText.destroy();
		this.idleModeImage?.destroy();
		this.idleModeText?.destroy();
	}

	initializeTextAreas() {
		//avatar
		this.avatar = this.scene.add.image(1760, 850, 'you');

		//avatar name
		this.avatarName = new Phaser.GameObjects.Text(this.scene, 800, 430, "", {
			fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
			fontSize: '16px',
			color: '#ffffff',
			padding: { x: 5, y: 5 },
			align: 'center',
			wordWrap: { width: 250, useAdvancedWrap: true }
		});
		this.add(this.avatarName)
		this.avatarName.setOrigin(0.5, 0.5);

		//single text
		this.dialogueText = new Phaser.GameObjects.Text(this.scene, -630, 200, "", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '18px',
            color: '#00ffff',
            padding: { x: 5, y: 5 },
            align: 'left',
			lineSpacing: 15
        });
		this.add(this.dialogueText);
		this.dialogueText.setWordWrapWidth(1100);

		//option text 1
		this.optionText1 = new Phaser.GameObjects.Text(this.scene, -630, 200, "", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '18px',
            color: '#00ffff',
            padding: { x: 5, y: 5 },
            align: 'left'
        });
		this.add(this.optionText1);
		this.optionText1.setWordWrapWidth(1200);
		this.optionText1.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => this.handleNextButtonClick())
		.on('pointerover', () => this.optionText1.setColor('#ff00ff'))
		.on('pointerout', () => this.optionText1.setColor('#00ffff'));

		//option text 2
		this.optionText2 = new Phaser.GameObjects.Text(this.scene, -630, 250, "", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '18px',
            color: '#00ffff',
            padding: { x: 5, y: 5 },
            align: 'left'
        });
		this.add(this.optionText2);
		this.optionText2.setWordWrapWidth(1200);
		this.optionText2.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => this.handleNextButtonClick())
		.on('pointerover', () => this.optionText2.setColor('#ff00ff'))
		.on('pointerout', () => this.optionText2.setColor('#00ffff'));

		//option text 3
		this.optionText3 = new Phaser.GameObjects.Text(this.scene, -630, 300, "", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '18px',
            color: '#00ffff',
            padding: { x: 5, y: 5 },
            align: 'left'
        });
		this.add(this.optionText3);
		this.optionText3.setWordWrapWidth(1200);
		this.optionText3.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => this.handleNextButtonClick())
		.on('pointerover', () => this.optionText3.setColor('#ff00ff'))
		.on('pointerout', () => this.optionText3.setColor('#00ffff'));

		this.optionInstructions = new Phaser.GameObjects.Text(this.scene, 300, 453, "[click on an option]", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '16px',
            color: '#00ffff',
            padding: { x: 5, y: 5 },
            align: 'left'
        });
		this.add(this.optionInstructions);

        this.nextButton = this.scene.add.rectangle(1500, 995, 125, 50, 0x000000, 0);
        this.nextButton.setStrokeStyle(2, 0x00ffff);
		this.nextButton.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => this.handleNextButtonClick())
			.on('pointerover', () => {
                this.nextButton.setStrokeStyle(2, 0xff00ff);
                this.buttonText.setColor('#ff00ff');
            })
            .on('pointerout', () => {
				if (this.nextButton && this.buttonText) {
                	this.nextButton.setStrokeStyle(2, 0x00ffff);
                	this.buttonText.setColor('#00ffff');
				}
            });

        this.buttonText = new Phaser.GameObjects.Text(this.scene, 540, 453, 'next', {
            fontFamily: '"Press Start 2P"', // needs the quotes because of the 2
            fontSize: '16px',
            color: '#00ffff'
        });
        this.buttonText.setOrigin(0.5, 0.5);
        this.add(this.buttonText);

		this.skipButton = this.scene.add.rectangle(-700, -480, 500, 50, 0x000000, 0);
		this.skipButton.setStrokeStyle(2, 0xffff00);
		this.skipButton.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => this.handleSkipButtonClick())
			.on('pointerover', () => {
				this.skipButton.setStrokeStyle(2, 0xff00ff);
				this.skipButtonText.setColor('#ff00ff');
			})
			.on('pointerout', () => {
				if (this.skipButton && this.skipButtonText) {
					this.skipButton.setStrokeStyle(2, 0xffff00);
					this.skipButtonText.setColor('#ffff00');
				}
			});

		this.skipButtonText = new Phaser.GameObjects.Text(this.scene, 0, 0, 'skip dialogue (too much lore)', {
			fontFamily: '"Press Start 2P"', // needs the quotes because of the 2
			fontSize: '16px',
			color: '#ffff00'
		});
		this.skipButtonText.setOrigin(0.5, 0.5);
		this.skipButtonText.setPosition(this.skipButton.x, this.skipButton.y); 
		this.add(this.skipButton);
		this.add(this.skipButtonText);


		this.hideAllTextAreas();
	}
}
