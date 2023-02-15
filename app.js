class App {
  constructor() {
    this.model = new Model(this);
    this.view = new View(this);
    this.controller = new Controller(this);
  }
}
