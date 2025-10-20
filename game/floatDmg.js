export class FloatingText {
    constructor(x, y, text, color = "white", isCrit = false) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = isCrit ? "red" : color;
        this.alpha = 1;
        this.speedY = 0.5 + Math.random() * 0.3;
        this.offsetX = (Math.random() - 0.5) * 10;
        this.life = 60;
        this.isCrit = isCrit;
        this.fontSize = isCrit ? 28 : 18; // bigger font for crits
    }

    update() {
        this.y -= this.speedY;
        this.x += this.offsetX * 0.02;
        this.life--;
        this.alpha = this.life / 60;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.font = `bold ${this.fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }

    isDead() {
        return this.life <= 0;
    }
}
