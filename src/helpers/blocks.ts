import Animated, {
  block,
  debug,
} from "react-native-reanimated";

import {
  Animation,
  AnimateBlocks,
  AnimateBlock,
  AnimateBlockParams,
} from "../types";

export function evalBlock<T extends Animation>(
  params: AnimateBlockParams<T>,
  name: string,
  animateBlock?: AnimateBlock<T>,
  debugNode?: Animated.Node<any>
) {
  if (!animateBlock) {
    return block([]);
  }

  if (debugNode) {
    return block([debug(name, debugNode), animateBlock(params)]);
  }

  return animateBlock(params);
}

export function makeDefaultBlocks<T extends Animation>(): AnimateBlocks<T> {
  return {
    start: (params) => evalBlock(params, "start"),
    before: (params) => evalBlock(params, "before"),
    after: (params) => evalBlock(params, "after"),
    afterIteration: (params) => evalBlock(params, "afterIteration"),
    finished: (params) => evalBlock(params, "finished"),
  };
}
