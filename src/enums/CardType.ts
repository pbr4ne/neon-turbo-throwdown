export enum CardType {
    unknown,
    throw,
    evade,
    block,
    catch
}

export function getCardName(cardType: CardType): string {
    switch (cardType) {
        case CardType.unknown:
            return 'unknown';
        case CardType.throw:
            return 'throw';
        case CardType.evade:
            return 'evade';
        case CardType.block:
            return 'block';
        case CardType.catch:
            return 'catch';
        default:
            return 'unknown';
    }
}