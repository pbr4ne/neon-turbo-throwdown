export default class GenericCard extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string) {
		super(scene, x ?? 0, y ?? 0);

	}
}