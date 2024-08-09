
import Phaser from "phaser";
import { checkUrlParam } from "../utilities/GameUtils";
import { CoachList } from "../throwdown/CoachList";
import { Library } from "../throwdown/Library";
import { CardFactory } from "~/cards/CardFactory";

export default class Init extends Phaser.Scene {

	constructor() {
		super("Init");
	}

	create() {

		CoachList.you.setBaseCards(Library.getPureDeck());

		if (checkUrlParam("skipWelcome", "true")) {
			this.scene.start("Game");
		} else {
			this.scene.start("Welcome");
		}

		this.events.emit("scene-awake");
	}

}


