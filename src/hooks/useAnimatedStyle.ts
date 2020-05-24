import useTiming from "./useTiming";
import {
  AnimationDefinition,
  AnimatedStyle,
  BaseParams,
  UseTimingParams,
  TimingAnimation,
  AnimationValues,
} from "../types";
import { createAnimatedStyle } from "../helpers/animatable";

export default function useAnimatedStyle(
  animation: AnimationDefinition,
  params: BaseParams<TimingAnimation>
): [
  AnimatedStyle,
  (params?: UseTimingParams) => void,
  AnimationValues<TimingAnimation>
] {
  const [animationNode, setAnimation, values] = useTiming({
    easing: animation.easing,
    iterationCount: 1,
    ...params,
  });

  return [createAnimatedStyle(animation, animationNode), setAnimation, values];
}
