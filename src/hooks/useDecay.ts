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
  decay,
} from "react-native-reanimated";

import { UseDecayParams, AnimationValues, DecayAnimation } from "../types";
import { continueIterating, isInfinite } from "../helpers/iteration";
import { makeDefaultBlocks } from "../helpers/blocks";
import { evaluateIterationCount } from "../helpers/iteration";

export default function useDecay({
  toValue = 1,
  position = 0,
  velocity = 0,
  deceleration = 0.98,
  clock: initialClock = new Clock(),
  iterationCount: initialIterationCount = 1,
  blocks: initialBlocks,
}: UseDecayParams = {}): [
  Animated.Node<number>,
  (params?: UseDecayParams) => void,
  AnimationValues<DecayAnimation>
] {
  const iterationCount = evaluateIterationCount(initialIterationCount);
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
      toValue: new Value(toValue),
      deceleration: new Value(deceleration),
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
          decay(clock, state, config),
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
      config.toValue.setValue(next?.toValue || toValue);
      config.deceleration.setValue(next?.deceleration || deceleration);
    },
    {
      ...state,
      ...config,
    },
  ];
}
