export default class Section {
  constructor({ items, renderer }, cardSelector) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(cardSelector);
    // pass container selector as argument
    // select container
  }

  // setContainer(container) {
  //   this.container = container;
  // }

  // call on page load
  renderItems(items) {
    items.forEach((item) => {
      this.renderer(item);
      // const element = this.renderer(item);
      // this.container.append(element);
    });
  }

  // call when creating a new card
  addItem(element) {
    this.container.prepend(element);
  }
}
