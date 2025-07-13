import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Scanner from "../screens/Scanner/Scanner";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Scanner">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Scanner"
        component={Scanner}
      />
    </Stack.Navigator>
  );
}
