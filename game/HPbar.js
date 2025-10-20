// HPBar.js
export class HPBar {
	constructor(maxHp, color = "#ff3b3b", width = 300, height = 12) {
		this.maxHp = maxHp;
		this.currentHp = maxHp;
		this.smoothHp = maxHp; 
		this.color = color;
		this.width = width;
		this.height = height;
	}

	update(currentHp) {
		this.currentHp = Math.max(0, currentHp);
		this.smoothHp += (this.currentHp - this.smoothHp) * 0.1;
	}

	draw(ctx, x, y, centered = false) {
		const drawX = centered ? x - this.width / 2 : x;
		const drawY = y;

		// Outline
		ctx.fillStyle = "black";
		ctx.fillRect(drawX - 2, drawY - 2, this.width + 4, this.height + 4);

		// Background
		ctx.fillStyle = "#222";
		ctx.fillRect(drawX, drawY, this.width, this.height);

		const fillWidth = (this.smoothHp / this.maxHp) * this.width;
		ctx.fillStyle = this.color;
		ctx.fillRect(drawX, drawY, fillWidth, this.height);

		ctx.fillStyle = "white";
		ctx.font = "10px monospace";
		ctx.textAlign = "center";
		ctx.fillText(
			`${Math.ceil(this.currentHp)} / ${this.maxHp}`,
			drawX + this.width / 2,
			drawY - 5
		);
	}
}
