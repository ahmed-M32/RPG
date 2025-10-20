import { Entitiy } from "./Entity.js";
import { Player } from "./Player.js";

const BASE_PATH = "../assets/";
const floatingTexts = [];

export class LevelScene {
	constructor(data) {
		this.canva = document.createElement("canvas");
		this.canva.width = window.innerWidth - 200;
		this.canva.height = window.innerHeight - 100;
		this.ctx = this.canva.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;

		this.canva.classList.add("lvl-canva");
		this.data = data;
		this.enemyList = [];
		this.player = null;
		this.selectedEnemy = null;
		this.clickX = 0;
		this.clickY = 0;
	}

	renderCanvas() {
		this.player = new Player(
			1,
			"ahmed",
			this.data.playerSprite.stats,
			this.data.playerSprite.sprite,
			this.data.playerSprite.dimensions.width,
			this.data.playerSprite.dimensions.height,
			this.data.playerSprite.dimensions.scaleX,
			this.data.playerSprite.dimensions.scaleY,
			this.data.playerSprite.frameCounts
		);

		this.data.monsters.forEach((monster) => {
			const enemy = new Entitiy(
				1,
				monster.stats,
				"necromancer",
				monster.sprite,
				monster.dimensions.width,
				monster.dimensions.height,
				monster.dimensions.scaleX,
				monster.dimensions.scaleY,
				monster.frameCounts,
				floatingTexts
			);
			this.enemyList.push(enemy);
		});

		// handle enemy selection
		this.canva.addEventListener("click", (e) => {
			const rect = this.canva.getBoundingClientRect();
			const mouseX = e.clientX - rect.left;
			const mouseY = e.clientY - rect.top;

			for (const enemy of this.enemyList) {
				if (
					mouseX >= enemy.x &&
					mouseX <= enemy.x + enemy.width &&
					mouseY >= enemy.y &&
					mouseY <= enemy.y + enemy.height
				) {
					console.log(`You clicked on ${enemy.name}`);
					this.selectEnemy(enemy);
					break;
				}
			}
		});

		this.gameLoop();
		return this.canva;
	}

	gameLoop() {
		this.ctx.clearRect(0, 0, this.canva.width, this.canva.height);

		if (this.player) {
			this.player.update();
			this.player.render(this.ctx, this.canva.width);

			this.enemyList.forEach((monster) => {
				monster.update();

				if (monster === this.selectedEnemy) {
					this.ctx.save();
					const centerX = monster.x + monster.width / 2;
					const baseY = monster.y + monster.height + 100; // near feet

					const gradient = this.ctx.createRadialGradient(
						centerX,
						baseY,
						5,
						centerX,
						baseY,
						40
					);
					gradient.addColorStop(0, "rgba(199, 40, 22, 1)");
					gradient.addColorStop(1, "rgba(255, 255, 100, 0)");

					this.ctx.fillStyle = gradient;
					this.ctx.beginPath();
					this.ctx.ellipse(
						centerX,
						baseY,
						monster.width / 2.5,
						15,
						0,
						0,
						Math.PI * 2
					);
					this.ctx.fill();
					this.ctx.restore();
				}

				monster.render(this.ctx);
			});
			floatingTexts.forEach((ft, i) => {
				ft.update();
				ft.draw(this.ctx);
				if (ft.isDead()) floatingTexts.splice(i, 1);
			});
		}

		requestAnimationFrame(() => this.gameLoop());
	}

	playerAtk() {
		if (!this.selectedEnemy) {
			console.log("select an enemy first");
		}
		this.player.attack(this.selectedEnemy);
	}

	selectEnemy(enemy) {
		this.selectedEnemy = enemy;
		console.log("Selected enemy:", enemy.name);
	}
}
