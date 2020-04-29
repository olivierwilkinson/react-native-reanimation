import { Value } from "react-native-reanimated";

import {
  Animation,
  TimingAnimation,
  SpringAnimation,
  DecayAnimation,
} from "../types";

export function makeDefaultState(): Animation["state"] {
  return Object.assign(
    makeSpringDefaultState(),
    makeTimingDefaultState(),
    makeDecayDefaultState()
  );
}

export function makeSpringDefaultState(): SpringAnimation["state"] {
  return {
    finished: new Value(0),
    time: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
  };
}

export function makeTimingDefaultState(): TimingAnimation["state"] {
  return {
    finished: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
  };
}

export function makeDecayDefaultState(): DecayAnimation["state"] {
  return {
    finished: new Value(0),
    time: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
  };
}
