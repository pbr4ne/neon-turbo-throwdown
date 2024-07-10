
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
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	protected deck!: Deck;
    protected hand!: Hand;
    public members!: Member[];
    public opponent!: Team;
	protected visibleCards!: boolean;
    public layer!: Phaser.GameObjects.Layer;

	abstract addMembers(): void;

    setOpponent(opponent: Team) {
        this.opponent = opponent;
    }

    handleMemberClick(member: Member) {
        this.hand.assignCardToMember(member);
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
        const thrower = this.selectRandomMemberWithCard("THROW", this.members);
        if (thrower) {
            const target = this.selectRandomMember(this.opponent.members);
            if (target) {
                const damage = Phaser.Math.Between(1, 10);
                target.hit(damage);
                console.log(`Member ${thrower} hits ${target} for ${damage} damage`);
            }
        }
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
