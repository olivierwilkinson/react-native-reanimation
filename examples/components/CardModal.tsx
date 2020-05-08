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
  background: rgb(200, 200, 200);
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  height: 55px;
`;

const TitleText = styled.Text`
  font-weight: 600;
  font-size: 24px;
  color: white;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  color: white;
`;

const CloseTouchableOpacity = styled.TouchableOpacity`
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

        <CloseTouchableOpacity
          testID="card-modal-close-button"
          onPress={onClose}
        >
          <HeaderText>Close</HeaderText>
        </CloseTouchableOpacity>
      </TitleView>

      {children}
    </ContentView>
  </Modal>
);
