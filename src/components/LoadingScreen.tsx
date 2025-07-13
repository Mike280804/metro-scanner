import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const LoadingScreen: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#075985" />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    alignItems: "center",
  },
  message: {
    marginTop: 10,
    color: "#075985",
    fontSize: 16,
    fontWeight: "500",
  },
});
