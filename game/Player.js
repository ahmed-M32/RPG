import { SpriteRenderer } from "./spriteRenderer.js";
import { HPBar } from "./HPbar.js";

export class Player {
	constructor(lvl, name, stats, sprite, width, height, scaleX, scaleY, frames) {
		this.hp = stats.hp;
		this.maxHp = stats.hp;
		this.lvl = lvl;
		this.name = name;
		this.stats = stats;
		this.sprite = sprite;
		this.states = {};
		this.width = width;
		this.height = height;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.frames = frames;

		this.x = 100;
		this.y = 300;

		this.renderer = new SpriteRenderer(
			this.sprite,
			this.width,
			this.height,
			6,
			this.scaleX,
			this.scaleY,
			frames,
			this.x,
			this.y
		);

		this.hpBar = new HPBar(this.maxHp, "#2ecc71", 400, 14);
	}

	takeDamage(dmg) {
		this.hp = Math.max(0, this.hp - dmg);
		this.hpBar.update(this.hp);
		this.renderer.setState("HURT");
	}

	attack(target) {
		target.takeDamage(this.stats.atk);
		this.renderer.handleAttack(this, target, 20);
	}

	isDead() {
		return this.hp <= 0;
	}

	render(ctx, canvasWidth) {
		this.renderer.draw(ctx, this.x, this.y);
		this.hpBar.draw(ctx, canvasWidth / 2, 50, true);
	}

	update() {
		this.renderer.update();
		this.hpBar.update(this.hp);
	}
}
