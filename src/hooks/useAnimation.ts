import { useState } from "react";
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
  defined,
} from "react-native-reanimated";
import { pickBy, identity } from "lodash";

import {
  evaluateIterationCount,
  continueIterating,
  isInfinite,
} from "../helpers/iteration";
import { makeDefaultBlocks, evalBlock } from "../helpers/blocks";
import { makeDefaultConfig } from "../helpers/config";
import { makeDefaultState } from '../helpers/state';
import {
  UseAnimationParams,
  UseAnimationState,
  SetUseAnimationState,
  Animation,
  AnimateBlocks,
  AnimateBlock,
} from "../types";

export default function useAnimation<T extends Animation>({
  state: customState = makeDefaultState(),
  config: customConfig = makeDefaultConfig(),
  clock: initialClock = new Clock(),
  iterationCount: initialIterationCount = 1,
  animation = () => block([]),
  blocks: customBlocks = {},
  debug = () => undefined,
}: UseAnimationParams<T> = {}): [
  Animated.Node<number>,
  SetUseAnimationState<T>
] {
  const intialState = {
    ...makeDefaultState(),
    ...pickBy(customState, identity),
  };
  const initialConfig = {
    ...makeDefaultConfig(),
    ...pickBy(customConfig, identity),
  };

  const [current, setCurrent] = useState<UseAnimationState<T>>({
    iterationCount: evaluateIterationCount(initialIterationCount),
    iteration: new Value(0),
    state: intialState,
    config: initialConfig,
    clock: initialClock,
  });

  const { clock, iteration, iterationCount } = current;
  const state = {
    ...current.state,
    velocity: new Value(0),
  };
  const config = {
    ...current.config,
    toValue: new Value(0),
  };

  const blockParams = { current, state, config };
  const evaluate = (name: string, animateBlock?: AnimateBlock<T>) =>
    evalBlock(blockParams, name, animateBlock, debug(blockParams));

  const blocks: AnimateBlocks<T> = {
    ...makeDefaultBlocks<T>(),
    finished: () => set(current.iteration, 0),
    ...pickBy(customBlocks, identity),
  };

  return [
    block([
      cond(
        and(
          not(clockRunning(clock)),
          continueIterating(iteration, iterationCount)
        ),
        [
          // @ts-ignore
          cond(
            defined(current.state.velocity),
            set(state.velocity, current.state.velocity)
          ),
          set(state.position, current.state.position),
          evaluate("start", blocks.start),
          startClock(clock),
        ],
        [
          evaluate("before", blocks.before),
          animation(clock, state, config),
          evaluate("after", blocks.after),
          cond(state.finished, [
            set(state.finished, 0),
            set(state.time, 0),
            // @ts-ignore
            cond(defined(state.frameTime), set(state.frameTime, 0)),
            evaluate("afterIteration", blocks.afterIteration),
            cond(
              not(isInfinite(iterationCount)),
              set(iteration, add(iteration, 1))
            ),
            cond(
              continueIterating(iteration, iterationCount),
              set(state.position, 0),
              [evaluate("finished", blocks.finished), stopClock(clock)]
            ),
          ]),
        ]
      ),
      state.position,
    ]),
    (next) =>
      setCurrent({
        clock: initialClock,
        iterationCount: evaluateIterationCount(initialIterationCount),
        iteration: new Value(0),
        ...next,
        config: {
          ...initialConfig,
          ...(next && next.config),
        },
        state: {
          ...intialState,
          ...(next && next.state),
        },
      }),
  ];
}
