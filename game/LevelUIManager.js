import { LevelScene } from "./LevelScene.js";
import { PopUpMenu } from "./popUpMenu.js";
import { getData } from "./fetchData.js";
import { gameManager } from "./gameManager.js";

export class LevelUIManager {
    constructor(data) {
        this.data = data;
    }

    async render() {
        let container = document.createElement("div");
        container.innerHTML = this.data;
        console.log(this.data);

        container.classList.add("scene");

        const playerSpriteSet = await getData("./Game_data/player.json");
        const monstersList = await getData("./Game_data/elite_monsters.json");

        //here will add the linking of data with UI

        let atkButton = document.createElement("button");
        atkButton.textContent = "attack";

        atkButton.addEventListener("click", () => {
            canvaManager.playerAtk();
        });

        let PopUp = new PopUpMenu("Level Menu");
        const backBtn = document.createElement("button");
        backBtn.classList.add("nav-btn");

        backBtn.dataset.scene = "levels";
        backBtn.textContent = "Back";
        PopUp.add(backBtn);

        const data = {
            lvl: this.data,
            playerSprite: playerSpriteSet,
            monsters: monstersList,
        };

        const canvaManager = new LevelScene(data);
        const lvlManager = new gameManager();
        container.append(canvaManager.renderCanvas());

        container.appendChild(PopUp.getContainer());
        container.appendChild(atkButton);
        return container;
    }
}
