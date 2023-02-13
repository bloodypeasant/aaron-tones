const AXES_COLOR = "black";
const AXES_THICK = 1;
const AXES_MARGIN = 30;
const POINT_COLOR = "red";
const POINT_RADIUS = 5;

let canvas, context;

function initView() {
  document.getElementById("settings").style.display = "none";
  document.getElementsByTagName("html")[0].style = "width: 100%; height: 100%;";
  document.body.style =
    "width: 100%; height: 100%; margin: 0; overflow: hidden;";
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.style.display = "block";
  onresize = resize;
  resize();
}

function drawAll() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawAxes();
}

function drawAxes() {
  context.strokeStyle = AXES_COLOR;
  context.fillStyle = AXES_COLOR;
  context.lineWidth = AXES_THICK;
  context.font = "12px sans-serif";
  context.textAlign = "center";
  context.beginPath();
  drawAxisLines();
  drawTicksY();
  drawTicksX();
  context.stroke();
  drawLabelsX();
  drawLabelsY();
}

function drawAxisLines() {
  context.moveTo(AXES_MARGIN, 0);
  context.lineTo(AXES_MARGIN, canvas.height - AXES_MARGIN);
  context.lineTo(canvas.width, canvas.height - AXES_MARGIN);
}

function drawLabelsX() {
  const step = (canvas.width - AXES_MARGIN) / 10;
  for (let i = 0; i < 10; ++i) {
    let value = Math.round(2 * Math.pow(10, 1 + i / 3) * 10) / 10;
    context.fillText(value, AXES_MARGIN + i * step, canvas.height - 6);
  }
  context.fillText("(Hz)", canvas.width - 18, canvas.height - 6);
}

function drawLabelsY() {
  const step = (canvas.height - AXES_MARGIN) / 10;
  for (let i = 0; i < 11; ++i) {
    let value = i * 10;
    context.fillText(
      value,
      10,
      canvas.height - AXES_MARGIN - i * step + (i === 10 ? 12 : 4)
    );
  }
  context.fillText("%", 10, canvas.height - AXES_MARGIN - 10 * step + 24);
}

function drawTicksX() {
  const xBigStep = (canvas.width - AXES_MARGIN) / 10;
  const xSmallStep = (canvas.width - AXES_MARGIN) / 100;
  for (let x = AXES_MARGIN + xSmallStep; x <= canvas.width; x += xSmallStep) {
    context.moveTo(x, canvas.height - AXES_MARGIN - 5);
    context.lineTo(x, canvas.height - AXES_MARGIN + 5);
  }
  for (let x = AXES_MARGIN + xBigStep; x <= canvas.width; x += xBigStep) {
    context.moveTo(x, canvas.height - AXES_MARGIN - 10);
    context.lineTo(x, canvas.height - AXES_MARGIN + 10);
  }
}

function drawTicksY() {
  const yBigStep = (canvas.height - AXES_MARGIN) / 10;
  const ySmallStep = (canvas.height - AXES_MARGIN) / 100;
  for (
    let y = canvas.height - AXES_MARGIN - ySmallStep;
    y >= 0;
    y -= ySmallStep
  ) {
    context.moveTo(AXES_MARGIN - 5, y);
    context.lineTo(AXES_MARGIN + 5, y);
  }
  for (let y = canvas.height - AXES_MARGIN - yBigStep; y >= 0; y -= yBigStep) {
    context.moveTo(AXES_MARGIN - 10, y);
    context.lineTo(AXES_MARGIN + 10, y);
  }
}

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  drawAll();
}

function updateView(frequency, volume) {
  const xBigStep = (canvas.width - AXES_MARGIN) / 10;
  const i = 3 * (Math.log10(0.5 * frequency) - 1);
  const yBigStep = (canvas.height - AXES_MARGIN) / 10;
  const j = volume / 10;
  // console.log(frequency, volume);
  context.fillStyle = POINT_COLOR;
  context.beginPath();
  context.arc(
    AXES_MARGIN + xBigStep * i,
    canvas.height - AXES_MARGIN - j * yBigStep,
    POINT_RADIUS,
    0,
    2 * Math.PI
  );
  context.fill();
  console.log(frequency, volume);
}
