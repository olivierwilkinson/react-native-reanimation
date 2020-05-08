// @ts-ignore
import Animated from 'react-native-reanimated';

import * as attentionSeekers from "./attention-seekers";
import * as bouncingEntrances from "./bouncing-entrances";
import * as bouncingExits from "./bouncing-exits";
import * as fadingEntrances from "./fading-entrances";
import * as fadingExits from "./fading-exits";
import * as flippers from "./flippers";
import * as lightspeed from "./lightspeed";
import * as slidingEntrances from "./sliding-entrances";
import * as slidingExits from "./sliding-exits";
import * as zoomingEntrances from "./zooming-entrances";
import * as zoomingExits from "./zooming-exits";

const Animations = {
  ...attentionSeekers,
  ...bouncingEntrances,
  ...bouncingExits,
  ...fadingEntrances,
  ...fadingExits,
  ...flippers,
  ...lightspeed,
  ...slidingEntrances,
  ...slidingExits,
  ...zoomingEntrances,
  ...zoomingExits
};

export { Animations };
