export default class TextFactory {
    static createText(scene: Phaser.Scene, x: number, y: number, content: string, options: Partial<Phaser.Types.GameObjects.Text.TextStyle> = {}) {
        const defaultOptions: Phaser.Types.GameObjects.Text.TextStyle = {
            fontFamily: '"Press Start 2P"', // needs the quotes because of the 2
            fontSize: '20px',
            color: '#ffffff',
            stroke: '#ffffff',
            strokeThickness: 1,
            padding: { x: 5, y: 5 },
            align: 'left'
        };

        const finalOptions = { ...defaultOptions, ...options };
        const text = new Phaser.GameObjects.Text(scene, x, y, content, finalOptions);
        text.setOrigin(0.5, 0.5);
        scene.add.existing(text);
        return text;
    }
}