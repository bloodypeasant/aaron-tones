class Model {
  constructor(app) {
    this.app = app;
    this.context = undefined;
    this.frequency = {
      max: config.frequency.defaultMax,
      min: config.frequency.defaultMin,
      num: config.frequency.defaultNum,
    };
    this.testResults = {
      isRunning: false,
      toneIndex: undefined,
      tones: undefined,
      volIndex: undefined,
      volStep: undefined,
      volumes: undefined,
    };
    this.timing = {
      initial: config.timing.defaultInitial,
      rampup: config.timing.defaultRampup,
      plateau: config.timing.defaultPlateau,
      rampdown: config.timing.defaultRampdown,
      separating: config.timing.defaultSeparating,
    };
    this.volume = {
      max: config.volume.defaultMax,
      min: config.volume.defaultMin,
      num: config.volume.defaultNum,
    };
  }

  beep(frequency, duration, volume) {
    const that = this;
    return new Promise((resolve) => {
      const oscillator = that.context.createOscillator();
      const gain = that.context.createGain();
      oscillator.connect(gain);
      gain.connect(that.context.destination);

      const now = that.context.currentTime;
      gain.gain.setValueAtTime(volume / 1000, now);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + duration);
      oscillator.frequency.value = frequency;
      oscillator.start(now);
      setTimeout(() => {
        oscillator.stop();
        resolve();
      }, duration * 1000);
    });
  }

  // RUN-TIME OPERATIONS

  finishTesting() {
    console.log("finish testing"); // TODO
    this.testResults.isRunning = false;
  }

  generateTones() {
    const minPower = this.freqToExponent(this.frequency.min);
    const maxPower = this.freqToExponent(this.frequency.max);
    const stepPower = (maxPower - minPower) / (this.frequency.num - 1);
    this.testResults.tones = [];
    if (this.frequency.num === 0) return;
    if (this.frequency.num === 1) {
      this.testResults.tones.push(
        (this.frequency.max - this.frequency.min) / 2
      );
      return;
    }
    for (let i = 0; i < this.frequency.num; ++i) {
      this.testResults.tones.push(
        this.expToFrequency(minPower + i * stepPower)
      );
    }
  }

  generateVolumes() {
    this.testResults.volumes = Array(this.testResults.tones.length).fill(-1);
  }

  pause() {
    console.log("pause()"); // TODO
  }

  recordResponse() {
    if (!this.testResults.isRunning) return;
    this.testResults.volumes[this.testResults.toneIndex] = Math.round(
      this.testResults.volIndex * this.testResults.volStep
    );
    this.app.view.update(
      this.testResults.tones[this.testResults.toneIndex],
      this.testResults.volumes[this.testResults.toneIndex],
      (this.testResults.toneIndex + 1) / this.frequency.num
    );
    this.testResults.volIndex = -1;
    ++this.testResults.toneIndex;
  }

  runFullTest() {
    this.testResults.isRunning = true;
    this.testResults.toneIndex = 0;
    this.testResults.volIndex = -1;
    this.testResults.volStep =
      this.volume.num < 2
        ? 100
        : (this.volume.max - this.volume.min) / (this.volume.num - 1);
    if (
      this.testResults.toneIndex < this.frequency.num &&
      this.testResults.volIndex < this.volume.num
    ) {
      this.runSubTest();
    } else {
      // TODO: settings don't allow a test
    }
  }

  runSubTest() {
    ++this.testResults.volIndex;
    if (this.testResults.volIndex >= this.volume.num) {
      this.testResults.volIndex = 0;
      ++this.testResults.toneIndex;
      if (this.testResults.toneIndex >= this.frequency.num) {
        this.finishTesting();
        return;
      }
    }
    this.beep(
      this.testResults.tones[this.testResults.toneIndex],
      this.timing.plateau,
      this.volume.min + this.testResults.volIndex * this.testResults.volStep
    ).then(() => {
      setTimeout(() => {
        if (this.testResults.toneIndex < this.frequency.num) {
          this.runSubTest();
        }
      }, this.timing.separating * 1000);
    });
  }

  shuffleTones() {
    for (let i = 0; i < config.shuffle; ++i) {
      const a = Math.floor(this.testResults.tones.length * Math.random());
      const b = Math.floor(this.testResults.tones.length * Math.random());
      const toneA = this.testResults.tones[a];
      this.testResults.tones[a] = this.testResults.tones[b];
      this.testResults.tones[b] = toneA;
    }
  }

  start() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.generateTones();
    this.shuffleTones();
    this.generateVolumes();
    setTimeout(this.runFullTest.bind(this), this.timing.initial * 1000);
  }

  stop() {
    console.log("stop()"); // TODO
  }

  // SUPPORTING UTILITIES

  // Convert exponent between 1 and 4 (inclusively) to corresponding frequency.
  expToFrequency(exp) {
    return 2 * Math.pow(10, exp);
  }

  // Convert frequency b/w 20 and 20,000 Hz to corresponding exponent.
  freqToExponent(freq) {
    return Math.log10(0.5 * freq);
  }

  // FREQUENCY SETTERS

  setMaxFrequency(exp) {
    this.frequency.max = this.expToFrequency(exp);
  }
  setMinFrequency(exp) {
    this.frequency.min = this.expToFrequency(exp);
  }
  setNumFrequency(num) {
    this.frequency.num = num;
  }

  // TIMING SETTERS

  setInitialTiming(time) {
    this.timing.initial = time;
  }
  setRampupTiming(time) {
    this.timing.rampup = time;
  }
  setPlateauTiming(time) {
    this.timing.plateau = time;
  }
  setRampdownTiming(time) {
    this.timing.rampdown = time;
  }
  setSeparatingTiming(time) {
    this.timing.separating = time;
  }

  // VOLUME SETTERS

  setMaxVolume(volume) {
    this.volume.max = volume;
  }
  setMinVolume(volume) {
    this.volume.min = volume;
  }
  setNumVolume(num) {
    this.volume.num = num;
  }
}
