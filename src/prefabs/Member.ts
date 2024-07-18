import Phaser from "phaser";
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

import { SeeCards1 } from "../trophies/insight/SeeCards1";
import { SeeCards2 } from "../trophies/insight/SeeCards2";
import { SeeCards3 } from "../trophies/insight/SeeCards3";
import { SeeCards4 } from "../trophies/insight/SeeCards4";
import { SeeTargets1 } from "../trophies/insight/SeeTargets1";
import { SeeTargets2 } from "../trophies/insight/SeeTargets2";
import { SeeTargets3 } from "../trophies/insight/SeeTargets3";
import { SeeTargets4 } from "../trophies/insight/SeeTargets4";
import Player from "./Player";
import { IncreaseHP1 } from "../trophies/member/IncreaseHP1";
import { IncreaseHP2 } from "../trophies/member/IncreaseHP2";
import { HealthRegen1 } from "../trophies/member/HealthRegen1";
import { HealthRegen2 } from "../trophies/member/HealthRegen2";
import { HealthRegen3 } from "../trophies/member/HealthRegen3";
import { Resurrect1 } from "../trophies/member/Resurrect1";
import { SeeHealth1 } from "../trophies/insight/SeeHealth1";
import { SeeHealth2 } from "../trophies/insight/SeeHealth2";
import { SeeHealth3 } from "../trophies/insight/SeeHealth3";
import { SeeHealth4 } from "../trophies/insight/SeeHealth4";

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
    private questionMark: Phaser.GameObjects.Text;
    private targetArc: Phaser.GameObjects.Graphics | null = null;
    private tooltipText: Phaser.GameObjects.Text;
    private tooltipImage: Phaser.GameObjects.Image;

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
        } else {
            if (this.hasTrophy(IncreaseHP2)){
                this.hp += 2;
            } else if (this.hasTrophy(IncreaseHP1)) {
                this.hp += 1;
            }
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
            align: 'center',
            wordWrap: { width: 100, useAdvancedWrap: true }
        });
        this.assignedText.setOrigin(0.5, 0.5);
        //this.assignedText.setWordWrapWidth(100);
        this.add(this.assignedText);

        this.healthBar = new Phaser.GameObjects.Graphics(scene);
        this.add(this.healthBar);
        this.healthBar.setVisible(false);
        this.questionMark = this.scene.add.text(
            0, 
            0, 
            '?', {
                fontFamily: '"Press Start 2P"',
                fontSize: '12px',
                color: '#ff005a',
                align: 'center'
            }
        ).setOrigin(0.5);
        this.add(this.questionMark);
        this.questionMark.setVisible(false);
        this.updateHealthBar();

        this.tooltipImage = new Phaser.GameObjects.Image(scene, 0, 225, 'tooltip');
        this.tooltipImage.setFlipY(true);

        let fontSize = 16;

        this.tooltipText = new Phaser.GameObjects.Text(scene, -170, 160, "test", { 
            fontFamily: '"Press Start 2P"',
            fontSize: '16px',
            color: '#00ffff',
            lineSpacing: 15,
            padding: { x: 5, y: 5 },
            align: 'left',
            wordWrap: { width: 350, useAdvancedWrap: true }
        });
        this.tooltipText.setOrigin(0, 0);
        this.tooltipText.setVisible(false);
        this.tooltipImage.setVisible(false);

        while (this.tooltipText.height + 90 > this.tooltipImage.height) {
            fontSize--;
            this.tooltipText.setStyle({ fontSize: `${fontSize}px` });
        }

        this.add([this.tooltipImage, this.tooltipText]);
    
        this.on('pointerover', () => { 
            this.scene.input.setDefaultCursor('pointer'); 
            this.bracketLeft?.setTexture('bracket-hover');
            this.bracketRight?.setTexture('bracket-hover');
            if (this.getAssignedCard() && team instanceof Boss) {
                this.tooltipText.setVisible(true);
                this.tooltipImage.setVisible(true);
                this.updateTooltipText();
                this.scene.children.remove(this);
                this.scene.children.add(this);
            }
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
            this.tooltipText.setVisible(false);
            this.tooltipImage.setVisible(false);
        });
    }

    hasTrophy(trophyClass: new () => TrophyType) {
        if (this.team instanceof Player) {
            return Library.hasTrophy(trophyClass);
        } else if (this.team instanceof Boss) {
            return this.team.getCoach().hasTrophy(trophyClass);
        }
    }

    private updateTooltipText(): void {
        let description = "You need to upgrade your card insight before you can see this enemy's card!";
        if (this.canSeeCard()) {
            description = this.getAssignedCard()?.getCardType().getDescription() || "unknown";
        }

        this.tooltipText.setText(description);
        
        let fontSize = 16;
    
        while (this.tooltipText.height + 90 > this.tooltipImage.height) {
            fontSize--;
            this.tooltipText.setStyle({ fontSize: `${fontSize}px` });
        }
    }

    showAssignedStuff() {
        this.bracketLeft?.setVisible(true);
        this.bracketRight?.setVisible(true);
        this.healthBar.setVisible(true);
        if (!this.canSeeHealth()) {
            this.questionMark.setVisible(true);
        }
    }

    hideAssignedStuff() {
        this.bracketLeft?.setVisible(false);
        this.bracketRight?.setVisible(false);
        this.healthBar.setVisible(false);
        this.questionMark.setVisible(false);
    }

    canSeeHealth(): boolean {
        let canSee: boolean = false;
        if (this.coach != null) {
            if (this.coach.getDifficulty() === 0) {
                canSee = true;
            } else if (this.coach.getDifficulty() === 1 && Library.hasTrophy(SeeHealth1)) {
                canSee = true;
            } else if (this.coach.getDifficulty() === 2 && Library.hasTrophy(SeeHealth2)) {
                canSee = true;
            } else if (this.coach.getDifficulty() === 3 && Library.hasTrophy(SeeHealth3)) {
                canSee = true;
            } else if (this.coach.getDifficulty() === 4 && Library.hasTrophy(SeeHealth4)) {
                canSee = true;
            }
        }

        return canSee;
    }

    getHealthPercentage(): number {
        return this.hp / this.maxHP;
    }

    updateHealthBar() {
        let renderHealthBar = false;
        let renderQuestionMark = false;
        if (this.canSeeHealth()) {
            renderHealthBar = true;
        } else {
            renderQuestionMark = true;
        }
    
        const baseHealthBarWidth = 50; 
        const healthBarWidth = baseHealthBarWidth + (this.maxHP - 3) * 40; 
        const healthBarHeight = 5;
        const healthBarY = this.sprite.height / 2;
        
        this.healthBar.clear();
    
        if (renderHealthBar) {
            const currentHP = this.hp < 0 ? 0 : this.hp;
            const currentHealthWidth = (currentHP / this.maxHP) * healthBarWidth;
    
            this.healthBar.fillStyle(0xff005a, 1);
            this.healthBar.fillRect(-healthBarWidth / 2, healthBarY, currentHealthWidth, healthBarHeight);
        } else {
            this.questionMark.setPosition(0, healthBarY + 2.5);
        }
    
        const capWidth = 2;
        const capHeight = healthBarHeight + 2; 
        this.healthBar.fillStyle(0xffffff, 1);
        this.healthBar.fillRect(-healthBarWidth / 2 - capWidth, healthBarY - 1, capWidth, capHeight);
        this.healthBar.fillRect(healthBarWidth / 2, healthBarY - 1, capWidth, capHeight);
    }
    
    getNumber(): number {
        return this.number;
    }

    setIntendedTarget(target: Member | null, team?: Team | null) {
        if (target) {
            log(`${this} targets ${target}`);
        }
        this.intendedTarget = target;
        if (!team || this.team instanceof Player) {
            this.drawTargetArc(target, false, team);
        } else {
            const boss = team as Boss;
            if (boss.getCoach().getDifficulty() === 0) {
                this.drawTargetArc(target, false, boss);
            } else if (boss.getCoach().getDifficulty() === 1 && Library.hasTrophy(SeeTargets1)) {
                this.drawTargetArc(target, false, boss);
            } else if (boss.getCoach().getDifficulty() === 2 && Library.hasTrophy(SeeTargets2)) {
                this.drawTargetArc(target, false, boss);
            } else if (boss.getCoach().getDifficulty() === 3 && Library.hasTrophy(SeeTargets3)) {
                this.drawTargetArc(target, false, boss);
            } else if (boss.getCoach().getDifficulty() === 4 && Library.hasTrophy(SeeTargets4)) {
                this.drawTargetArc(target, false, boss);
            }
            return;
        }
    }

    getIntendedTarget(): Member | null {
        return this.intendedTarget;
    }

    drawTargetArc(target: Member | null, highlight: boolean, team?: Team | null) {
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
    
        if (team && team instanceof Boss) {
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
    
        const dashLength = 10;
        const gapLength = 10;
        const totalLength = dashLength + gapLength;
        const curveLength = curve.getLength();
        const segments = Math.floor(curveLength / totalLength);
    
        let lineStyle = 3;
        if (highlight) {
            lineStyle = 7;
        }
        this.targetArc.lineStyle(lineStyle, lineColour, 1);
    
        for (let i = 0; i < segments; i++) {
            const startT = (i * totalLength) / curveLength;
            const endT = (i * totalLength + dashLength) / curveLength;
    
            const startPoint = curve.getPoint(startT);
            const endPoint = curve.getPoint(Math.min(endT, 1));
    
            this.targetArc.beginPath();
            this.targetArc.moveTo(startPoint.x, startPoint.y);
            this.targetArc.lineTo(endPoint.x, endPoint.y);
            this.targetArc.strokePath();
        }
    
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

    canSeeCard(): boolean {
        let canSee: boolean = false;
        if (this.coach) {
            if (this.coach.getDifficulty() === 0) {
                canSee = true;
            } else if (this.coach.getDifficulty() === 1 && Library.hasTrophy(SeeCards1)) {
                canSee = true;
            } else if (this.coach.getDifficulty() === 2 && Library.hasTrophy(SeeCards2)) {
                canSee = true;
            } else if (this.coach.getDifficulty() === 3 && Library.hasTrophy(SeeCards3)) {
                canSee = true;
            } else if (this.coach.getDifficulty() === 4 && Library.hasTrophy(SeeCards4)) {
                canSee = true;
            }
        }

        return canSee;
    }

    assignCard(card: Card, boss?: Boss) {
        if (this.assignedCard != null) {
            return;
        }
        this.assignedCard = card;
        
        if(boss != null) {
            if (this.canSeeCard()) {
                let cardName = card.cardType.getName();
                if (cardName == "ricochet") {
                    cardName = "ricoch et";
                }
                this.assignedText?.setText("meta gaming");
            } else {
                this.assignedText?.setText("???");
            }
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

    getMaxHP(): number {
        return this.maxHP;
    }

    setHP(amount: number) {
        if (amount > this.maxHP) {
            amount = this.maxHP;
        }
        if (amount < this.hp) {
            this.reduceHP(this.hp - amount);
        } else if (amount > this.hp) {
            this.increaseHP(amount - this.hp);
        }
    }

    reduceHP(amount: number) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.sprite.setAlpha(0.25);
            this.bracketLeft?.setAlpha(0.25);
            this.bracketRight?.setAlpha(0.25);
            this.assignedBlock?.setAlpha(0.25);
            this.assignedBlockText?.setAlpha(0.25);
            this.healthBar?.setAlpha(0.25);
            this.questionMark?.setAlpha(0.25);
            this.off("pointerdown");
        }
        this.updateHealthBar();
        this.showFloatingAction((amount * -1).toString(), "#ff005a", true, 1);
    }

    increaseHP(amount: number) {
        const originalHp = this.hp;
        this.hp += amount;
        if (this.hp > this.maxHP) {
            this.hp = this.maxHP;
        }
    
        //reactivate if health was <= 0
        if (originalHp <= 0 && this.hp > 0) {
            this.sprite.setAlpha(1);
            this.bracketLeft?.setAlpha(1);
            this.bracketRight?.setAlpha(1);
            this.assignedBlock?.setAlpha(1);
            this.assignedBlockText?.setAlpha(1);
            this.healthBar?.setAlpha(1);
            this.questionMark?.setAlpha(1);
            if (this.team instanceof Player) {
                this.on("pointerdown", () => (this.team as Player).handleMemberClick(this));
            } else {
                this.on("pointerdown", () => (this.team as Boss).handleEnemyClick(this));
            }
        }
    
        this.updateHealthBar();
    
        const displayAmount = originalHp <= 0 ? this.hp : amount;
        this.showFloatingAction(`+${displayAmount}`, "#00ff00", true, 1);
    }

    showFloatingAction(action: string, color: string = '#ffffff', large: boolean = false, incrementIndex: number = 0) {
        log(`${this} shows floating action: ${action}`);
        if (!this.scene) {
            return;
        }
        const baseOffset = -35;
        const yOffset = incrementIndex * baseOffset;
    
        let fontSize = '16px';
        if (large) {
            fontSize = '36px';
        }

        const actionText = this.scene.add.text(this.x, this.y - this.sprite.height / 2 + yOffset, action, {
            fontFamily: '"Press Start 2P"',
            fontSize,
            color: color,
            stroke: color,
            strokeThickness: 1
        }).setOrigin(0.5);
    
        this.scene.add.tween({
            targets: actionText,
            y: this.y - this.sprite.height / 2 - 50 + yOffset,
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

    hide() {
        this.sprite.setVisible(false);
        this.bracketLeft?.setVisible(false);
        this.bracketRight?.setVisible(false);
        this.assignedBlock?.setVisible(false);
        this.assignedBlockText?.setVisible(false);
        this.assignedText?.setVisible(false);
        this.healthBar.setVisible(false);
        this.questionMark.setVisible(false);
    }

    toString(): string {
        return `Member ${this.number}`;
    }
}