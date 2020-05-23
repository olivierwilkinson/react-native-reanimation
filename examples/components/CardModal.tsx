import React, { ReactNode } from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";

const ContentView = styled.View`
  height: 100%;
  width: 100%;
  background: white;
  border-radius: 40px;
  margin-top: 100px;
`;

const TitleView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: rgb(100, 100, 100);
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const TitleText = styled.Text`
  font-size: 20px;
  color: white;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  padding: 5px 0;
  color: white;
`;

const CloseTouchableHighlight = styled.TouchableHighlight`
  position: absolute;
  right: 14px;
`;

export type Props = {
  title: string;
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default ({ visible, title, onClose, children }: Props) => (
  <Modal
    isVisible={visible}
    presentationStyle="overFullScreen"
    swipeDirection="down"
    onSwipeComplete={onClose}
    style={{ margin: 0 }}
  >
    <ContentView testID="play-settings">
      <TitleView>
        <TitleText>{title}</TitleText>

        <CloseTouchableHighlight
          testID="card-modal-close-button"
          onPress={onClose}
        >
          <HeaderText>Close</HeaderText>
        </CloseTouchableHighlight>
      </TitleView>

      {children}
    </ContentView>
  </Modal>
);
