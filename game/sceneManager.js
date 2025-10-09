import { LevelDataGenerator } from "./levelDataGenerator.js";
import { LevelUIManager } from "./LevelUIManager.js";

export class SceneManager {
	constructor(root) {
		this.root = root;
		this.scenes = {};
	}

	addScene(name, renderFn) {
		this.scenes[name] = renderFn;
	}

	async start(sceneName) {
		this.root.querySelectorAll(".scene").forEach((el) => {
			el.classList.remove("active");
		});

		let html = this.scenes[sceneName]();
		if (html instanceof Promise) {
			html = await html;
		}

		html.classList.add("scene", "active");

		this.root.innerHTML = "";
		this.root.append(html);

		this._wireNavButtons();
		this._wireLvlButtons();
	}

	_wireNavButtons() {
		this.root.querySelectorAll(".nav-btn").forEach((btn) => {
			btn.addEventListener("click", () => {
				const target = btn.getAttribute("data-scene");
				this.start(target);
			});
		});
	}
	_wireLvlButtons() {
		this.root.querySelectorAll(".lvl-btn").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				let lvlNum = `level ${e.target.dataset.lvl}`;
				const lvlScene = new LevelUIManager(lvlNum);

				this.addScene(lvlNum, async () => {
					const scene = await lvlScene.render();
					return scene;
				});

				const newLvl = new LevelDataGenerator(e.target.dataset.lvl);
				const lvlData = newLvl.getLvlData(lvlNum);

				this.start(lvlNum);
			});
		});
	}
}
