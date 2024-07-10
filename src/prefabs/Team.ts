
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Deck from "./Deck";
import Hand from "./Hand";
import Member from "./Member";
import Game from "../scenes/Game"
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
	public deck!: Deck;
    public hand!: Hand;
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
        if ((this.scene.scene.get('Game') as Game).getCurrentStep() != 0) {
            console.log("can't draw cards now");
            return;
        }

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

    

    removeMember(member: Member) {
        this.members = this.members.filter(p => p !== member);
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
