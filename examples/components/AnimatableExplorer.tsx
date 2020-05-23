import React, { useState } from "react";
import styled from "styled-components/native";
import Animated from "react-native-reanimated";
import {
  useAnimatable,
  AnimationDefinition,
  Animations,
} from "react-native-reanimation";
import { TouchableOpacity } from "react-native";

import Cell from "./Cell";
import PickerActionSheet from "./PickerActionSheet";

const AnimationKeys = Object.keys(Animations);

const ContainerView = styled.View`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 100%;
`;

const SquareContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
`;

const Square = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: black;
`;

export default () => {
  const [animationSelectActive, setAnimationSelectActive] = useState(false);
  const [iterationSelectActive, setIterationSelectActive] = useState(false);
  const [animation, setAnimation] = useState<AnimationDefinition>(
    Animations.bounce
  );
  const [iterationCount, setIterationCount] = useState<number | "infinite">(
    "infinite"
  );
  const [animationStyle, animate] = useAnimatable(animation, {
    iterationCount,
  });

  return (
    <>
      <ContainerView>
        <Cell
          color="rgb(100,100,100)"
          text="Choose Animation"
          onPress={() => setAnimationSelectActive(true)}
        />

        <Cell
          color="rgb(100,100,100)"
          text="Choose Iteration Count"
          onPress={() => setIterationSelectActive(true)}
        />

        <SquareContainer>
          <Animated.View style={animationStyle}>
            <TouchableOpacity onPress={() => animate()}>
              <Square />
            </TouchableOpacity>
          </Animated.View>
        </SquareContainer>
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

      <PickerActionSheet
        visible={iterationSelectActive}
        onCancel={() => setIterationSelectActive(false)}
        onDone={(newIterationCount) => {
          if (newIterationCount === "infinite") {
            setIterationCount(newIterationCount);
          } else {
            setIterationCount(+newIterationCount);
          }

          setIterationSelectActive(false);
        }}
        options={["infinite", "1", "2"]}
      />
    </>
  );
};
