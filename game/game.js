import { Player } from "./Player.js";
import { Entitiy } from "./Entity.js";

export class Game {
	constructor(player, inventory, manager) {
		this.player = player;
		this.invetory = inventory;
		this.saveManager = manager;
	}
}
