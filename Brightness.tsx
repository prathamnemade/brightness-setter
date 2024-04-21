import { Circle, Group } from "@shopify/react-native-skia";
import { useMemo } from "react";
import {
  Extrapolation,
  SharedValue,
  interpolate,
  useDerivedValue,
} from "react-native-reanimated";
import Ray, { CIRCLE_X_Y } from "./Ray";

const CIRLCE_RADIUS = 10;

const Brightness = ({ progress }: { progress: SharedValue<number> }) => {
  const circleRadius = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 100],
      [CIRLCE_RADIUS, CIRLCE_RADIUS + 4],
      Extrapolation.CLAMP
    );
  }, [progress.value]);

  const RAYS = useMemo(() => {
    const rays = [];
    for (let i = 0; i <= 360; i += 45) {
      rays.push(i);
    }
    return rays;
  }, []);

  return (
    <Group>
      <Circle
        cx={CIRCLE_X_Y.x}
        cy={CIRCLE_X_Y.y}
        r={circleRadius}
        color="#e5e5eae6"
      />
      {RAYS.map((angle, index) => (
        <Ray
          key={index}
          angle={angle}
          CIRCLE_X_Y={CIRCLE_X_Y}
          progress={progress}
        />
      ))}
    </Group>
  );
};

export default Brightness;
