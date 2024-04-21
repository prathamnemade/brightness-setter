import { StyleSheet, View } from "react-native";
import Background from "./Background";
import Setter from "./Setter";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Background />
      <View style={styles.container}>
        <Setter />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
