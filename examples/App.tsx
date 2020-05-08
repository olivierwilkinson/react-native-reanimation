import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, Modal } from "react-native";

import CardModal from "./components/CardModal";
import AnimatableExplorer from "./components/AnimatableExplorer";

export default () => {
  const [animatableModalActive, setAnimatableModalActive] = useState(false);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => setAnimatableModalActive(true)}>
        <Text>Animatable</Text>
      </TouchableOpacity>

      <CardModal
        title="Animatable Explorer"
        visible={animatableModalActive}
        onClose={() => setAnimatableModalActive(false)}
      >
        <AnimatableExplorer />
      </CardModal>
    </SafeAreaView>
  );
};
