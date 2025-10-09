import { SpriteRenderer } from "./spriteRenderer.js";

export class Player {
	constructor( lvl, name, stats, sprite, width, height, scaleX, scaleY,frames) {
		this.hp = stats.hp;
		this.lvl = lvl;
		this.name = name;
		this.stats = stats;
		this.sprite = sprite;
		this.states = {};
		this.width = width;
		this.height = height;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.frames =frames

		this.x = 100;
		this.y = 300;

		this.renderer = new SpriteRenderer(
			this.sprite,
			this.width,
			this.height,
			6,
			this.scaleX,
			this.scaleY,frames,this.x,this.y
		);
	}
	takeDamage(dmg) {
		this.hp -= dmg;
	}
	attack(target) {
		console.log(target);
		console.log(this.stats);
		
		target.stats.hp -= this.stats.atk;
		this.renderer.handleAttack(this,target,20)
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
