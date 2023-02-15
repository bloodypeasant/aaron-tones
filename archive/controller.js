let keyIsDown = false;

function handleBetweenDelayInput(event) {
  userSettings.betweenDelay = Number(event.target.value);
  document.getElementById("between-delay-value").innerHTML =
    userSettings.betweenDelay + " sec";
}

function handleDurationInput(event) {
  userSettings.duration = Number(event.target.value);
  document.getElementById("duration-value").innerHTML =
    userSettings.duration + " sec";
}

function handleFreqCountInput(event) {
  userSettings.numberTones = Number(event.target.value);
}

function handleKeyDown(event) {
  event.preventDefault();
  if (!keyIsDown) recordResponse();
  keyIsDown = true;
}

function handleKeyUp(event) {
  event.preventDefault();
  keyIsDown = false;
}

function handleMouseDown(event) {
  event.preventDefault();
  recordResponse();
}

function handleMaxFreqInput(event) {
  userSettings.maxFrequency = 2 * Math.pow(10, Number(event.target.value));
  document.getElementById("max-freq-value").innerHTML =
    Math.round(10 * userSettings.maxFrequency) / 10 + " Hz";
}

function handleMinFreqInput(event) {
  userSettings.minFrequency = 2 * Math.pow(10, Number(event.target.value));
  document.getElementById("min-freq-value").innerHTML =
    Math.round(10 * userSettings.minFrequency) / 10 + " Hz";
}

function handleMaxVolInput(event) {
  userSettings.maxVolume = Number(event.target.value);
  document.getElementById("max-vol-value").innerHTML =
    userSettings.maxVolume + "%";
}

function handleMinVolInput(event) {
  userSettings.minVolume = Number(event.target.value);
  document.getElementById("min-vol-value").innerHTML =
    userSettings.minVolume + "%";
}

function handleResetClick() {
  location.reload();
}

function handleStartClick() {
  initView();

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("mousedown", handleMouseDown);
  start();
}

function handleStartDelayInput(event) {
  userSettings.startDelay = Number(event.target.value);
  document.getElementById("start-delay-value").innerHTML =
    userSettings.startDelay + " sec";
}

function handleVolCountInput(event) {
  userSettings.numberVolumes = Number(event.target.value);
}

function initController() {
  initEventListeners();
  initDefaultValues();
}

function initDefaultValues() {
  document.getElementById("min-freq").dispatchEvent(new InputEvent("input"));
  document.getElementById("max-freq").dispatchEvent(new InputEvent("input"));
  document.getElementById("freq-count").dispatchEvent(new InputEvent("input"));
  document.getElementById("min-vol").dispatchEvent(new InputEvent("input"));
  document.getElementById("max-vol").dispatchEvent(new InputEvent("input"));
  document.getElementById("vol-count").dispatchEvent(new InputEvent("input"));
  document.getElementById("start-delay").dispatchEvent(new InputEvent("input"));
  document.getElementById("duration").dispatchEvent(new InputEvent("input"));
  document
    .getElementById("between-delay")
    .dispatchEvent(new InputEvent("input"));
}

function initEventListeners() {
  document
    .getElementById("min-freq")
    .addEventListener("input", handleMinFreqInput);
  document
    .getElementById("max-freq")
    .addEventListener("input", handleMaxFreqInput);
  document
    .getElementById("freq-count")
    .addEventListener("input", handleFreqCountInput);
  document
    .getElementById("min-vol")
    .addEventListener("input", handleMinVolInput);
  document
    .getElementById("max-vol")
    .addEventListener("input", handleMaxVolInput);
  document
    .getElementById("vol-count")
    .addEventListener("input", handleVolCountInput);
  document
    .getElementById("start-delay")
    .addEventListener("input", handleStartDelayInput);
  document
    .getElementById("between-delay")
    .addEventListener("input", handleBetweenDelayInput);
  document
    .getElementById("duration")
    .addEventListener("input", handleDurationInput);
  document
    .getElementById("reset-button")
    .addEventListener("click", handleResetClick);
  document
    .getElementById("start-button")
    .addEventListener("click", handleStartClick);
  document.getElementById("pause-button").addEventListener("click", pause);
  document.getElementById("stop-button").addEventListener("click", stop);
}
