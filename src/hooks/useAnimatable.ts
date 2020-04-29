import useTiming from "./useTiming";
import {
  UseAnimationParams,
  TimingAnimation,
  SetUseAnimationState,
  AnimationDefinition,
  AnimationStyle
} from "../types";
import { createAnimatedStyle } from "../helpers/animatable";

export default function useAnimatable(
  animation: AnimationDefinition,
  params: UseAnimationParams<TimingAnimation> = {}
): [AnimationStyle, SetUseAnimationState<TimingAnimation>] {
  const [animationNode, setAnimation] = useTiming({
    ...params,
    config: {
      toValue: 1,
      easing: animation.easing,
      ...params.config,
    },
  });

  return [createAnimatedStyle(animation, animationNode), setAnimation];
}
