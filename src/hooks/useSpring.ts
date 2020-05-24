import { useRef } from "react";
import Animated, {
  Clock,
  Value,
  block,
  cond,
  clockRunning,
  startClock,
  set,
  not,
  and,
  add,
  stopClock,
  spring,
} from "react-native-reanimated";

import { UseSpringParams, AnimationValues, SpringAnimation } from "../types";
import { continueIterating, isInfinite } from "../helpers/iteration";
import { makeDefaultBlocks } from "../helpers/blocks";
import { evaluateIterationCount } from "../helpers/iteration";

const defaultConfig: {
  stiffness: number;
  mass: number;
  damping: number;
  overshootClamping: boolean | number;
  restSpeedThreshold: number;
  restDisplacementThreshold: number;
  toValue: number;
} = {
  stiffness: 100,
  mass: 1,
  damping: 10,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
  toValue: 0,
};

export default function useSpring({
  position = 0,
  velocity = 0,
  clock: initialClock = new Clock(),
  iterationCount: initialIterationCount = 1,
  blocks: initialBlocks,
  ...customConfig
}: UseSpringParams = {}): [
  Animated.Node<number>,
  (params?: UseSpringParams) => void,
  AnimationValues<SpringAnimation>
] {
  const iterationCount = evaluateIterationCount(initialIterationCount);
  const initialConfig = {
    ...customConfig,
    ...defaultConfig,
  };

  const { current } = useRef({
    clock: initialClock,
    iteration: new Value(0),
    state: {
      finished: new Value(0),
      position: new Value(position),
      time: new Value(0),
      velocity: new Value(velocity),
    },
    config: {
      toValue: new Value(initialConfig.toValue),
      stiffness: new Value(initialConfig.stiffness),
      mass: new Value(initialConfig.mass),
      damping: new Value(initialConfig.damping),
      overshootClamping: new Value(+initialConfig.overshootClamping), // coerce into number value
      restSpeedThreshold: new Value(initialConfig.restSpeedThreshold),
      restDisplacementThreshold: new Value(
        initialConfig.restDisplacementThreshold
      ),
    },
  });

  const { clock, iteration, state, config } = current;
  const { start, before, after, afterIteration, finished } = {
    ...makeDefaultBlocks(),
    ...initialBlocks,
  };

  return [
    block([
      cond(
        and(
          not(clockRunning(clock)),
          continueIterating(iteration, iterationCount)
        ),
        [start(current), startClock(clock)],
        [
          before(current),
          spring(clock, state, config),
          after(current),
          cond(state.finished, [
            set(state.finished, 0),
            set(state.time, 0),
            afterIteration(current),
            cond(
              not(isInfinite(iterationCount)),
              set(iteration, add(iteration, 1))
            ),
            cond(
              continueIterating(iteration, iterationCount),
              set(state.position, 0),
              [finished(current), set(iteration, 0), stopClock(clock)]
            ),
          ]),
        ]
      ),
      state.position,
    ]),
    (next) => {
      state.velocity.setValue(next?.velocity || velocity);
      state.position.setValue(next?.position || position);
      config.toValue.setValue(next?.toValue || initialConfig.toValue);
      config.stiffness.setValue(next?.stiffness || initialConfig.stiffness);
      config.mass.setValue(next?.mass || initialConfig.mass);
      config.damping.setValue(next?.damping || initialConfig.damping);
      config.overshootClamping.setValue(
        +(next?.overshootClamping || initialConfig.overshootClamping)
      );
      config.restSpeedThreshold.setValue(
        next?.restSpeedThreshold || initialConfig.restSpeedThreshold
      );
      config.restDisplacementThreshold.setValue(
        next?.restDisplacementThreshold ||
          initialConfig.restDisplacementThreshold
      );
    },
    {
      ...state,
      ...config,
    },
  ];
}
