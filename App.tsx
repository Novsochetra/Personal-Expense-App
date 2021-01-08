import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  AMOUNT_BARITEM,
  BarItem,
  EBarItem,
} from "./src/common/bar-chart/BarItem";
import BarChart from "./src/common/bar-chart";
import { dummiesBarChartData } from "./src/common/bar-chart/dummies";
import Animated, {
  Transition,
  Transitioning,
  useSharedValue,
} from "react-native-reanimated";

export default function App() {
  const { width: WINDOW_WIDTH } = useWindowDimensions();
  const transition = (
    <Transition.Sequence>
      <Transition.Out type="slide-bottom" />
      <Transition.Change interpolation="easeOut" />
      <Transition.In type="fade" />
    </Transition.Sequence>
  );
  const ref = useRef();

  useEffect(() => {
    ref?.current?.animateNextTransition?.();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Transitioning.View
        style={{ padding: 16 }}
        ref={ref}
        transition={transition}
      >
        <BarChart
          containerWidth={WINDOW_WIDTH}
          containerHeight={EBarItem.HEIGHT + 90}
          data={dummiesBarChartData()}
        />
        <Text>Open up App.tsx to start working on your app!</Text>
      </Transitioning.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
