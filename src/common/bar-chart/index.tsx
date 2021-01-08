// import { Animated } from "expo";
import React, { useRef, useEffect, RefAttributes, LegacyRef } from "react";
import { Animated, useWindowDimensions } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Rect,
  Stop,
  Text as SvgText,
  G,
} from "react-native-svg";
import { range } from "../../utils/Array";
import { BarItem, EBarItem } from "./BarItem";
import { ViewBox } from "./ViewBox";

export const AMOUNT_BARITEM = 7;

export type IBarChartData = Array<{
  name: string;
  value: number;
}>;

type IBarChartProps = {
  containerHeight: number;
  containerWidth: number;
  data: IBarChartData;
};

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const BarChart = ({
  containerHeight,
  containerWidth,
  data,
}: IBarChartProps) => {
  const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = useWindowDimensions();
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const barItemRef = useRef<Array<Rect>>([]);

  const FULL_BARITEM_WIDTH = WINDOW_WIDTH / data.length;
  const BOTH_SIZE_BARITEM_PADDING = FULL_BARITEM_WIDTH - EBarItem.WIDTH;
  const EACH_SIZE_BARITEM_PADDING = (FULL_BARITEM_WIDTH - EBarItem.WIDTH) / 2;

  // const ADDITON_HEIGHT = 40;
  const BOX_HEIGHT = containerHeight;
  const viewBox = new ViewBox({ height: BOX_HEIGHT });

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: EBarItem.HEIGHT,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    return () => {};
  }, []);

  useEffect(() => {
    barItemRef.current = barItemRef.current.slice(0, data.length);
  }, []);

  const onPressBarItem = (itemIndex: number): void => {
    barItemRef.current[itemIndex]?.setNativeProps({
      strokeWidth: 10,
    });
  };

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      // width={(EBarItem.WIDTH + BOTH_SIZE_BARITEM_PADDING - 4) * AMOUNT_BARITEM}
      width={WINDOW_WIDTH - 32}
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

      <Defs>
        <LinearGradient
          id="prefix__b"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#fff" />
          <Stop offset={1} stopColor="#d5e8ff" />
        </LinearGradient>
      </Defs>

      <Rect
        strokeWidth="1"
        stroke="#72ACFF"
        data-name={`background`}
        width={"100%"}
        height={BOX_HEIGHT}
        rx={16}
        ry={16}
        fill="url(#prefix__b)"
      />

      {data.map((d, i) => {
        const BARITEM_TRANSLATE_X =
          EBarItem.WIDTH * (i + 1) +
          BOTH_SIZE_BARITEM_PADDING * (i + 1) -
          EACH_SIZE_BARITEM_PADDING;

        const BARITEM_TRANSLATE_Y = EBarItem.HEIGHT;

        const FONT_SIZE = 12;

        const BAR_ITEM_CONTAINER_SIZE =
          BOTH_SIZE_BARITEM_PADDING + EBarItem.WIDTH;

        const MIDDLE_POS_X =
          BAR_ITEM_CONTAINER_SIZE * i + BAR_ITEM_CONTAINER_SIZE / 2;

        return (
          <G fill="white">
            {/* <AnimatedRect
              data-name={`background`}
              width={BAR_ITEM_CONTAINER_SIZE * 6}
              height={BOX_HEIGHT}
              rx={8}
              ry={8}
              fill="green"
              fillOpacity="0.6"
              opacity="0.1"
            /> */}

            <BarItem
              key={i}
              index={i}
              y={(-containerHeight + EBarItem.HEIGHT) / 2}
              data-name={`Rectangle ${i + 1}`}
              translateX={BARITEM_TRANSLATE_X}
              translateY={BARITEM_TRANSLATE_Y}
              width={EBarItem.WIDTH}
              height={EBarItem.HEIGHT - FONT_SIZE}
              value={d.value}
              barItemContainerWidth={BAR_ITEM_CONTAINER_SIZE}
              middlePosX={MIDDLE_POS_X}
            />

            <SvgText
              fill="#909090"
              x={MIDDLE_POS_X}
              fontSize={FONT_SIZE}
              y={containerHeight - EACH_SIZE_BARITEM_PADDING}
              textAnchor="middle"
            >
              {d.name}
            </SvgText>
          </G>
        );
      })}
    </Svg>
  );
};

export default BarChart;
