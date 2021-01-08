import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Text, Button, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";
import { range } from "../../utils/Array";

type BarItemProps = {
  key: number;

  translateY: number;
  translateX: number;

  x?: number;
  y?: number;

  width: number;
  height: number;

  value: number;
  index: number;
  barItemContainerWidth: number;
};

export enum EBarItem {
  WIDTH = 24,
  HEIGHT = 300,
}

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const BarItem = ({
  key,
  translateX,
  translateY,
  width,
  height,
  x,
  y,

  value,
  index,

  barItemContainerWidth,
}: BarItemProps) => {
  // const [tooltipVisible, setTooltipVisible] = useState(false)
  const animatedStrokeWidth = useSharedValue(0);
  const animatedHeight = useSharedValue(0);
  const tooltipOpacity = useSharedValue(0);
  const MAX_STROKE_WIDTH = 5;

  const animatedProps = useAnimatedProps(() => {
    return {
      height: animatedHeight.value,
      strokeWidth: withTiming(animatedStrokeWidth.value, { duration: 200 }),
    };
  });

  const animatedTooltipProps = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animatedStrokeWidth.value, {
        duration: 800,
      }),
    };
  });

  useEffect(() => {
    animatedHeight.value = withTiming(height, {
      duration: 2000,
    });
  }, []);

  const onIncrementStrokeWidth = () => {
    animatedStrokeWidth.value = MAX_STROKE_WIDTH;
    tooltipOpacity.value = 1;
  };

  const onResetStrokeWidth = () => {
    animatedStrokeWidth.value = 0;
    tooltipOpacity.value = 0;
  };

  return (
    <>
      <AnimatedRect
        y={y}
        x={x}
        data-name={`Rectangle ${key + 1}`}
        translateX={translateX}
        translateY={translateY}
        rotation="180"
        width={EBarItem.WIDTH}
        // height={height}
        rx={4}
        stroke="url(#prefix__a)"
        // strokeWidth={}
        fill="url(#prefix__a)"
        onPressIn={() => {
          // alert("hi");
          onIncrementStrokeWidth();
        }}
        onPressOut={() => {
          onResetStrokeWidth();
        }}
        animatedProps={animatedProps}
      />
      <AnimatedRect
        y={16}
        // x={EBarItem.WIDTH}
        translateX={barItemContainerWidth * index}
        data-name={`Rectangle ${key + 1}`}
        width={barItemContainerWidth}
        rx={4}
        // stroke="url(#prefix__a)"
        fill="#343434"
        height={30}
        animatedProps={animatedTooltipProps}
      ></AnimatedRect>
      {/* <AnimatedRect
        y={16}
        x={EBarItem.WIDTH}
        translateX={translateX}
        data-name={`Rectangle ${key + 1}`}
        width={EBarItem.WIDTH}
        rx={4}
        stroke="url(#prefix__a)"
        fill="red"
        height={30}
        zIndex={100}
        animatedProps={animatedTooltipProps}
      /> */}
    </>
  );
};