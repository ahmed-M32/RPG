import { SceneManager } from "./sceneManager.js";
import { LevelUIManager } from "./lvlMenuUIManager.js";
import { MainAreaUI } from "./mainAreaUI.js";

const app = document.getElementById("app");
const sceneManager = new SceneManager(app);

sceneManager.addScene("menu", () => {
	const container = document.createElement("div");
	container.classList.add("scene");

	const title = document.createElement("h1");
	title.textContent = "Main Menu";

	const playButton = document.createElement("button");
	playButton.classList.add("nav-btn");

	playButton.dataset.scene = "main-area";
	playButton.textContent = "Main Area";

	container.appendChild(title);
	container.appendChild(playButton);

	return container;
});
sceneManager.addScene("main-area", () => {
	const mainArea = new MainAreaUI(sceneManager);
	return mainArea.render();
});

sceneManager.addScene("levels", async () => {
	const levelManager = new LevelUIManager(sceneManager);
	const levelManagerDiv = await levelManager.render();
	return levelManagerDiv;
});
sceneManager.addScene("shop", () => {
	const shopUI = "";
});

sceneManager.start("menu");
