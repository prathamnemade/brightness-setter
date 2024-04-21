import {
  Blur,
  Canvas,
  Image,
  useImage,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

const Background = () => {
  const image = useImage(require("./assets/background.jpg"));
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
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
    </Canvas>
  );
};

export default Background;
