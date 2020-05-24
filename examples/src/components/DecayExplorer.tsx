import React from "react";
import styled from "styled-components/native";
import Animated from "react-native-reanimated";
import { useDecay } from "react-native-reanimation";
import { TouchableOpacity } from "react-native";

const ContainerView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 100%;
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
  const [decay, setDecay] = useDecay();

  return (
    <ContainerView>
      <Animated.View style={{ transform: [{ translateY: decay }] }}>
        <TouchableOpacity onPress={() => setDecay({ velocity: 2500 })}>
          <Square />
        </TouchableOpacity>
      </Animated.View>
    </ContainerView>
  );
};
