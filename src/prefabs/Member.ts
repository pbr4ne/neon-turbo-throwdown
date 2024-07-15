
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Card from "./Card";
import Team from "./Team";
import Game from "../scenes/Game";
import { GameSteps } from "../throwdown/GameSteps";
import { checkUrlParam, log } from "../utilities/GameUtils";
import Boss from "./Boss";
import { Coach } from "../throwdown/Coach";
import { TrophyType } from "../trophies/TrophyType";
import { CoachList } from "../throwdown/CoachList";
import { Library } from "../throwdown/Library";
import { IncreaseHP } from "../trophies/member/IncreaseHP";
import { SeeCards1 } from "../trophies/member/SeeCards1";
import { SeeCards2 } from "../trophies/member/SeeCards2";
import { SeeCards3 } from "../trophies/member/SeeCards3";
import { SeeTargets1 } from "../trophies/member/SeeTargets1";
import { SeeTargets2 } from "../trophies/member/SeeTargets2";
import { SeeTargets3 } from "../trophies/member/SeeTargets3";
/* END-USER-IMPORTS */

export default class Member extends Phaser.GameObjects.Container {
    public sprite: Phaser.GameObjects.Sprite;
    private assignedCard: Card | null = null;
    private cardIcons: Phaser.GameObjects.Image[];
    private visibleMove: boolean = true;
    private maxHP: number;
    private hp: number;
    private team: Team;
    private coach: Coach;
    private intendedTarget: Member | null = null;
    private number: number;
    private bracketLeft: Phaser.GameObjects.Image | null = null;
    private bracketRight: Phaser.GameObjects.Image | null = null;
    public assignedBlock: Phaser.GameObjects.Image | null = null;
    public assignedBlockText: Phaser.GameObjects.Text | null = null;
    public assignedText: Phaser.GameObjects.Text | null = null;
    private healthBar: Phaser.GameObjects.Graphics;
    private targetArc: Phaser.GameObjects.Graphics | null = null;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, visibleMove: boolean, team: Team, coach: Coach, number: number, flip: boolean = false, bracketOffset: number = 0) {
        super(scene, x, y);

        this.team = team;
        this.coach = coach;
        this.visibleMove = visibleMove;
        this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, texture);
        
        this.add(this.sprite);
        if (flip) {
            this.sprite.toggleFlipX();
        }

        this.cardIcons = [];
        this.hp = 3;
        if (checkUrlParam("lowHP", "true")) {
            this.hp = 1;
        } else if (this.getTrophyTypes().some(trophy => trophy instanceof IncreaseHP)) {
            this.hp++;
        }
        this.maxHP = this.hp;

        log(`member has ${this.hp} hp`);

        this.number = number;
        this.setSize(this.sprite.width, this.sprite.height);

        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.sprite.width, this.sprite.height), Phaser.Geom.Rectangle.Contains);

        this.bracketLeft = new Phaser.GameObjects.Image(this.scene, -50, 150 - bracketOffset, 'bracket-default');
        this.bracketRight = new Phaser.GameObjects.Image(this.scene, 50, 150 - bracketOffset, 'bracket-default');
        this.bracketRight.setFlipX(true);
        this.add(this.bracketLeft);
        this.add(this.bracketRight);
        this.bracketRight.setVisible(false);
        this.bracketLeft.setVisible(false);

        let assignedBlockX = -75;
        if (flip) {
            assignedBlockX = 75;
        }
        this.assignedBlock = new Phaser.GameObjects.Image(scene, assignedBlockX, 150 - bracketOffset, 'bracket-assigned-text-field');
        this.add(this.assignedBlock);
        this.assignedBlock.setVisible(false);

        this.assignedBlockText = new Phaser.GameObjects.Text(scene, assignedBlockX, 150 - bracketOffset, "", {
            fontFamily: '"Press Start 2P"', //needs the quotes because of the 2
            fontSize: '14px',
            color: '#000000',
            padding: { x: 5, y: 5 },
            align: 'center'
        });
        this.assignedBlockText.setOrigin(0.5, 0.5);
        this.add(this.assignedBlockText);

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

        this.healthBar = new Phaser.GameObjects.Graphics(scene);
        this.add(this.healthBar);
        this.healthBar.setVisible(false);
        this.updateHealthBar();
    
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

    showAssignedStuff() {
        this.bracketLeft?.setVisible(true);
        this.bracketRight?.setVisible(true);
        this.healthBar.setVisible(true);
    }

    hideAssignedStuff() {
        this.bracketLeft?.setVisible(false);
        this.bracketRight?.setVisible(false);
        this.healthBar.setVisible(false);
    }

    updateHealthBar() {
        const healthBarWidth = 50;
        const healthBarHeight = 5;
        const healthBarY = this.sprite.height / 2;
        
        this.healthBar.clear();

        const currentHealthWidth = (this.hp / this.maxHP) * healthBarWidth;

        this.healthBar.fillStyle(0xff005a, 1);
        this.healthBar.fillRect(-healthBarWidth / 2, healthBarY, currentHealthWidth, healthBarHeight);

        const capWidth = 2;
        const capHeight = healthBarHeight + 2; 
        this.healthBar.fillStyle(0xffffff, 1);
        this.healthBar.fillRect(-healthBarWidth / 2 - capWidth, healthBarY - 1, capWidth, capHeight);
        this.healthBar.fillRect(healthBarWidth / 2, healthBarY - 1, capWidth, capHeight);
    }

    getNumber(): number {
        return this.number;
    }

    setIntendedTarget(target: Member | null, boss?: Boss) {
        if (target) {
            log(`${this} targets ${target}`);
        }
        this.intendedTarget = target;
        if (!boss) {
            this.drawTargetArc(target, boss);
        } else {
            if (boss.getCoach().getDifficulty() === 1) {
                this.drawTargetArc(target, boss);
            } else if (boss.getCoach().getDifficulty() === 2 && Library.getTrophyTypes().some(trophy => trophy instanceof SeeTargets1)) {
                this.drawTargetArc(target, boss);
            } else if (boss.getCoach().getDifficulty() === 3 && Library.getTrophyTypes().some(trophy => trophy instanceof SeeTargets2)) {
                this.drawTargetArc(target, boss);
            } else if (boss.getCoach().getDifficulty() === 4 && Library.getTrophyTypes().some(trophy => trophy instanceof SeeTargets3)) {
                this.drawTargetArc(target, boss);
            }
            return;
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
        let controlYOffset = -50;
    
        if (boss != null) {
            lineColour = 0x00ffff;
            offsetX = 10; 
            offsetY = 10;
            controlYOffset = -100;
        }
    
        const controlX = (startX + endX) / 2 + offsetX;
        const controlY = Math.min(startY, endY) + controlYOffset + offsetY;
    
        const curve = new Phaser.Curves.QuadraticBezier(
            new Phaser.Math.Vector2(startX + offsetX, startY + offsetY),
            new Phaser.Math.Vector2(controlX + offsetX, controlY),
            new Phaser.Math.Vector2(endX, endY)
        );
    
        this.targetArc.lineStyle(3, lineColour, 1);
        curve.draw(this.targetArc);
    
        const circleRadius = 5;
    
        this.targetArc.fillStyle(lineColour, 1);
        this.targetArc.fillCircle(startX + offsetX, startY + offsetY, circleRadius);
        this.targetArc.fillCircle(endX, endY, circleRadius);
    }

    clearTargetArc() {
        if (this.targetArc) {
            this.targetArc.clear();
        }
    }

    assignCard(card: Card, boss?: Boss) {
        if (this.assignedCard != null) {
            return;
        }
        this.assignedCard = card;
        
        if (boss != null) {
            let visibleText = "???";
            if (boss.getCoach().getDifficulty() === 1) {
                visibleText = card.cardType.getName();
            } else if (boss.getCoach().getDifficulty() === 2 && Library.getTrophyTypes().some(trophy => trophy instanceof SeeCards1)) {
                visibleText = card.cardType.getName();
            } else if (boss.getCoach().getDifficulty() === 3 && Library.getTrophyTypes().some(trophy => trophy instanceof SeeCards2)) {
                visibleText = card.cardType.getName();
            } else if (boss.getCoach().getDifficulty() === 4 && Library.getTrophyTypes().some(trophy => trophy instanceof SeeCards3)) {
                visibleText = card.cardType.getName();
            }
            this.assignedText?.setText(visibleText);
            return;
        }

        card.showAssignedRing(this);
        this.bracketLeft?.setTexture('bracket-assigned');
        this.bracketRight?.setTexture('bracket-assigned');
        this.assignedText?.setText(card.cardType.getName());
        this.assignedBlock?.setVisible(true);
        this.assignedBlockText?.setText(card.getOrder().toString());

        if (card.cardType.needsTarget()) {
            (this.scene.scene.get('Game') as Game).throwdown.nextStep();
        } else {
            //if all members have a card, move to next step
            const allMembersHaveCards = this.team.getAliveMembers().every(member => member.getAssignedCard() != null);
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
        this.assignedBlock?.setVisible(false);
        this.assignedBlockText?.setText("");
    }

    getHP(): number {
        return this.hp;
    }

    reduceHP(amount: number, memberWhoTargeted: Member) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = 0;
            this.sprite.setAlpha(0.25);
            this.bracketLeft?.setAlpha(0.25);
            this.bracketRight?.setAlpha(0.25);
            this.assignedBlock?.setAlpha(0.25);
            this.assignedBlockText?.setAlpha(0.25);
            this.off("pointerdown");
        }
        this.updateHealthBar();
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

    showActionBam(text: string) {
        if (!this.scene) {
            return;
        }
    
        const scene = this.scene;
    
        const centerX = scene.cameras.main.width / 2;
        const centerY = scene.cameras.main.height / 2;
    
        const floatingText = scene.add.text(centerX, centerY, text, {
            fontFamily: '"Press Start 2P"',
            fontSize: '10px',
            color: '#ff00ff',
            stroke: '#00ffff',
            strokeThickness: 1,
            align: 'center'
        }).setOrigin(0.5);
    
        // Animate the text to grow in size
        scene.add.tween({
            targets: floatingText,
            scale: { from: 0.5, to: 8 },
            duration: 500,
            ease: 'Power1',
            onComplete: () => {
                // Fade out after the scaling is done
                scene.add.tween({
                    targets: floatingText,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    ease: 'Power1',
                    onComplete: () => {
                        floatingText.destroy();
                    }
                });
            }
        });
    }

    destroyMember(memberWhoTargeted: Member) {
        this.team.removeMember(this);
        this.clearTargetArc();
        memberWhoTargeted.clearTargetArc();
        this.destroy(); 
    }

    hide() {
        this.sprite.setVisible(false);
        this.bracketLeft?.setVisible(false);
        this.bracketRight?.setVisible(false);
        this.assignedBlock?.setVisible(false);
        this.assignedBlockText?.setVisible(false);
        this.assignedText?.setVisible(false);
        this.healthBar.setVisible(false);
    }

    getTrophyTypes(): TrophyType[] {
        if (this.coach === CoachList.you) {
            return Library.getTrophyTypes();
        } else {
            return this.coach.getTrophyTypes();
        }
    }

    toString(): string {
        return `Member ${this.number}`;
    }
}