export class gameManager {
    constructor(player, enemies) {
        this.player = player;
        this.enemies = enemies;
        this.currentTurn = 1;
        this.isPlayerTurn = true;
        this.queue = [];
        let index = 0;
        for (let i = 0; i <= this.enemies?.length; i++) {

            console.log(this.enemies)
            if (this.isPlayerTurn) {
                this.queue.push(this.player)
                this.isPlayerTurn = false;
            } else {
                this.queue.push(this.enemies[index])
                index++;
                this.isPlayerTurn = true
            }
        }
        console.log(this.queue)
    }
    arrangeTurns() {
        // 1,2,1,3,1,4,1,5
        // 2,1,3,1,4,1,5,1
        // 1,3,1,4,1,5,1,2
        const len = this.queue.length;
        const count = 1 % len;
        this.queue = [...this.queue.slice(count), ...this.queue.slice(0, count)];


    }
    getTurn() {
        let current = this.queue[0];
        console.log(this.queue)
        this.arrangeTurns()
        return [current, this.currentTurn];
    }
    isPlayer() {
        return this.queue[0] === this.player;
    }

}
