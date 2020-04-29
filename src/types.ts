import Animated from "react-native-reanimated";
import { ViewStyle } from 'react-native';

/* Base Animation Types */

export interface TimingAnimation {
  state: Animated.TimingState;
  config: Animated.TimingConfig;
}

export interface SpringAnimation {
  state: Animated.SpringState;
  config: Animated.SpringConfig;
}

export interface DecayAnimation {
  state: Animated.DecayState;
  config: Animated.DecayConfig;
}

export type Animation = SpringAnimation | DecayAnimation | TimingAnimation;

export type UseAnimationState<T extends Animation> = {
  state: T["state"];
  config: T["config"];
  iterationCount: number;
  iteration: Animated.Value<number>;
  clock: Animated.Clock,
};

export type AnimateBlockParams<T extends Animation> = {
  state: Omit<T["state"], 'velocity'> & { velocity: Animated.Value<number> };
  config: Omit<T["config"], 'toValue'> & { toValue: Animated.Value<number> };
  current: UseAnimationState<T>; 
}

export interface AnimateBlock<T extends Animation> {
  (params: AnimateBlockParams<T>): Animated.Node<any>;
}

export interface AnimateBlocks<T extends Animation> {
  start?: AnimateBlock<T>;
  before?: AnimateBlock<T>;
  after?: AnimateBlock<T>;
  afterIteration?: AnimateBlock<T>;
  finished?: AnimateBlock<T>;
}

export interface UseAnimationParams<T extends Animation> {
  animation?: (
    clock: Animated.Clock,
    state: T["state"],
    config: T["config"]
  ) => Animated.Adaptable<number>;
  clock?: Animated.Clock;
  state?: Partial<T["state"]>;
  config?: Partial<T["config"]>;
  iterationCount?: number | "infinite";
  blocks?: AnimateBlocks<T>;
  debug?: (params: AnimateBlockParams<T>) => Animated.Node<any> | undefined;
}

export type SetUseAnimationStateParams<T extends Animation> = Omit<Partial<T>, 'state' | 'config'> & {
  state?: Partial<T["state"]>;
  config?: Partial<T["config"]>;
}

export interface SetUseAnimationState<T extends Animation> {
  (params?: SetUseAnimationStateParams<T>): void;
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

export type AnimationStyle = ViewStyle & {
  transform?: { [transformStyle: string]: Animated.Node<number | string> }[];
};
