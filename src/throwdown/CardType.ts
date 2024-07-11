export class CardType {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public static CARD_TYPES: CardType[] = [
        new CardType("unknown"),
        new CardType("throw"),
        new CardType("evade"),
        new CardType("block"),
        new CardType("catch")
    ];

    public static unknown = CardType.getCardType("unknown");
    public static throw = CardType.getCardType("throw");
    public static evade = CardType.getCardType("evade");
    public static block = CardType.getCardType("block");
    public static catch = CardType.getCardType("catch");

    public static getCardType(name: string): CardType {
        return CardType.CARD_TYPES.find(cardType => cardType.getName() === name)!;
    }
}


