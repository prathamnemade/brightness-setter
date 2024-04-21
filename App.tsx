import { useSharedValue } from "react-native-reanimated";
import Background from "./Background";
import Setter from "./Setter";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";

export default function App() {
  const progress = useSharedValue(0);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Background progress={progress} />
      <Setter progress={progress} />
    </GestureHandlerRootView>
  );
}
