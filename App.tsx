import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import { Buffer } from "buffer";

global.Buffer = Buffer;

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StackNavigator />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
