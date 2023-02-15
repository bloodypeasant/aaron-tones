const SHUFFLE = 10_000;

const testResults = {
  isRunning: false,
  toneIndex: undefined,
  tones: undefined,
  volIndex: undefined,
  volStep: undefined,
  volumes: undefined,
};
const userSettings = {
  minFrequency: undefined,
  minVolume: undefined,
  maxFrequency: undefined,
  maxVolume: undefined,
  startDelay: undefined,
  betweenDelay: undefined,
  duration: undefined,
  numberTones: undefined,
  numberVolumes: undefined,
};

let audioCtx = undefined;
let oscillator = undefined;

function beep(frequency, duration, volume) {
  return new Promise((resolve) => {
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
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

function finishTesting() {
  console.log("finish testing");
  testResults.isRunning = false;
}

function getRandom(min, max) {
  return min + (max - min) * Math.random();
}

function generateTones() {
  const minPower = Math.log10(0.5 * userSettings.minFrequency);
  const maxPower = Math.log10(0.5 * userSettings.maxFrequency);
  // console.log(minPower, maxPower);
  const stepPower = (maxPower - minPower) / (userSettings.numberTones - 1);
  testResults.tones = [];
  if (userSettings.numberTones === 0) return;
  if (userSettings.numberTones === 1) {
    testResults.tones.push(
      (userSettings.maxFrequency - userSettings.minFrequency) / 2
    );
    return;
  }
  // const step =
  //   (userSettings.maxFrequency - userSettings.minFrequency) /
  //   (userSettings.numberTones - 1);
  for (let i = 0; i < userSettings.numberTones; ++i) {
    // testResults.tones.push(userSettings.minFrequency + i * step);
    testResults.tones.push(2 * Math.pow(10, minPower + i * stepPower));
  }
  // console.log(testResults.tones);
}

function generateVolumes() {
  testResults.volumes = Array(testResults.tones.length).fill(-1);
}

function shuffleTones() {
  for (let i = 0; i < SHUFFLE; ++i) {
    const a = Math.floor(testResults.tones.length * Math.random());
    const b = Math.floor(testResults.tones.length * Math.random());
    const toneA = testResults.tones[a];
    testResults.tones[a] = testResults.tones[b];
    testResults.tones[b] = toneA;
  }
}

function pause() {
  console.log("pause()");
}

function recordResponse() {
  if (!testResults.isRunning) return;
  testResults.volumes[testResults.toneIndex] = Math.round(
    testResults.volIndex * testResults.volStep
  );
  updateView(
    testResults.tones[testResults.toneIndex],
    testResults.volumes[testResults.toneIndex]
  );
  testResults.volIndex = -1;
  ++testResults.toneIndex;
}

function runFullTest() {
  testResults.isRunning = true;
  testResults.toneIndex = 0;
  testResults.volIndex = -1;
  testResults.volStep =
    userSettings.numberVolumes < 2
      ? 100
      : (userSettings.maxVolume - userSettings.minVolume) /
        (userSettings.numberVolumes - 1);
  if (
    testResults.toneIndex < userSettings.numberTones &&
    testResults.volIndex < userSettings.numberVolumes
  ) {
    runSubTest();
  } else {
    // TODO: settings don't allow a test
  }
}

function runSubTest() {
  ++testResults.volIndex;
  if (testResults.volIndex >= userSettings.numberVolumes) {
    testResults.volIndex = 0;
    ++testResults.toneIndex;
    if (testResults.toneIndex >= userSettings.numberTones) {
      finishTesting();
      return;
    }
  }
  beep(
    testResults.tones[testResults.toneIndex],
    userSettings.duration,
    userSettings.minVolume + testResults.volIndex * testResults.volStep
  ).then(() => {
    setTimeout(() => {
      if (testResults.toneIndex < userSettings.numberTones) {
        runSubTest();
      }
    }, userSettings.betweenDelay * 1000);
  });
}

function start() {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  generateTones();
  shuffleTones();
  generateVolumes();
  setTimeout(runFullTest, userSettings.startDelay * 1000);
}

function stop() {
  console.log("stop()");
}
