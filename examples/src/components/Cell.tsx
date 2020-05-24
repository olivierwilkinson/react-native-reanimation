import React from "react";
import styled from "styled-components/native";

const CellContainer = styled.View`
  position: relative;
  padding: 10px 5px;
  width: 100%;
`;

const Cell = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${({ color }: { color: string }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CellText = styled.Text`
  color: white;
  font-size: 20px;
`;

export type Props = {
  color: string;
  onPress: () => void;
  text: string;
};

export default ({ color, onPress, text }: Props) => (
  <CellContainer>
    <Cell color={color} onPress={onPress}>
      <CellText>{text}</CellText>
    </Cell>
  </CellContainer>
);
