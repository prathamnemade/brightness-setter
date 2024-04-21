import { Blur, Canvas, Image, useImage } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import Brightness from "./Brightness";
import { SharedValue } from "react-native-reanimated";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Background = ({ progress }: { progress: SharedValue<number> }) => {
  const image = useImage(require("./assets/background.jpg"));
  if (!image) {
    return null;
  }

  return (
    <Canvas style={{ flex: 1 }}>
      <Image
        x={0}
        y={0}
        width={windowWidth}
        height={windowHeight}
        image={image}
        fit="cover"
      >
        <Blur blur={10} mode={"clamp"} />
      </Image>
      <Brightness progress={progress} />
    </Canvas>
  );
};

export default Background;
