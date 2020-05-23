import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

import Cell from "./components/Cell";
import CardModal from "./components/CardModal";
import AnimatableExplorer from "./components/AnimatableExplorer";
import SpringExplorer from "./components/SpringExplorer";
import DecayExplorer from "./components/DecayExplorer";
import TimingExplorer from "./components/TimingExporer";

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
        text="Animatable"
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
        title="Animatable"
        visible={animatableModalActive}
        onClose={() => setAnimatableModalActive(false)}
      >
        <AnimatableExplorer />
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
