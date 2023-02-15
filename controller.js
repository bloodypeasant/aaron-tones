class Controller {
  constructor(app) {
    this.app = app;
    this.keyIsDown = false;
    this.initializeAllListeners();
    this.initializeAllDefaultValues();
  }

  // RESPONSE HANDLERS

  handleKeyDownResponse(e) {
    e.preventDefault();
    if (!this.keyIsDown) this.app.model.recordResponse();
    this.keyIsDown = true;
  }

  handleKeyUpResponse(e) {
    e.preventDefault();
    this.keyIsDown = false;
  }

  handleMouseDownResponse(e) {
    e.preventDefault();
    this.app.model.recordResponse();
  }

  // TESTING HANDLERS

  handlePlayTestClick() {
    this.app.model.start();
  }
  handlePauseTestClick() {
    alert("TO DO:  Pausing"); // TODO
  }
  handleStopTestClick() {
    alert("TO DO:  Stopping"); // TODO
  }
  handleResetTestClick() {
    location.reload();
  }

  // FREQUENCY HANDLERS

  handleMaximumFrequencyInput(e) {
    this.app.model.setMaxFrequency(Number(e.target.value));
    document.getElementById("maximum-frequency-value").innerHTML =
      Math.round(10 * this.app.model.frequency.max) / 10 + " Hz";
  }
  handleMinimumFrequencyInput(e) {
    this.app.model.setMinFrequency(Number(e.target.value));
    document.getElementById("minimum-frequency-value").innerHTML =
      Math.round(10 * this.app.model.frequency.min) / 10 + " Hz";
  }
  handleNumberFrequencyInput(e) {
    this.app.model.setNumFrequency(Number(e.target.value));
    document.getElementById("number-frequency-value").innerHTML =
      this.app.model.frequency.num + " test tones";
  }

  // VOLUME HANDLERS

  handleMaximumVolumeInput(e) {
    this.app.model.setMaxVolume(Number(e.target.value));
    document.getElementById("maximum-volume-value").innerHTML =
      this.app.model.volume.max + "%";
  }
  handleMinimumVolumeInput(e) {
    this.app.model.setMinVolume(Number(e.target.value));
    document.getElementById("minimum-volume-value").innerHTML =
      this.app.model.volume.min + "%";
  }
  handleNumberVolumeInput(e) {
    this.app.model.setNumVolume(Number(e.target.value));
    document.getElementById("number-volume-value").innerHTML =
      this.app.model.volume.num + " test volumes";
  }

  // TIMING HANDLERS

  handleInitialTimingInput(e) {
    this.app.model.setInitialTiming(Number(e.target.value));
    document.getElementById("initial-timing-value").innerHTML =
      this.app.model.timing.initial + " sec";
  }
  handleRampupTimingInput(e) {
    this.app.model.setRampupTiming(Number(e.target.value));
    document.getElementById("rampup-timing-value").innerHTML =
      this.app.model.timing.rampup + " sec";
  }
  handlePlateauTimingInput(e) {
    this.app.model.setPlateauTiming(Number(e.target.value));
    document.getElementById("plateau-timing-value").innerHTML =
      this.app.model.timing.plateau + " sec";
  }
  handleRampdownTimingInput(e) {
    this.app.model.setRampdownTiming(Number(e.target.value));
    document.getElementById("rampdown-timing-value").innerHTML =
      this.app.model.timing.rampdown + " sec";
  }
  handleSeparatingTimingInput(e) {
    this.app.model.setSeparatingTiming(Number(e.target.value));
    document.getElementById("separating-timing-value").innerHTML =
      this.app.model.timing.separating + " sec";
  }

  initializeAllDefaultValues() {
    this.initializeFrequencyValues();
    this.initializeVolumeValues();
    this.initializeTimingValues();
  }

  initializeAllListeners() {
    this.initializeTestingListeners();
    this.initializeFrequencyListeners();
    this.initializeVolumeListeners();
    this.initializeTimingListeners();
    this.initializeResponseListeners();
  }

  initializeFrequencyListeners() {
    document
      .getElementById("minimum-frequency-input")
      .addEventListener("input", this.handleMinimumFrequencyInput.bind(this));
    document
      .getElementById("maximum-frequency-input")
      .addEventListener("input", this.handleMaximumFrequencyInput.bind(this));
    document
      .getElementById("number-frequency-input")
      .addEventListener("input", this.handleNumberFrequencyInput.bind(this));
  }

  initializeFrequencyValues() {
    document.getElementById("minimum-frequency-input").value =
      this.app.model.freqToExponent(this.app.model.frequency.min);
    document.getElementById("minimum-frequency-value").innerHTML =
      this.app.model.frequency.min + " Hz";

    document.getElementById("maximum-frequency-input").value =
      this.app.model.freqToExponent(this.app.model.frequency.max);
    document.getElementById("maximum-frequency-value").innerHTML =
      this.app.model.frequency.max + " Hz";

    document.getElementById("number-frequency-input").value =
      this.app.model.frequency.num;
    document.getElementById("number-frequency-value").innerHTML =
      this.app.model.frequency.num + " test frequencies";
  }

  initializeResponseListeners() {
    addEventListener("keydown", this.handleKeyDownResponse.bind(this));
    addEventListener("keyup", this.handleKeyUpResponse.bind(this));
    document
      .getElementById("canvas")
      .addEventListener("mousedown", this.handleMouseDownResponse.bind(this));
  }

  initializeTestingListeners() {
    // non-collapsable buttons
    document
      .getElementById("play-button")
      .addEventListener("click", this.handlePlayTestClick.bind(this));
    document
      .getElementById("pause-button")
      .addEventListener("click", this.handlePauseTestClick.bind(this));
    document
      .getElementById("stop-button")
      .addEventListener("click", this.handleStopTestClick.bind(this));

    // same controls available through collapsable menu
    document
      .getElementById("play-testing")
      .addEventListener("click", this.handlePlayTestClick.bind(this));
    document
      .getElementById("pause-testing")
      .addEventListener("click", this.handlePauseTestClick.bind(this));
    document
      .getElementById("stop-testing")
      .addEventListener("click", this.handleStopTestClick.bind(this));
    document
      .getElementById("reset-testing")
      .addEventListener("click", this.handleResetTestClick.bind(this));
  }

  initializeTimingListeners() {
    document
      .getElementById("initial-timing-input")
      .addEventListener("input", this.handleInitialTimingInput.bind(this));
    document
      .getElementById("rampup-timing-input")
      .addEventListener("input", this.handleRampupTimingInput.bind(this));
    document
      .getElementById("plateau-timing-input")
      .addEventListener("input", this.handlePlateauTimingInput.bind(this));
    document
      .getElementById("rampdown-timing-input")
      .addEventListener("input", this.handleRampdownTimingInput.bind(this));
    document
      .getElementById("separating-timing-input")
      .addEventListener("input", this.handleSeparatingTimingInput.bind(this));
  }

  initializeTimingValues() {
    document.getElementById("initial-timing-input").value =
      this.app.model.timing.initial;
    document.getElementById("initial-timing-value").innerHTML =
      this.app.model.timing.initial + " sec";

    document.getElementById("rampup-timing-input").value =
      this.app.model.timing.rampup;
    document.getElementById("rampup-timing-value").innerHTML =
      this.app.model.timing.rampup + " sec";

    document.getElementById("plateau-timing-input").value =
      this.app.model.timing.plateau;
    document.getElementById("plateau-timing-value").innerHTML =
      this.app.model.timing.plateau + " sec";

    document.getElementById("rampdown-timing-input").value =
      this.app.model.timing.rampdown;
    document.getElementById("rampdown-timing-value").innerHTML =
      this.app.model.timing.rampdown + " sec";

    document.getElementById("separating-timing-input").value =
      this.app.model.timing.separating;
    document.getElementById("separating-timing-value").innerHTML =
      this.app.model.timing.separating + " sec";
  }

  initializeVolumeListeners() {
    document
      .getElementById("minimum-volume-input")
      .addEventListener("input", this.handleMinimumVolumeInput.bind(this));
    document
      .getElementById("maximum-volume-input")
      .addEventListener("input", this.handleMaximumVolumeInput.bind(this));
    document
      .getElementById("number-volume-input")
      .addEventListener("input", this.handleNumberVolumeInput.bind(this));
  }

  initializeVolumeValues() {
    document.getElementById("minimum-volume-input").value =
      this.app.model.volume.min;
    document.getElementById("minimum-volume-value").innerHTML =
      this.app.model.volume.min + "%";

    document.getElementById("maximum-volume-input").value =
      this.app.model.volume.max;
    document.getElementById("maximum-volume-value").innerHTML =
      this.app.model.volume.max + "%";

    document.getElementById("number-volume-input").value =
      this.app.model.volume.num;
    document.getElementById("number-volume-value").innerHTML =
      this.app.model.volume.num + " test volumes";
  }
}
