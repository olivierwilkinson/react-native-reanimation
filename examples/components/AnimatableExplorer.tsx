import React, { useState } from "react";
import styled from "styled-components/native";
import Animated from "react-native-reanimated";
import { useAnimatable, AnimationDefinition, Animations } from "react-native-reanimation";
import { TouchableOpacity, Text } from "react-native";

import PickerActionSheet from "./PickerActionSheet";

const AnimationKeys = Object.keys(Animations);

const ContainerView = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  height: 100%;
`;

const AnimatedSquare = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: black;
`;

export default () => {
  const [animationSelectActive, setAnimationSelectActive] = useState(false);
  const [animation, setAnimation] = useState<AnimationDefinition>(
    Animations.bounce
  );
  const [animationStyle] = useAnimatable(animation, {
    iterationCount: "infinite",
  });

  return (
    <>
      <ContainerView>
        <TouchableOpacity onPress={() => setAnimationSelectActive(true)}>
          <Text>Choose Animation</Text>
        </TouchableOpacity>

        <AnimatedSquare />
      </ContainerView>

      <PickerActionSheet
        visible={animationSelectActive}
        onCancel={() => setAnimationSelectActive(false)}
        onDone={(newAnimation) => {
          // @ts-ignore
          setAnimation(Animations[newAnimation]);
          setAnimationSelectActive(false);
        }}
        options={AnimationKeys}
      />
    </>
  );
};
