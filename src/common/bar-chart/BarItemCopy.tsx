import * as React from "react";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, useWindowDimensions } from "react-native";
import { ViewBox } from "./ViewBox";
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  G,
  Text as SvgText,
} from "react-native-svg";
import { range } from "../../utils/Array";

type BarItemProps = {
  height: number;
  width: number;
};

export enum EBarItem {
  WIDTH = 24,
  HEIGHT = 300,
}

export const AMOUNT_BARITEM = 7;

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const BarItem = ({ height, width }: BarItemProps) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = useWindowDimensions();
  const FULL_BARITEM_WIDTH = WINDOW_WIDTH / AMOUNT_BARITEM;
  const BOTH_SIZE_BARITEM_PADDING = FULL_BARITEM_WIDTH - EBarItem.WIDTH;
  const EACH_SIZE_BARITEM_PADDING = (FULL_BARITEM_WIDTH - EBarItem.WIDTH) / 2;

  const ADDITON_HEIGHT = 40;
  const BOX_HEIGHT = height + ADDITON_HEIGHT;
  const viewBox = new ViewBox({ height: BOX_HEIGHT });

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: height,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    return () => {};
  }, []);
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={(EBarItem.WIDTH + BOTH_SIZE_BARITEM_PADDING - 4) * AMOUNT_BARITEM}
      height={BOX_HEIGHT}
      viewBox={`0 0 ${viewBox.getWidth()} ${viewBox.getHeight()}`}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#3e8bff" />
          <Stop offset={1} stopColor="#72acff" />
        </LinearGradient>
      </Defs>
      <AnimatedRect
        data-name={`background`}
        width={WINDOW_WIDTH}
        height={BOX_HEIGHT}
        rx={8}
        ry={8}
        fill="red"
      />

      {range(AMOUNT_BARITEM).map((v, i) => {
        const BARITEM_TRANSLATE_X =
          width * (i + 1) +
          BOTH_SIZE_BARITEM_PADDING * i +
          EACH_SIZE_BARITEM_PADDING;

        const BARITEM_TRANSLATE_Y = height;

        return (
          <G fill="white">
            <AnimatedRect
              y={-ADDITON_HEIGHT / 2}
              data-name={`Rectangle ${i + 1}`}
              translateX={BARITEM_TRANSLATE_X}
              translateY={BARITEM_TRANSLATE_Y}
              rotation="180"
              width={width}
              height={animatedHeight}
              rx={4}
              fill="url(#prefix__a)"
              onPress={() => alert(`Item ${i + 1}`)}
            />
            <SvgText
              fill="black"
              // stroke="purple"
              fontSize="13"
              // fontWeight="bold"
              // x="100"
              // y="100"
              textAnchor="middle"
            >
              STROKED TEXT
            </SvgText>
          </G>
        );
      })}
    </Svg>
  );
};
