export class PopUpMenu {
	constructor(text) {
		this.menu = document.createElement("div");
		this.menu.classList.add("pop-up-menu");
		this.menu.innerText = text;

		this.container = document.createElement("div");
		this.container.classList.add("pop-up-off");
		this.menu.append(this.container);
		this.menu.addEventListener("click", () => {
			this.container.classList.toggle("pop-up-off");
		});
	}
	add(element) {
		this.container.append(element);
		element.classList.add("pop-up-button");
	}

	getContainer() {
		return this.menu;
	}
}
