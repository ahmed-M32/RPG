import { SpriteRenderer } from "./spriteRenderer.js";

export class Entitiy {
	constructor(
		lvl,
		stats,
		name,
		hp,
		sprite,
		width,
		height,
		scaleX,
		scaleY,
		frames
	) {
		this.lvl = lvl;
		this.stats = stats;
		this.name = name;
		this.hp = stats.hp;
		this.sprite = sprite;
		this.states = {};
		this.height = height;
		this.width = width;
		this.scaleX = scaleX;
		this.scaleY = scaleY;

		this.x = 600;
		this.y = 200;

		this.renderer = new SpriteRenderer(
			this.sprite,
			this.width,
			this.height,
			10,
			this.scaleX,
			this.scaleY,
			frames,
			this.x,
			this.y
		);
	}
	takeDamage(dmg) {
		this.stats.hp -= dmg;
		this.renderer.setState("HURT")
	}
	attack(player) {
		player.takeDamage(this.stats.atk);
	}
	isDead() {
		return hp <= 0;
	}

	render(ctx) {
		this.renderer.draw(ctx, this.x, this.y);
	}
	update() {
		this.renderer.update();
	}
}
