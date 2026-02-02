export class SpriteRenderer {
    constructor(
        sprites,
        frameWidth,
        frameHeight,
        frameSpeed,
        scaleX,
        scaleY,
        totalFrames,
    ) {
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameSpeed = frameSpeed;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.state = "IDLE";
        this.currentFrame = 0;
        this.tickCount = 0;
        this.totalFrames = totalFrames;
        this.images = {};
        this.BASE_PATH = "../assets/";
        this.isAnimating = false;

        for (let state in sprites) {
            const img = new Image();
            img.src = this.BASE_PATH + sprites[state];
            this.images[state] = img;
        }
    }

    setState(state) {
        if (this.isAnimating && state !== "ATTACK" && state !== "SPRINT" && state !== "HURT" && state !== "DEAD") {
            return;
        }

        if (this.state !== state) {
            this.state = state;
            this.currentFrame = 0;
            this.tickCount = 0;
        }
    }

    update() {
        if (this.isAnimating) return;

        this.tickCount++;
        if (this.tickCount >= this.frameSpeed) {
            this.tickCount = 0;
            this.currentFrame++;
            if (this.currentFrame >= this.totalFrames[this.state]) {
                if (this.state === "IDLE") {
                    this.currentFrame = 0;
                } else if (this.state === "DEAD") {
                    this.currentFrame = this.totalFrames[this.state] - 1;
                } else {
                    this.setState("IDLE");
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
            scaledHeight,
        );
    }

    async handleAttack(attacker, target, speed = 30) {
        this.isAnimating = true;

        const startX = attacker.x;
        const startY = attacker.y;

        this.setState("SPRINT");
        await this.animateMovement(attacker, target.x - 50, target.y, speed);

        this.setState("ATTACK");
        await this.waitForAnimation("ATTACK");

        target.takeDamage(attacker.stats.atk);
        target.renderer.setState("HURT");

        this.setState("SPRINT");
        await this.animateMovement(attacker, startX, startY, speed);

        this.setState("IDLE");
        this.isAnimating = false;
    }

    async animateMovement(entity, targetX, targetY, speed) {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                const dx = targetX - entity.x;
                const dy = targetY - entity.y;
                const dist = Math.hypot(dx, dy);

                if (dist <= speed) {
                    entity.x = targetX;
                    entity.y = targetY;
                    clearInterval(interval);
                    resolve();
                    return;
                }

                entity.x += (dx / dist) * speed;
                entity.y += (dy / dist) * speed;
            }, 16);
        });
    }

    async waitForAnimation(state) {
        const totalFrames = this.totalFrames[state];
        const duration = totalFrames * this.frameSpeed * 16.67;
        return this.wait(duration);
    }

    wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
