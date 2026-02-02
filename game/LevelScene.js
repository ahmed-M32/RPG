import { Entitiy } from "./Entity.js";
import { Player } from "./Player.js";
import { gameManager } from "./gameManager.js";
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
        this.gameManager = null
    }

    /**
     * Dynamically position enemies based on count
     * 1 enemy: center
     * 2 enemies: vertical line
     * 3+ enemies: arc formation
     */
    positionEnemies() {
        const count = this.enemyList.length;
        if (count === 0) return;

        const centerX = this.canva.width * 0.75;  // Right side
        const centerY = this.canva.height * 0.5;   // Middle height

        if (count === 1) {
            // Single enemy in center
            this.enemyList[0].x = centerX;
            this.enemyList[0].y = centerY;
        } 
        else if (count === 2) {
            // Two enemies in vertical line
            const spacing = this.canva.height * 0.3;
            this.enemyList[0].x = centerX;
            this.enemyList[0].y = centerY - spacing / 2;
            this.enemyList[1].x = centerX;
            this.enemyList[1].y = centerY + spacing / 2;
        } 
        else {
            // 3+ enemies in arc formation
            const radius = this.canva.height * 0.25;
            const arcAngle = Math.PI * 0.6;  // 108 degrees arc
            const startAngle = (Math.PI / 2) - (arcAngle / 2);  // Start from top

            this.enemyList.forEach((enemy, i) => {
                const angle = startAngle + (arcAngle / (count - 1)) * i;
                enemy.x = centerX + Math.cos(angle) * radius;
                enemy.y = centerY + Math.sin(angle) * radius;
            });
        }
    }

    renderCanvas() {
        this.player = new Player(
            1,
            this.data.playerSprite.stats,
            "ahmed",
            this.data.playerSprite.sprite,
            this.data.playerSprite.dimensions.width,
            this.data.playerSprite.dimensions.height,
            this.canva.width * 0.15,  // 15% from left
            this.canva.height * 0.5,   // Middle height
            this.data.playerSprite.dimensions.scaleX,
            this.data.playerSprite.dimensions.scaleY,
            this.data.playerSprite.frameCounts,
            6,
            floatingTexts
        );

        // Create enemies first (without positions)
        this.data.monsters.forEach((monster) => {
            const enemy = new Entitiy(
                1,
                monster.stats,
                "necromancer",
                monster.sprite,
                monster.dimensions.width,
                monster.dimensions.height,
                0, 0,  
                monster.dimensions.scaleX,
                monster.dimensions.scaleY,
                monster.frameCounts,
                10,
                floatingTexts,
            );
            this.enemyList.push(enemy);
        });

        this.positionEnemies();
        
        this.gameManager = new gameManager(this.player, this.enemyList);
        
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
                        40,
                    );
                    gradient.addColorStop(0, "rgba(199, 40, 22, 1)");
                    gradient.addColorStop(1, "rgba(255, 255, 100, 0)");

                    this.ctx.fillStyle = gradient;
                    this.ctx.beginPath();
                    this.ctx.ellipse(
                        centerX,
                        baseY,
                        monster.width,
                        20,
                        0,
                        0,
                        Math.PI * 3,
                    );
                    this.ctx.fill();
                    this.ctx.restore();
                }

                monster.render(this.ctx);
            });
            if(!this.gameManager.isPlayer()){
                console.log("here")
                const currentTurn = this.gameManager.getTurn();
                console.log(currentTurn)
                currentTurn[0].attack(this.player);
            }
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
        this.gameManager.arrangeTurns()
        if (this.selectedEnemy.isDead()) {
            this.enemyList = this.enemyList.filter(monster => {
                return monster !== this.selectedEnemy  
            });
            console.log(this.enemyList);
            this.selectedEnemy = null;
            
            // Reposition remaining enemies
            this.positionEnemies();
        }
    }

    selectEnemy(enemy) {
        this.selectedEnemy = enemy;
        console.log("Selected enemy:", enemy.name);
    }
}
