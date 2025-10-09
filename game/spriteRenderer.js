export class SpriteRenderer {
	constructor(
		sprites,
		frameWidth,
		frameHeight,
		frameSpeed,
		scaleX,
		scaleY,
		totalFrames,
		x,
		y
	) {
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		this.frameSpeed = frameSpeed;
		this.scaleX = scaleX;
		this.scaleY = scaleY;

		this.state = "IDLE";
		this.currentFrame = 0;
		this.tickCount = 0;
		(this.x = x), (this.y = y);
		this.totalFrames = totalFrames;
		this.images = {};
		this.BASE_PATH = "../assets/";

		for (let state in sprites) {
			const img = new Image();
			img.src = this.BASE_PATH + sprites[state];
			this.images[state] = img;
		}
	}

	setState(state) {
		if (this.state !== state) {
			this.state = state;
			this.currentFrame = 0;
			this.tickCount = 0;
		}
	}

	update() {
		this.tickCount++;
		if (this.tickCount >= this.frameSpeed) {
			this.tickCount = 0;
			this.currentFrame++;
			if (this.currentFrame >= this.totalFrames[this.state]) {
				if (this.state !== "IDLE" && this.state !== "DEAD") {
					this.setState("IDLE");
				} else if (this.state === "IDLE") {
					this.currentFrame = 0;
				} else {
					this.currentFrame = this.totalFrames[this.state] - 1;
				}
			}
		}
	}

	draw(ctx, x, y) {
		const spriteImg = this.images[this.state];

		if (!spriteImg.complete) return;

		const scaledWidth = this.frameWidth * this.scaleX;
		const scaledHeight = this.frameHeight * this.scaleY;

		const offsetX = x - (scaledWidth - this.frameWidth) / 2;
		const offsetY = y - (scaledHeight - this.frameHeight) / 2;

		ctx.drawImage(
			spriteImg,
			this.currentFrame * this.frameWidth,
			0,
			this.frameWidth,
			this.frameHeight,
			offsetX,
			offsetY,
			scaledWidth,
			scaledHeight
		);
	}

	/**
	 * Smoothly moves the attacker towards target, plays ATTACK animation,
	 * then moves back to original position.
	 * @param {Entity} attacker - entity with x, y, renderer, etc.
	 * @param {Entity} target - the target entity
	 * @param {Function} onComplete - optional callback after attack completes
	 */
	async handleAttack(attacker, target, speed = 4) {
		const startX = this.x;
		const startY = this.y;
		console.log(target);

		const targetX = target.x;
		const targetY = target.y;

		// Step 1: Face target and switch to sprint
		this.setState("SPRINT");

		// Move towards target
		await this.animateMovement(attacker, targetX - 50, targetY, speed);

		// Step 2: Attack animation
		this.setState("ATTACK");
		await this.wait(this.totalFrames.ATTACK * this.frameSpeed * 16);

		// Step 3: Go back to starting position
		this.setState("SPRINT");
		await this.animateMovement(attacker, startX, startY, speed);

		// Step 4: Idle again
		this.setState("IDLE");
		target.renderer.setState("HURT")
	}

	async animateMovement(entity, targetX, targetY, speed) {
		return new Promise((resolve) => {
			const step = () => {
				const dx = targetX - entity.x;
				const dy = targetY - entity.y;
				const dist = Math.hypot(dx, dy);

				if (dist < 1) {
					entity.x = targetX;
					entity.y = targetY;
					resolve();
					return;
				}

				entity.x += (dx / dist) * speed;
				entity.y += (dy / dist) * speed;

				requestAnimationFrame(step);
			};
			step();
		});
	}

	wait(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	
}
