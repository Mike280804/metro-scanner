import React from "react";
import { StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ResultIconProps {
  success: boolean;
  scaleAnim: Animated.Value;
  size?: number;
}

const ResultIcon: React.FC<ResultIconProps> = ({
  success,
  scaleAnim,
  size = 30,
}) => {
  return (
    <Animated.View
      style={[
        styles.iconContainer,
        success ? styles.successIconContainer : styles.errorIconContainer,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Ionicons
        name={success ? "checkmark-circle" : "close-circle"}
        size={size}
        color={success ? "#10b981" : "#ef4444"}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginBottom: 15,
  },
  successIconContainer: {
    backgroundColor: "#f0fdf4",
    padding: 10,
    borderRadius: 50,
  },
  errorIconContainer: {
    backgroundColor: "#fef2f2",
    padding: 10,
    borderRadius: 50,
  },
});

export default ResultIcon;
