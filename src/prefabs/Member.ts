
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Card from "./Card";
import Team from "./Team";
import Game from "../scenes/Game";
import { GameSteps } from "../scenes/GameSteps";
/* END-USER-IMPORTS */

export default class Member extends Phaser.GameObjects.Container {
    public sprite: Phaser.GameObjects.Sprite;
    private assignedCards: Card[];
    private cardIcons: Phaser.GameObjects.Image[];
    private visibleMove: boolean = true;
    private hp: number;
    private team: Team;
    private intendedTarget: Member | null = null;
    private number: number;
    private bracketDefaultLeft: Phaser.GameObjects.Image | null = null;
    private bracketDefaultRight: Phaser.GameObjects.Image | null = null;
    public assignedText: Phaser.GameObjects.Text | null = null;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, visibleMove: boolean, team: Team, number: number, flip: boolean = false, bracketOffset: number = 0) {
        super(scene, x, y);

        this.visibleMove = visibleMove;
        this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, texture);
        
        this.add(this.sprite);
        if (flip) {
            console.log("flipping");
            this.sprite.toggleFlipX();
        }

        console.log("sprite properties: " + this.sprite.flipX);

        this.assignedCards = [];
        this.cardIcons = [];
        this.hp = 3;
        this.team = team;
        this.number = number;
        this.setSize(this.sprite.width, this.sprite.height);

        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.sprite.width, this.sprite.height), Phaser.Geom.Rectangle.Contains);

        this.bracketDefaultLeft = new Phaser.GameObjects.Image(this.scene, -50, 150 - bracketOffset, 'bracket-default');
        this.bracketDefaultRight = new Phaser.GameObjects.Image(this.scene, 50, 150 - bracketOffset, 'bracket-default');
        this.bracketDefaultRight.setFlipX(true);
        this.add(this.bracketDefaultLeft);
        this.add(this.bracketDefaultRight);

        this.assignedText = new Phaser.GameObjects.Text(scene, 0, 150 - bracketOffset, "", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '14px',
            color: '#ffff00',
            padding: { x: 5, y: 5 },
            align: 'center'
        });
        this.assignedText.setOrigin(0.5, 0.5);
        this.add(this.assignedText);

        this.on('pointerover', () => { this.scene.input.setDefaultCursor('pointer'); });
        this.on('pointerout', () => { this.scene.input.setDefaultCursor('default'); });
    }

    setIntendedTarget(target: Member | null) {
        if (target) {
            console.log(`${this} targets ${target}`);
        }
        this.intendedTarget = target;
    }

    getIntendedTarget(): Member | null {
        return this.intendedTarget;
    }

    assignCard(card: Card, whiteIconTexture: string, isBoss: boolean = false) {
        console.log("assigning card!");
        if (this.assignedCards.length >= 1) {
            return;
        }
        this.assignedCards.push(card);
        card.showAssignedRing();
        this.assignedText?.setText(card.cardType);
        if (isBoss) {
            return;
        }
        if (card.cardType === "throw") {
            (this.scene.scene.get('Game') as Game).nextStep();
        } else {
            //if all members have a card, move to next step
            const allMembersHaveCards = this.team.members.every(member => member.getAssignedCards().length > 0);
            if (allMembersHaveCards) {
                (this.scene.scene.get('Game') as Game).setStep(GameSteps.START_TURN);
            } else {
                (this.scene.scene.get('Game') as Game).setStep(GameSteps.SELECT_CARD);
            }
        }
    }

    getAssignedCards(): Card[] {
        return this.assignedCards;
    }

    clearAssignedCards() {
        this.assignedCards = [];
        this.cardIcons.forEach(icon => icon.destroy());
        this.assignedText?.setText("");
    }

    getHP(): number {
        return this.hp;
    }

    hit(damage: number, attacker: Member) {
        const cardTypes = this.assignedCards.map(card => card.cardType);

        if (cardTypes.includes("evade")) {
            this.showFloatingAction("evaded");
        } else if (cardTypes.includes("block")) {
            this.showFloatingAction("blocked");
            attacker.hit(1, this);
        } else if (cardTypes.includes("catch")) {
            this.showFloatingAction("caught");
            attacker.hit(3, this);
        } else {
            this.hp -= damage;
            this.showFloatingAction(damage.toString());
            if (this.hp <= 0) {
                this.hp = 0;
                this.destroyMember();
            }
        }
    }

    showFloatingAction(action: string) {
        if (!this.scene) {
            return;
        }
        const actionText = this.scene.add.text(this.x, this.y - this.sprite.height / 2, action, {
            fontSize: '48px',
            color: '#ffffff',
            stroke: '#ffffff',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.scene.add.tween({
            targets: actionText,
            y: this.y - this.sprite.height / 2 - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                actionText.destroy();
            }
        });
    }

    destroyMember() {
        this.team.removeMember(this);
        this.destroy(); 
    }

    enableGlow() {
        this.sprite.setTint(0xffffff);
    }

    disableGlow() {
        this.sprite.clearTint();
    }

    toString(): string {
        return `Member ${this.number}`;
    }
}