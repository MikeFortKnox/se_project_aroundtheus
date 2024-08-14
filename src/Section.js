class Section {
  constructor({ items, renderer }) {
    this.items = items;
    this.renderer = renderer;
    this.container = null;
  }

  setContainer(container) {
    this.container = container;
  }

  renderItems() {
    this.items.forEach((item) => {
      const element = this.renderer(item);
      this.container.append(element);
    });
  }

  addItem(element) {
    this.container.append(element);
  }
}
