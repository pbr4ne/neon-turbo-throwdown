
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Deck from "../prefabs/Deck";
import Hand from "../prefabs/Hand";
import Member from "../prefabs/Member";
/* END-USER-IMPORTS */

export default abstract class Team extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, visibleCards: boolean) {
		super(scene);

		/* START-USER-CTR-CODE */
		this.visibleCards = visibleCards;
		this.members = [];
        this.deck = new Deck(scene);
        this.hand = new Hand(scene, 5);
      
        this.addMembers();
        this.scene.input.on('pointerdown', this.handleGlobalClick, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	protected deck!: Deck;
    protected hand!: Hand;
    public members!: Member[];
    public opponent!: Team;
	protected visibleCards!: boolean;
    public layer!: Phaser.GameObjects.Layer;
    private selectedMember: Member | null = null;
    private memberClicked: boolean = false;

	abstract addMembers(): void;

    setOpponent(opponent: Team) {
        this.opponent = opponent;
    }

    handleMemberClick(member: Member) {
        this.memberClicked = true;

        if (this.selectedMember) {
            this.selectedMember.disableGlow();
        }

        if (this.selectedMember === member) {
            this.selectedMember = null;
        } else {
            this.selectedMember = member;
            this.selectedMember.enableGlow();
        }
    }

    handleGlobalClick(pointer: Phaser.Input.Pointer) {
        
        if (!this.memberClicked && this.selectedMember) {
            this.selectedMember.disableGlow();
            this.selectedMember = null;
        }

        this.memberClicked = false;
    }

    onDeckClick() {
        if (this.hand.getCards().length < 5) {
            const topCard = this.deck.drawCard();
            if (topCard) {
                topCard.setTexture("cardFront");
                topCard.showName(this.visibleCards);
                topCard.showIcon(this.visibleCards);
                this.hand.addCard(topCard);
                topCard.off("pointerdown");
                this.deck.updateTopCardInteraction();
                topCard.on("pointerdown", () => {
                    this.hand.handleCardClick(topCard);
                });
            }
        }
    }

    executeTurn() {
        const throwers = this.members.filter(member => member.getAssignedCards().includes("THROW"));
        throwers.forEach(thrower => {
            const target = this.selectRandomMember(this.opponent.members);
            if (target) {
                const damage = Phaser.Math.Between(1, 10);
                target.hit(damage);
                console.log(`Member ${thrower} hits ${target} for ${damage} damage`);
            }
        });
    }

    selectRandomMemberWithCard(cardType: string, members: Member[]): Member | null {
        const eligibleMembers = members.filter(member => member.getAssignedCards().includes(cardType));
        if (eligibleMembers.length > 0) {
            const randomIndex = Phaser.Math.Between(0, eligibleMembers.length - 1);
            return eligibleMembers[randomIndex];
        }
        return null;
    }

    selectRandomMember(members: Member[]): Member | null {
        if (members.length > 0) {
            const randomIndex = Phaser.Math.Between(0, members.length - 1);
            return members[randomIndex];
        }
        return null;
    }

    removeMember(member: Member) {
        this.members = this.members.filter(p => p !== member);
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
