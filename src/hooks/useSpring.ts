import Animated, { block, set, spring } from "react-native-reanimated";

import useAnimation from "./useAnimation";
import {
  SpringAnimation,
  UseAnimationParams,
  AnimateBlockParams,
  SetUseAnimationState,
} from "../types";

export default function useSpring(
  params: UseAnimationParams<SpringAnimation> = {}
): [Animated.Node<number>, SetUseAnimationState<SpringAnimation>] {
  return useAnimation<SpringAnimation>({
    animation: spring,
    ...params,
    blocks: {
      ...params.blocks,
      start: ({
        config,
        state,
        current,
      }: AnimateBlockParams<SpringAnimation>) =>
        block([
          set(config.toValue, current.config.toValue),
          set(state.velocity, current.state.velocity),
        ]),
    },
  });
}
