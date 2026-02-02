import { PopUpMenu } from "./popUpMenu.js";

export class LevelUIManager {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.levels = 100;
    }

    render() {
        const container = document.createElement("div");
        container.classList.add("scene");

        const title = document.createElement("h2");
        title.textContent = "Select a Level";
        container.appendChild(title);

        for (let i = 0; i < this.levels; i++) {
            const btn = document.createElement("button");
            btn.classList.add("lvl-btn");

            btn.dataset.lvl = `${i}`;
            btn.textContent = `Level ${i}`;
            container.appendChild(btn);
        }

        const backBtn = document.createElement("button");
        backBtn.classList.add("nav-btn");

        let PopUp = new PopUpMenu("menu");
        backBtn.dataset.scene = "main-area";
        backBtn.textContent = "Back";
        PopUp.add(backBtn);
        container.appendChild(PopUp.getContainer());

        return container;
    }
}
