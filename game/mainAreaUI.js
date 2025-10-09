export class MainAreaUI {
	constructor(sceneManager) {
		this.sceneManager = sceneManager;
	}
	render() {
		const container = document.createElement("div");
		container.classList.add("scene");

		const title = document.createElement("h1");
		title.textContent = "Main Area";
		container.appendChild(title);

		const levelsBtn = document.createElement("button");
		levelsBtn.classList.add("nav-btn");

		levelsBtn.dataset.scene = "levels";
		levelsBtn.textContent = "Levels";
		container.appendChild(levelsBtn);

		const dungeonsBtn = document.createElement("button");
		dungeonsBtn.classList.add("nav-btn");

		dungeonsBtn.dataset.scene = "dungeons";
		dungeonsBtn.textContent = "Dungeons";
		container.appendChild(dungeonsBtn);


		const shopBtn = document.createElement("button");
		shopBtn.classList.add("nav-btn");

		shopBtn.dataset.scene = "shop";
		shopBtn.textContent = "Shop";
		container.appendChild(shopBtn);

		const inventoryBtn = document.createElement("button");
		inventoryBtn.classList.add("nav-btn");

		inventoryBtn.dataset.scene = "inventory";
		inventoryBtn.textContent = "Inventory";
		container.appendChild(inventoryBtn);

		const backBtn = document.createElement("button");
		backBtn.classList.add("nav-btn");

		backBtn.dataset.scene = "menu";
		backBtn.textContent = "Back";
		container.appendChild(backBtn);

		return container;
	}
}
