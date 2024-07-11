
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Game from "../scenes/Game";
import { DialogueConversation, DialogueStep } from "./Dialogue";
/* END-USER-IMPORTS */

export default class DialogBox extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number, dialogueConversation?: DialogueConversation) {
		super(scene, x ?? 960, y ?? 542);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(-7, 340, 128, 128);
		rectangle_1.scaleX = 10.314571568183906;
		rectangle_1.scaleY = 2.6941724549327337;
		rectangle_1.isStroked = true;
		rectangle_1.strokeColor = 16776960;
		this.add(rectangle_1);

		/* START-USER-CTR-CODE */
		this.dialogueConversation = dialogueConversation as DialogueConversation;
        if (dialogueConversation) {
            this.generateDialogue(dialogueConversation);
        }
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private dialogueConversation: DialogueConversation;
	private dialogueText!: Phaser.GameObjects.Text;
	private nextButton!: Phaser.GameObjects.Rectangle;
	private buttonText!: Phaser.GameObjects.Text;
	private optionText1!: Phaser.GameObjects.Text;
	private optionText2!: Phaser.GameObjects.Text;
	private optionText3!: Phaser.GameObjects.Text;
	private optionInstructions!: Phaser.GameObjects.Text;
	private avatar!: Phaser.GameObjects.Image;

	generateDialogue(dialogueConversation: DialogueConversation) {
        var step = dialogueConversation.getCurrentStep();
        
		this.initializeTextAreas();

		this.renderText(step!);
	}

	handleNextButtonClick() {
        console.log("Next button clicked");
        // Logic to advance the dialogue
        var next = this.dialogueConversation.nextStep();
        var step = this.dialogueConversation.getCurrentStep();

		if (!next) {
			console.log("going to the next scene");
			(this.scene.scene.get('Game') as Game).finishDialogue()
		} else {
			console.log("rendering some more text");
			this.renderText(step!);
			console.log(step);
		}
    }

	hideAllTextAreas() {
		this.dialogueText.setVisible(false);
		this.optionText1.setVisible(false);
		this.optionText2.setVisible(false);
		this.optionText3.setVisible(false);
		this.optionInstructions.setVisible(false);
		this.nextButton.setVisible(false);
		this.buttonText.setVisible(false);
	}

	renderText(step: DialogueStep) {
		this.hideAllTextAreas();
		const text = step.getText();
		this.avatar.setTexture(step.getAvatar());

		if (typeof text === 'string') {
			this.dialogueText.setText(text);
			this.dialogueText.setVisible(true);
			this.nextButton.setVisible(true);
			this.buttonText.setVisible(true);
		} else if (Array.isArray(text)) {
			
			this.optionText1.setText(text[0]);
			this.optionText1.setVisible(true);
			this.optionInstructions.setVisible(true);
			

			if (text.length > 1) {
				this.optionText2.setText(text[1]);
				this.optionText2.setVisible(true);
			}

			if (text.length > 2) {
				this.optionText3.setText(text[2]);
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
	}

	//todo omg this is terrible
	initializeTextAreas() {
		console.log("initializeTextAreas");
		//avatar
		this.avatar = this.scene.add.image(1750, 850, 'you');

		//single text
		this.dialogueText = new Phaser.GameObjects.Text(this.scene, -630, 200, "", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '16px',
            color: '#00ffff',
            padding: { x: 5, y: 5 },
            align: 'left'
        });
		this.add(this.dialogueText);
		this.dialogueText.setWordWrapWidth(1200);

		//option text 1
		this.optionText1 = new Phaser.GameObjects.Text(this.scene, -630, 200, "", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '16px',
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
            fontSize: '16px',
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
            fontSize: '16px',
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

		//option instructions
		this.optionInstructions = new Phaser.GameObjects.Text(this.scene, 340, 453, "[Choose an option]", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '16px',
            color: '#00ffff',
            padding: { x: 5, y: 5 },
            align: 'left'
        });
		this.add(this.optionInstructions);

        // Create a rectangle for the button with a transparent fill and cyan border
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

        // Create the text for the button
        this.buttonText = new Phaser.GameObjects.Text(this.scene, 540, 453, 'Next', {
            fontFamily: '"Press Start 2P"', // needs the quotes because of the 2
            fontSize: '16px',
            color: '#00ffff'
        });
        this.buttonText.setOrigin(0.5, 0.5);
        this.add(this.buttonText);

		this.hideAllTextAreas();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
