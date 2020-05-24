import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

import Cell from "./src/components/Cell";
import CardModal from "./src/components/CardModal";
import AnimatedStyleExplorer from "./src/components/AnimatedStyleExplorer";
import SpringExplorer from "./src/components/SpringExplorer";
import DecayExplorer from "./src/components/DecayExplorer";
import TimingExplorer from "./src/components/TimingExporer";

export default () => {
  const [animatableModalActive, setAnimatableModalActive] = useState(false);
  const [springModalActive, setSpringModalActive] = useState(false);
  const [decayModalActive, setDecayModalActive] = useState(false);
  const [timingModalActive, setTimingModalActive] = useState(false);

  return (
    <SafeAreaView>
      <Cell
        color="rgb(100,100,100)"
        onPress={() => setAnimatableModalActive(true)}
        text="Animated Style"
      />
      <Cell
        color="rgb(100,100,100)"
        onPress={() => setSpringModalActive(true)}
        text="Spring"
      />
      <Cell
        color="rgb(100,100,100)"
        onPress={() => setDecayModalActive(true)}
        text="Decay"
      />
      <Cell
        color="rgb(100,100,100)"
        onPress={() => setTimingModalActive(true)}
        text="Timing"
      />

      <CardModal
        title="Animated Style"
        visible={animatableModalActive}
        onClose={() => setAnimatableModalActive(false)}
      >
        <AnimatedStyleExplorer />
      </CardModal>

      <CardModal
        title="Spring"
        visible={springModalActive}
        onClose={() => setSpringModalActive(false)}
      >
        <SpringExplorer />
      </CardModal>

      <CardModal
        title="Decay"
        visible={decayModalActive}
        onClose={() => setDecayModalActive(false)}
      >
        <DecayExplorer />
      </CardModal>

      <CardModal
        title="Timing"
        visible={timingModalActive}
        onClose={() => setTimingModalActive(false)}
      >
        <TimingExplorer />
      </CardModal>
    </SafeAreaView>
  );
};
