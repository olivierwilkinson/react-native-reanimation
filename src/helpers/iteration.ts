import Animated, { or, lessThan, eq } from "react-native-reanimated";

export const evaluateIterationCount = (iterationCount: number | "infinite") =>
  iterationCount === "infinite" ? -1 : iterationCount;

export const isInfinite = (iterationCount: number) => eq(iterationCount, -1);

export const continueIterating = (
  iteration: Animated.Node<number>,
  iterationCount: number
) => or(isInfinite(iterationCount), lessThan(iteration, iterationCount));
