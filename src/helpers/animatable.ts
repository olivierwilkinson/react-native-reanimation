import Animated, { concat, interpolateNode } from "react-native-reanimated";
import { AnimatedStyle, AnimationDefinition } from "../types";

const TransformStyles = [
  "perspective",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scaleX",
  "scaleY",
  "translateX",
  "translateY",
  "skewX",
  "skewY"
];
const DegreeStyles = [
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skewX",
  "skewY"
];

export const combineAnimatedStyles = (animationStyles: AnimatedStyle[]) =>
  animationStyles.reduce<AnimatedStyle>(
    (accumulatedStyles, animationStyle) => ({
      ...accumulatedStyles,
      ...animationStyle,
      // @ts-ignore
      transform:
        animationStyle.transform === undefined
          ? accumulatedStyles.transform
          : [
              ...(accumulatedStyles.transform
                ? accumulatedStyles.transform
                : []),
              ...animationStyle.transform
            ]
    }),
    {}
  );

export function createAnimatedStyle(
  definition: AnimationDefinition,
  node: Animated.Node<number>
): AnimatedStyle {
  const { style: definitionStyles, easing: _, ...animation } = definition;
  const { from, to } = animation;

  if (from && to) {
    const styles = Object.keys(from);
    const transformStyles = styles.filter(style =>
      TransformStyles.includes(style)
    );

    const animatedStyleEntries = styles.map<
      [string, Animated.Node<number | string>]
    >((style: string) => {
      if (DegreeStyles.includes(style)) {
        return [
          style,
          concat(
            interpolateNode(node, {
              inputRange: [0, 1],
              outputRange: [
                Number(from[style].toString().replace("deg", "")),
                Number(to[style].toString().replace("deg", ""))
              ]
            }),
            "deg"
          )
        ];
      }

      return [
        style,
        interpolateNode(node, {
          inputRange: [0, 1],
          outputRange: [from[style], to[style]] as number[]
        })
      ];
    });

    if (!transformStyles.length) {
      return {
        ...definitionStyles,
        ...Object.fromEntries(animatedStyleEntries)
      };
    }

    const transformEntry = animatedStyleEntries
      .filter(([style]) => TransformStyles.includes(style))
      .reduce<
        ["transform", { [style: string]: Animated.Node<number | string> }[]]
      >(
        (acc, [style, node]) => [
          "transform",
          [
            ...acc[1],
            {
              [style]: node
            }
          ]
        ],
        ["transform", []]
      );

    return {
      ...definitionStyles,
      ...Object.fromEntries([
        transformEntry,
        ...animatedStyleEntries.filter(
          ([style]) => !TransformStyles.includes(style)
        )
      ])
    };
  }

  if (from || to) {
    throw new Error("Animations that use from or to must use both from and to");
  }

  const styles = Object.values(animation).reduce<string[]>(
    (acc, step) => Array.from(new Set([...acc, ...Object.keys(step || {})])),
    []
  );
  const transformStyles = styles.filter(style =>
    TransformStyles.includes(style)
  );

  const inputRange = Object.keys(animation)
    .map(Number)
    .sort();

  const animatedStyleEntries = styles.map<
    [string, Animated.Node<number | string>]
  >((style: string) => {
    let styleInputRange: number[] = [];

    if (DegreeStyles.includes(style)) {
      const outputRange = inputRange.reduce<number[]>((acc, input, i) => {
        const value = animation[input][style];
        if (value || value === 0) {
          styleInputRange = [...styleInputRange, inputRange[i]];

          return [...acc, Number(value.toString().replace("deg", ""))];
        }

        return acc;
      }, []);

      return [
        style,
        concat(
          interpolateNode(node, {
            inputRange: styleInputRange,
            outputRange
          }),
          "deg"
        )
      ];
    }

    const outputRange = inputRange.reduce<number[]>((acc, input, i) => {
      const value = animation[input][style];
      if (value || value === 0) {
        styleInputRange = [...styleInputRange, inputRange[i]];

        return [...acc, +value];
      }

      return acc;
    }, []);

    return [
      style,
      interpolateNode(node, {
        inputRange: styleInputRange,
        outputRange
      })
    ];
  });

  if (!transformStyles.length) {
    return {
      ...definitionStyles,
      ...Object.fromEntries(animatedStyleEntries)
    };
  }

  const transformEntry = animatedStyleEntries
    .filter(([style]) => TransformStyles.includes(style))
    .reduce<
      ["transform", { [style: string]: Animated.Node<number | string> }[]]
    >(
      (acc, [style, node]) => [
        "transform",
        [
          ...acc[1],
          {
            [style]: node
          }
        ]
      ],
      ["transform", []]
    );

  return {
    ...definitionStyles,
    ...Object.fromEntries([
      transformEntry,
      ...animatedStyleEntries.filter(
        ([style]) => !TransformStyles.includes(style)
      )
    ])
  };
}
