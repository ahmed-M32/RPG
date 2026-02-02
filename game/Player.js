import { SpriteRenderer } from "./spriteRenderer.js";
import { HPBar } from "./HPbar.js";
import { Entitiy } from "./Entity.js";

export class Player extends Entitiy {
    constructor(lvl, stats, name, sprite, width, height, x, y, scaleX, scaleY, frames, speed, dmg) {
        super(lvl, stats, name, sprite, width, height, x, y, scaleX, scaleY, frames, speed, dmg);
        this.states = {};

        this.hpBar = new HPBar(this.maxHp, "#2ecc71", 400, 14);
    }

    takeDamage(dmg) {
        this.hp = Math.max(0, this.hp - dmg);
        this.hpBar.update(this.hp);
        this.renderer.setState("HURT");
    }

    attack(target) {

        this.renderer.handleAttack(this, target, 30);
        target.takeDamage(this.stats.atk);
        console.log(this.stats)
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
