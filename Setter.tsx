import { Dimensions, View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const WIDGET_WIDTH = windowWidth / 3;
const WIDGET_HEIGHT = windowHeight / 2.5;
const EXTRA_HEIGHT = 20;
const EXTRA_WIDTH = EXTRA_HEIGHT;

const Setter = () => {
  const widgetHeight = useSharedValue(WIDGET_HEIGHT);
  const widgetWidth = useSharedValue(WIDGET_WIDTH);
  const translateY = useSharedValue(100);

  const panGesture = Gesture.Pan()
    .onChange((e) => {
      translateY.value += e.changeY;

      widgetHeight.value = withTiming(
        clamp(
          Math.abs(translateY.value),
          WIDGET_HEIGHT,
          WIDGET_HEIGHT + EXTRA_HEIGHT
        ),
        { duration: 300 }
      );

      if (Math.abs(translateY.value) > WIDGET_HEIGHT) {
        widgetWidth.value = withTiming(
          clamp(
            widgetWidth.value - (Math.abs(translateY.value) - WIDGET_HEIGHT),
            WIDGET_WIDTH,
            WIDGET_WIDTH - EXTRA_WIDTH
          )
        );
      } else {
        widgetWidth.value = withTiming(WIDGET_WIDTH);
      }
    })
    .onEnd((e) => {
      widgetWidth.value = withTiming(WIDGET_WIDTH, { duration: 500 });
      widgetHeight.value = withTiming(WIDGET_HEIGHT, { duration: 500 }, () => {
        translateY.value = clamp(translateY.value, -WIDGET_HEIGHT, 0);
      });
    });

  const tapGesture = Gesture.Tap().onEnd((e) => {
    translateY.value = clamp(translateY.value, -WIDGET_HEIGHT, 0);
  });

  const heightStyle = useAnimatedStyle(() => ({
    height: translateY.value * -1,
  }));

  const outerHeightStyle = useAnimatedStyle(() => ({
    height: widgetHeight.value,
    width: widgetWidth.value,
    // For stretch like effect towards upward
    top:
      (windowHeight - WIDGET_HEIGHT) / 2 -
      (Math.abs(widgetHeight.value - WIDGET_HEIGHT) || 0),
    borderRadius: widgetWidth.value * 0.3,
  }));

  const gesture = Gesture.Race(tapGesture, panGesture);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.outerView, outerHeightStyle]}>
        <Animated.View style={[styles.sliderView, heightStyle]} />
      </Animated.View>
    </GestureDetector>
  );
};

export default Setter;

const styles = StyleSheet.create({
  outerView: {
    width: WIDGET_WIDTH,
    backgroundColor: "#1c1c1e80",
    overflow: "hidden",
  },
  sliderView: {
    width: WIDGET_WIDTH,
    backgroundColor: "#e5e5eae6",
    position: "absolute",
    bottom: 0,
  },
});
