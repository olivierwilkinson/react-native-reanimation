import Animated from "react-native-reanimated";
import { ViewStyle } from "react-native";

/* Base Animation Types */

export interface TimingConfig {
  toValue: Animated.Value<number>;
  duration: Animated.Value<number>;
  easing: Animated.EasingFunction;
}

export interface SpringConfig {
  damping: Animated.Value<number>;
  mass: Animated.Value<number>;
  stiffness: Animated.Value<number>;
  overshootClamping: Animated.Value<number> | Animated.Value<boolean>;
  restSpeedThreshold: Animated.Value<number>;
  restDisplacementThreshold: Animated.Value<number>;
  toValue: Animated.Value<number>;
}

export interface DecayConfig {
  deceleration: Animated.Value<number>;
}

export interface TimingAnimation {
  state: Animated.TimingState;
  config: TimingConfig;
}

export interface SpringAnimation {
  state: Animated.SpringState;
  config: SpringConfig;
}

export interface DecayAnimation {
  state: Animated.DecayState;
  config: DecayConfig;
}

export type Animation = SpringAnimation | DecayAnimation | TimingAnimation;

export type UseAnimationState<T extends Animation> = {
  state: T["state"];
  config: T["config"];
  iteration: Animated.Value<number>;
  clock: Animated.Clock;
};

export interface AnimateBlock<T extends Animation> {
  (params: UseAnimationState<T>): Animated.Node<any>;
}
export interface AnimateBlocks<T extends Animation> {
  start: AnimateBlock<T>;
  before: AnimateBlock<T>;
  after: AnimateBlock<T>;
  afterIteration: AnimateBlock<T>;
  finished: AnimateBlock<T>;
}

export interface BaseParams<T extends Animation> {
  clock?: Animated.Clock;
  iterationCount?: number | "infinite";
  position?: number;
  toValue?: number;
  blocks?: Partial<AnimateBlocks<T>>;
}

export interface UseSpringParams extends BaseParams<SpringAnimation> {
  velocity?: number;
  damping?: number;
  mass?: number;
  stiffness?: number;
  overshootClamping?: number | boolean;
  restSpeedThreshold?: number;
  restDisplacementThreshold?: number;
}

export interface UseDecayParams extends BaseParams<DecayAnimation> {
  velocity?: number;
  deceleration?: number;
}

export interface UseTimingParams extends BaseParams<TimingAnimation> {
  duration?: number;
  easing?: Animated.EasingFunction;
}

/* Animatable Animation Types */
export type AnimationStep = {
  [style: string]: number | string;
};

export type AnimationDefinition = {
  [input: number]: AnimationStep;
  from?: AnimationStep;
  to?: AnimationStep;
  easing?: Animated.EasingFunction;
  style?: {
    [style: string]: any;
  };
};

export type Transform =
  | {
      skewX: Animated.Node<string>;
    }
  | {
      skewY: Animated.Node<string>;
    }
  | {
      rotate: Animated.Node<string>;
    }
  | {
      rotateX: Animated.Node<string>;
    }
  | {
      rotateY: Animated.Node<string>;
    }
  | {
      rotateZ: Animated.Node<string>;
    }
  | {
      perspective: Animated.Node<number>;
    }
  | {
      scale: Animated.Node<number>;
    }
  | {
      scaleX: Animated.Node<number>;
    }
  | {
      scaleY: Animated.Node<number>;
    }
  | {
      translateX: Animated.Node<number>;
    }
  | {
      translateY: Animated.Node<number>;
    };

export type AnimationStyle = ViewStyle & {
  transform?: Transform[];
};
