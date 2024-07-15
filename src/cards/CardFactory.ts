export class CardFactory {
    private static turboThrow: any = null;

    public static createTurboThrow(): any {
        if (!CardFactory.turboThrow) {
            const { TurboThrow } = require("./TurboThrow");
            CardFactory.turboThrow = new TurboThrow();
        }
        return CardFactory.turboThrow;
    }
}