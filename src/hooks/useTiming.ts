import Animated, { set, timing } from "react-native-reanimated";

import useAnimation from "./useAnimation";
import {
  UseAnimationParams,
  SetUseAnimationState,
  AnimateBlockParams,
  TimingAnimation,
} from "../types";

export default function useTiming(
  params: UseAnimationParams<TimingAnimation> = {}
): [Animated.Node<number>, SetUseAnimationState<TimingAnimation>] {
  return useAnimation<TimingAnimation>({
    animation: timing,
    ...params,
    blocks: {
      ...params.blocks,
      start: ({ config, current }: AnimateBlockParams<TimingAnimation>) =>
        set(config.toValue, current.config.toValue),
    },
  });
}
