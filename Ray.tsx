import {
  Path,
  SkPath,
  Skia,
  clamp,
  usePathInterpolation,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import {
  SharedValue,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const { width: windowWidth } = Dimensions.get("window");
export const CIRCLE_X_Y = { x: windowWidth / 2, y: 150 };

const STARTING_RADIUS = 20;
const INTERVAL_RADIUS = 3;
const TOTAL_INTERVALS = 4;

const Ray = ({
  angle,
  CIRCLE_X_Y,
  progress,
}: {
  angle: number;
  CIRCLE_X_Y: { x: number; y: number };
  progress: SharedValue<number>;
}) => {
  const ALL_PATHS: SkPath[] = [];

  for (let i = 1; i <= TOTAL_INTERVALS; i++) {
    const breakpoint = Skia.Path.Make();
    breakpoint.moveTo(
      CIRCLE_X_Y.x + Math.cos((angle * Math.PI) / 180) * STARTING_RADIUS,
      CIRCLE_X_Y.y + Math.sin((angle * Math.PI) / 180) * STARTING_RADIUS
    );
    breakpoint.lineTo(
      CIRCLE_X_Y.x +
        Math.cos((angle * Math.PI) / 180) *
          (STARTING_RADIUS + INTERVAL_RADIUS * i),
      CIRCLE_X_Y.y +
        Math.sin((angle * Math.PI) / 180) *
          (STARTING_RADIUS + INTERVAL_RADIUS * i)
    );
    breakpoint.close();
    ALL_PATHS.push(breakpoint);
  }

  const progressValue = useDerivedValue(() => {
    return withTiming(clamp(progress.value, 0, 100), { duration: 0 });
  }, [progress.value]);

  const progressIntervals = [0];
  for (let i = ALL_PATHS.length - 1; i > 0; i--) {
    progressIntervals.push(100 / i);
  }
  const animatedPath = usePathInterpolation(
    progressValue,
    progressIntervals,
    ALL_PATHS
  );

  return (
    <Path
      path={animatedPath}
      style={"stroke"}
      strokeJoin="round"
      strokeWidth={3}
      color={"#e5e5eae6"}
    />
  );
};

export default Ray;
