import { AnimatedStyle, UseTimingParams } from "../types";
import { combineAnimatedStyles } from "../helpers/animatable";

type Animatable = [AnimatedStyle, (params: UseTimingParams) => void];

export default function useCombinedAnimation(
  animations: Animatable[]
): Animatable {
  const animationStyles = animations.map((animation) => animation[0]);
  const combinedAnimationStyle = combineAnimatedStyles(animationStyles);

  const setAnimations = animations.map((animation) => animation[1]);
  const combinedSetAnimation = () =>
    setAnimations.forEach((setAnimation) => setAnimation({}));

  return [combinedAnimationStyle, combinedSetAnimation];
}
