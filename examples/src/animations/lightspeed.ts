// @ts-ignore
import Animated, { EasingNode } from "react-native-reanimated";

export const lightSpeedIn = {
  easing: EasingNode.out(EasingNode.ease),
  0: {
    opacity: 0,
    translateX: 200,
    skewX: "-30deg"
  },
  0.6: {
    opacity: 1,
    translateX: 0,
    skewX: "20deg"
  },
  0.8: {
    skewX: "-5deg"
  },
  1: {
    opacity: 1,
    translateX: 0,
    skewX: "0deg"
  }
};

export const lightSpeedOut = {
  easing: EasingNode.in(EasingNode.ease),
  0: {
    opacity: 1,
    translateX: 0,
    skewX: "0deg"
  },
  1: {
    opacity: 0,
    translateX: 200,
    skewX: "30deg"
  }
};
