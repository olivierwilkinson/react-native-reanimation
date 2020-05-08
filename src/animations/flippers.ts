// @ts-ignore
import Animated, { Easing } from "react-native-reanimated";

export const flipInX = {
  easing: Easing.in(Easing.ease),
  style: {
    backfaceVisibility: "visible",
    perspective: 400
  },
  0: {
    opacity: 0,
    rotateX: "90deg"
  },
  0.4: {
    rotateX: "-20deg"
  },
  0.6: {
    opacity: 1,
    rotateX: "10deg"
  },
  0.8: {
    rotateX: "-5deg"
  },
  1: {
    opacity: 1,
    rotateX: "0deg"
  }
};

export const flipInY = {
  easing: Easing.in(Easing.ease),
  style: {
    backfaceVisibility: "visible",
    perspective: 400
  },
  0: {
    opacity: 0,
    rotateY: "90deg"
  },
  0.4: {
    rotateY: "-20deg"
  },
  0.6: {
    opacity: 1,
    rotateY: "10deg"
  },
  0.8: {
    rotateY: "-5deg"
  },
  1: {
    opacity: 1,
    rotateY: "0deg"
  }
};

export const flipOutX = {
  style: {
    backfaceVisibility: "visible",
    perspective: 400
  },
  0: {
    opacity: 1,
    rotateX: "0deg"
  },
  0.3: {
    opacity: 1,
    rotateX: "-20deg"
  },
  1: {
    opacity: 0,
    rotateX: "90deg"
  }
};

export const flipOutY = {
  style: {
    backfaceVisibility: "visible",
    perspective: 400
  },
  0: {
    opacity: 1,
    rotateY: "0deg"
  },
  0.3: {
    opacity: 1,
    rotateY: "-20deg"
  },
  1: {
    opacity: 0,
    rotateY: "90deg"
  }
};
