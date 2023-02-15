const config = {
  axes: {
    color: "black",
    font: "12px sans-serif",
    margin: 30,
    thickness: 1,
  },
  frequency: {
    defaultMin: 200, // Hz
    defaultMax: 13490.6, // Hz
    defaultNum: 40,
  },
  points: {
    color: "red",
    radius: 5,
  },
  shuffle: 10_000,
  timing: {
    defaultInitial: 0.5, // sec
    defaultRampup: 0.1, // sec
    defaultPlateau: 0.5, // sec
    defaultRampdown: 0.1, // sec
    defaultSeparating: 0.1, // sec
  },
  volume: {
    defaultMin: 0, // percent
    defaultMax: 100, // percent
    defaultNum: 20,
  },
};
