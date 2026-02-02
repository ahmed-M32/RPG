import { SpriteRenderer } from "./spriteRenderer.js";
import { HPBar } from "./HPbar.js";
import { FloatingText } from "./floatDmg.js";

export class Entitiy {
    constructor(
        lvl,
        stats,
        name,
        sprite,
        width,
        height,
        x, y,
        scaleX,
        scaleY,
        frames,
        speed,
        dmg,
    ) {
        this.lvl = lvl;
        this.stats = stats;
        this.name = name;
        this.hp = stats.hp;
        this.maxHp = stats.hp;
        this.sprite = sprite;
        this.states = {};
        this.height = height;
        this.width = width;
        this.scaleX = scaleX;
        this.scaleY = scaleY;

        this.x = x;
        this.y = y;
        this.floatingTexts = dmg;

        this.renderer = new SpriteRenderer(
            this.sprite,
            this.width,
            this.height,
            speed,
            this.scaleX,
            this.scaleY,
            frames,
            this.x,
            this.y,
        );
        this.currentState = "IDLE";
        this.hpBar = new HPBar(this.maxHp, "#e74c3c", this.width, 6);
    }

    takeDamage(amount) {
        const isCrit = Math.random() < 0.2;
        const dmg = isCrit ? amount * 2 : amount;
        console.log(amount)
        this.hp = Math.max(0, this.hp - dmg);

        this.floatingTexts.push(
            new FloatingText(
                this.x + 16,
                this.y,
                isCrit ? `CRIT! -${dmg}` : `-${dmg}`,
                "yellow",
                isCrit,
            ),
        );
    }

    attack(player) {
        this.renderer.handleAttack(this,player,30)
        player.takeDamage(this.stats.atk);
    }

    isDead() {
        return this.hp <= 0;
    }

    render(ctx) {
        this.renderer.draw(ctx, this.x, this.y);

        const barX = this.x + this.width / 2;
        const barY = this.y - 20;
        this.hpBar.draw(ctx, barX, barY, true);
    }

    update() {
        this.renderer.update();
        this.hpBar.update(this.hp);
    }
    kill() {
    }
}
