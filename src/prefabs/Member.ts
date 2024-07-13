
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Card from "./Card";
import Team from "./Team";
import Game from "../scenes/Game";
import { GameSteps } from "../throwdown/GameSteps";
import { checkUrlParam } from "../utilities/GameUtils";
import Boss from "./Boss";
/* END-USER-IMPORTS */

export default class Member extends Phaser.GameObjects.Container {
    public sprite: Phaser.GameObjects.Sprite;
    private assignedCard: Card | null = null;
    private cardIcons: Phaser.GameObjects.Image[];
    private visibleMove: boolean = true;
    private hp: number;
    private team: Team;
    private intendedTarget: Member | null = null;
    private number: number;
    private bracketLeft: Phaser.GameObjects.Image | null = null;
    private bracketRight: Phaser.GameObjects.Image | null = null;
    public assignedText: Phaser.GameObjects.Text | null = null;
    private targetArc: Phaser.GameObjects.Graphics | null = null;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, visibleMove: boolean, team: Team, number: number, flip: boolean = false, bracketOffset: number = 0) {
        super(scene, x, y);

        this.visibleMove = visibleMove;
        this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, texture);
        
        this.add(this.sprite);
        if (flip) {
            this.sprite.toggleFlipX();
        }

        this.cardIcons = [];
        this.hp = 3;
        if (checkUrlParam("lowHP","true")){
            this.hp = 1;
        }
        this.team = team;
        this.number = number;
        this.setSize(this.sprite.width, this.sprite.height);

        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.sprite.width, this.sprite.height), Phaser.Geom.Rectangle.Contains);

        this.bracketLeft = new Phaser.GameObjects.Image(this.scene, -50, 150 - bracketOffset, 'bracket-default');
        this.bracketRight = new Phaser.GameObjects.Image(this.scene, 50, 150 - bracketOffset, 'bracket-default');
        this.bracketRight.setFlipX(true);
        this.add(this.bracketLeft);
        this.add(this.bracketRight);

        this.assignedText = new Phaser.GameObjects.Text(scene, 0, 150 - bracketOffset, "", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '14px',
            color: '#ffff00',
            padding: { x: 5, y: 5 },
            align: 'center'
        });
        this.assignedText.setOrigin(0.5, 0.5);
        this.assignedText.setWordWrapWidth(100);
        this.add(this.assignedText);

        this.on('pointerover', () => { 
            this.scene.input.setDefaultCursor('pointer'); 
            this.bracketLeft?.setTexture('bracket-hover');
            this.bracketRight?.setTexture('bracket-hover');
        });
        this.on('pointerout', () => { 
            this.scene.input.setDefaultCursor('default'); 
            if (this.assignedCard != null) {
                this.bracketLeft?.setTexture('bracket-assigned');
                this.bracketRight?.setTexture('bracket-assigned');
            } else {
                this.bracketLeft?.setTexture('bracket-default');
                this.bracketRight?.setTexture('bracket-default');
            }
        });
    }

    getNumber(): number {
        return this.number;
    }  

    setIntendedTarget(target: Member | null, boss?: Boss) {
        if (target) {
            console.log(`${this} targets ${target}`);
        }
        this.intendedTarget = target;
        if (!boss || boss.getCoach().getDifficulty() === 1) {
            this.drawTargetArc(target, boss);
        }
    }

    getIntendedTarget(): Member | null {
        return this.intendedTarget;
    }

    drawTargetArc(target: Member | null, boss?: Boss) {
        if (!target) {
            this.clearTargetArc();
            return;
        }

        if (this.targetArc) {
            this.targetArc.clear();
        } else {
            this.targetArc = this.scene.add.graphics();
        }

        const startX = this.x;
        const startY = this.y;
        const endX = target.x;
        const endY = target.y;

        let lineColour = 0xffff00;
        let offsetX = 0;
        let offsetY = 0;

        if (boss != null) {
            lineColour = 0x00ffff;
            offsetX = 10; 
            offsetY = 10;
        }
    
        const controlX = (startX + endX) / 2 + offsetX;
        const controlY = Math.min(startY, endY) - 50 + offsetY;
    
        const curve = new Phaser.Curves.QuadraticBezier(
            new Phaser.Math.Vector2(startX + offsetX, startY + offsetY),
            new Phaser.Math.Vector2(controlX + offsetX, controlY + offsetY),
            new Phaser.Math.Vector2(endX, endY)
        );
    
        this.targetArc.lineStyle(3, lineColour, 1);
        curve.draw(this.targetArc);
    }

    clearTargetArc() {
        if (this.targetArc) {
            this.targetArc.clear();
        }
    }

    assignCard(card: Card, boss?: Boss) {
        console.log("assigning card!");
        if (this.assignedCard != null) {
            return;
        }
        this.assignedCard = card;
        card.showAssignedRing();
        this.bracketLeft?.setTexture('bracket-assigned');
        this.bracketRight?.setTexture('bracket-assigned');
        
        if (boss != null) {
            if (boss.getCoach().getDifficulty() === 1) {
                this.assignedText?.setText(card.cardType.getName());
            } else {
                this.assignedText?.setText("???");
            }
            return;
        }
        this.assignedText?.setText(card.cardType.getName());
        if (card.cardType.needsTarget()) {
            (this.scene.scene.get('Game') as Game).throwdown.nextStep();
        } else {
            //if all members have a card, move to next step
            const allMembersHaveCards = this.team.members.every(member => member.getAssignedCard() != null);
            if (allMembersHaveCards) {
                (this.scene.scene.get('Game') as Game).throwdown.setStep(GameSteps.START_TURN);
            } else {
                (this.scene.scene.get('Game') as Game).throwdown.setStep(GameSteps.SELECT_CARD);
            }
        }
    }

    getAssignedCard(): Card | null {
        return this.assignedCard;
    }

    clearAssignedCards() {
        this.assignedCard = null;
        this.cardIcons.forEach(icon => icon.destroy());
        this.assignedText?.setText("");
        this.bracketLeft?.setTexture('bracket-default');
        this.bracketRight?.setTexture('bracket-default');
    }

    getHP(): number {
        return this.hp;
    }

    reduceHP(amount: number, memberWhoTargeted: Member) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = 0;
            this.destroyMember(memberWhoTargeted);
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

    destroyMember(memberWhoTargeted: Member) {
        this.team.removeMember(this);
        this.clearTargetArc();
        memberWhoTargeted.clearTargetArc();
        this.destroy(); 
    }

    enableGlow() {
        this.sprite.setTint(0x00ff00);
    }

    disableGlow() {
        this.sprite.clearTint();
    }

    toString(): string {
        return `Member ${this.number}`;
    }
}