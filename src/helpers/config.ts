import { SpringUtils, Easing } from "react-native-reanimated";

import {
  Animation,
  TimingAnimation,
  SpringAnimation,
  DecayAnimation,
} from "../types";

export function makeDefaultConfig(): Animation["config"] {
  return Object.assign(
    makeSpringDefaultConfig(),
    makeTimingDefaultConfig(),
    makeDecayDefaultConfig()
  );
}

export function makeSpringDefaultConfig(): SpringAnimation["config"] {
  return SpringUtils.makeDefaultConfig();
}

export function makeTimingDefaultConfig(): TimingAnimation["config"] {
  return {
    toValue: 1,
    duration: 500,
    easing: Easing.linear,
  };
}

export function makeDecayDefaultConfig(): DecayAnimation["config"] {
  return { deceleration: 0.98 };
}
