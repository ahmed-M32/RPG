import { Game } from "./game";
class Manager {
	constructor(game) {
		this.game = game;
	}

	playerAttack(target) {
		this.game.player.attack(target);
	}
	playerDmg(val) {
		this.game.player.takeDmg(val);
	}

	saveGameState(state) {
		window.localStorage.setItem("gameData", state);
	}
	loadGameState() {
		let gameState = localStorage.getItem("gameData");
		return gameState;
	}

	openInventory() {
		let inventory = this.game.inventory;
		return inventory;
	}
}
