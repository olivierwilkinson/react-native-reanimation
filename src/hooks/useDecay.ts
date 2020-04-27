import Animated, { set, decay } from "react-native-reanimated";

import useAnimation from "./useAnimation";
import {
  DecayAnimation,
  UseAnimationParams,
  SetUseAnimationState,
  AnimateBlockParams,
} from "../types";

export default function useDecay(
  params: UseAnimationParams<DecayAnimation> = {}
): [Animated.Node<number>, SetUseAnimationState<DecayAnimation>] {
  return useAnimation<DecayAnimation>({
    animation: decay,
    ...params,
    blocks: {
      ...params.blocks,
      start: ({ state, current }: AnimateBlockParams<DecayAnimation>) =>
        set(state.velocity, current.state.velocity),
    },
  });
}
