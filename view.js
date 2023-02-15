class View {
  constructor(app) {
    this.app = app;
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    onresize = this.resize.bind(this);
    this.resize();
  }

  drawAll() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawAxes();
    // TODO: Draw old points on resize.
  }

  drawAxes() {
    this.context.strokeStyle = config.axes.color;
    this.context.fillStyle = config.axes.color;
    this.context.lineWidth = config.axes.thickness;
    this.context.font = config.axes.font;
    this.context.textAlign = "center";
    this.context.beginPath();
    this.drawAxisLines();
    this.drawTicksY();
    this.drawTicksX();
    this.context.stroke();
    this.drawLabelsX();
    this.drawLabelsY();
  }

  drawAxisLines() {
    this.context.moveTo(config.axes.margin, 0);
    this.context.lineTo(
      config.axes.margin,
      this.canvas.height - config.axes.margin
    );
    this.context.lineTo(
      this.canvas.width,
      this.canvas.height - config.axes.margin
    );
  }

  drawDot(frequency, volume) {
    const xBigStep = (this.canvas.width - config.axes.margin) / 10;
    const i = 3 * (this.app.model.freqToExponent(frequency) - 1);
    const yBigStep = (this.canvas.height - config.axes.margin) / 10;
    const j = volume / 10;
    this.context.fillStyle = config.points.color;
    this.context.beginPath();
    this.context.arc(
      config.axes.margin + xBigStep * i,
      this.canvas.height - config.axes.margin - j * yBigStep,
      config.points.radius,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }

  drawLabelsX() {
    const step = (this.canvas.width - config.axes.margin) / 10;
    for (let i = 0; i < 10; ++i) {
      let value = Math.round(2 * Math.pow(10, 1 + i / 3) * 10) / 10;
      this.context.fillText(
        value,
        config.axes.margin + i * step,
        this.canvas.height - 6
      );
    }
    this.context.fillText(
      "(Hz)",
      this.canvas.width - 18,
      this.canvas.height - 6
    );
  }

  drawLabelsY() {
    const step = (this.canvas.height - config.axes.margin) / 10;
    for (let i = 0; i < 11; ++i) {
      let value = i * 10;
      this.context.fillText(
        value,
        10,
        this.canvas.height - config.axes.margin - i * step + (i === 10 ? 12 : 4)
      );
    }
    this.context.fillText(
      "%",
      10,
      this.canvas.height - config.axes.margin - 10 * step + 24
    );
  }

  drawTicksX() {
    const xBigStep = (this.canvas.width - config.axes.margin) / 10;
    const xSmallStep = (this.canvas.width - config.axes.margin) / 100;
    for (
      let x = config.axes.margin + xSmallStep;
      x <= this.canvas.width;
      x += xSmallStep
    ) {
      this.context.moveTo(x, this.canvas.height - config.axes.margin - 5);
      this.context.lineTo(x, this.canvas.height - config.axes.margin + 5);
    }
    for (
      let x = config.axes.margin + xBigStep;
      x <= this.canvas.width;
      x += xBigStep
    ) {
      this.context.moveTo(x, this.canvas.height - config.axes.margin - 10);
      this.context.lineTo(x, this.canvas.height - config.axes.margin + 10);
    }
  }

  drawTicksY() {
    const yBigStep = (this.canvas.height - config.axes.margin) / 10;
    const ySmallStep = (this.canvas.height - config.axes.margin) / 100;
    for (
      let y = this.canvas.height - config.axes.margin - ySmallStep;
      y >= 0;
      y -= ySmallStep
    ) {
      this.context.moveTo(config.axes.margin - 5, y);
      this.context.lineTo(config.axes.margin + 5, y);
    }
    for (
      let y = this.canvas.height - config.axes.margin - yBigStep;
      y >= 0;
      y -= yBigStep
    ) {
      this.context.moveTo(config.axes.margin - 10, y);
      this.context.lineTo(config.axes.margin + 10, y);
    }
  }

  resize() {
    this.canvas.width = this.canvas.parentElement.getBoundingClientRect().width;
    this.canvas.height =
      document.getElementById("footer").getBoundingClientRect().top -
      document.getElementById("header").getBoundingClientRect().bottom;
    this.drawAll();
  }

  update(frequency, volume, percentComplete) {
    this.drawDot(frequency, volume);
    this.updateStatus(percentComplete);
  }

  updateStatus(percentComplete) {
    document.getElementById("progress-bar-status").style.width =
      percentComplete * 100 + "%";
  }
}
