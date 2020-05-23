import useTiming from "./useTiming";
import {
  AnimationDefinition,
  AnimationStyle,
  BaseParams,
  UseTimingParams,
  TimingAnimation
} from "../types";
import { createAnimatedStyle } from "../helpers/animatable";

export default function useAnimatable(
  animation: AnimationDefinition,
  params: BaseParams<TimingAnimation>
): [AnimationStyle, (params?: UseTimingParams) => void] {
  const [animationNode, setAnimation] = useTiming({
    easing: animation.easing,
    iterationCount: 1,
    ...params,
  });

  return [createAnimatedStyle(animation, animationNode), setAnimation];
}
