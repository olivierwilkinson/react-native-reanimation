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
  EasingNode,
  timing,
} from "react-native-reanimated";

import { UseTimingParams, TimingAnimation, AnimationValues } from "../types";
import { continueIterating, isInfinite } from "../helpers/iteration";
import { makeDefaultBlocks } from "../helpers/blocks";
import { evaluateIterationCount } from "../helpers/iteration";

export default function useTiming({
  position = 0,
  toValue = 1,
  duration = 500,
  easing = EasingNode.linear,
  iterationCount: initialIterationCount = 1,
  clock: initialClock = new Clock(),
  blocks: initialBlocks,
}: UseTimingParams = {}): [
  Animated.Node<number>,
  (params?: UseTimingParams) => void,
  AnimationValues<TimingAnimation>
] {
  const iterationCount = evaluateIterationCount(initialIterationCount);
  const { current } = useRef({
    clock: initialClock,
    iteration: new Value(0),
    state: {
      position: new Value(position),
      time: new Value(0),
      frameTime: new Value(0),
      finished: new Value(0),
    },
    config: {
      toValue: new Value(toValue),
      duration: new Value(duration),
      easing,
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
          timing(clock, state, config),
          after(current),
          cond(state.finished, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.frameTime, 0),
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
      state.frameTime.setValue(0);
      state.position.setValue(next?.position || position);
      config.toValue.setValue(next?.toValue || toValue);
      config.duration.setValue(next?.duration || duration);
    },
    {
      ...state,
      ...config
    },
  ];
}
