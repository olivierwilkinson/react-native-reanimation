import { block } from "react-native-reanimated";

import { AnimateBlocks, Animation } from "../types";

export function makeDefaultBlocks<T extends Animation>(): AnimateBlocks<T> {
  return {
    start: () => block([]),
    before: () => block([]),
    after: () => block([]),
    afterIteration: () => block([]),
    finished: () => block([]),
  };
}
