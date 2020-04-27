import Animated, {
  Value,
  or,
  lessThan,
  eq,
  SpringUtils,
  Easing,
  block,
  debug,
} from "react-native-reanimated";

import {
  Animation,
  TimingAnimation,
  SpringAnimation,
  DecayAnimation,
  AnimateBlocks,
  AnimateBlock,
  AnimateBlockParams,
} from "./types";

/* Iteration */

export const evaluateIterationCount = (iterationCount: number | "infinite") =>
  iterationCount === "infinite" ? -1 : iterationCount;

export const isInfinite = (iterationCount: number) => eq(iterationCount, -1);

export const continueIterating = (
  iteration: Animated.Node<number>,
  iterationCount: number
) => or(isInfinite(iterationCount), lessThan(iteration, iterationCount));

/* States */

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

/* Configs */

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

/* Blocks */

export function evalBlock<T extends Animation>(
  params: AnimateBlockParams<T>,
  name: string,
  animateBlock?: AnimateBlock<T>,
  debugNode?: Animated.Node<any>
) {
  if (!animateBlock) {
    return block([]);
  }

  if (debugNode) {
    return block([debug(name, debugNode), animateBlock(params)]);
  }

  return animateBlock(params);
}

export function makeDefaultBlocks<T extends Animation>(): AnimateBlocks<T> {
  return {
    start: (params) => evalBlock(params, "start"),
    before: (params) => evalBlock(params, "before"),
    after: (params) => evalBlock(params, "after"),
    afterIteration: (params) => evalBlock(params, "afterIteration"),
    finished: (params) => evalBlock(params, "finished"),
  };
}
