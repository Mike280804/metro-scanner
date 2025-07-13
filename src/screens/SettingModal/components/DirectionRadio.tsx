import React, { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface DirectionRadioProps {
  selectedDirection: "in" | "out";
  onSelectDirection: (direction: "in" | "out") => void;
}

const DirectionRadio: React.FC<DirectionRadioProps> = ({
  selectedDirection,
  onSelectDirection,
}) => {
  const directions = useMemo(
    () => [
      {
        value: "in" as const,
        label: "Vào ga",
        description: "Hành khách vào ga tàu",
        icon: "enter-outline" as const,
        color: "#10b981",
      },
      {
        value: "out" as const,
        label: "Ra ga",
        description: "Hành khách ra khỏi ga tàu",
        icon: "exit-outline" as const,
        color: "#ef4444",
      },
    ],
    []
  );

  return (
    <View style={styles.radioContainer}>
      <Text style={styles.sectionTitle}>Hướng di chuyển</Text>
      <View style={styles.radioGroup}>
        {directions.map((direction) => (
          <TouchableOpacity
            key={direction.value}
            style={[
              styles.radioOption,
              selectedDirection === direction.value &&
                styles.radioOptionSelected,
            ]}
            onPress={() => onSelectDirection(direction.value)}
          >
            <View style={styles.radioLeft}>
              <View style={styles.radioButton}>
                {selectedDirection === direction.value && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
            </View>
            <View style={styles.radioContent}>
              <Text style={styles.radioText}>{direction.label}</Text>
              <Text style={styles.radioSubText}>{direction.description}</Text>
            </View>
            <View style={styles.radioIconContainer}>
              <Ionicons
                name={direction.icon}
                size={24}
                color={direction.color}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    color: "#075985",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  radioGroup: {
    gap: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  radioOptionSelected: {
    backgroundColor: "#f0f9ff",
    borderColor: "#075985",
  },
  radioLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#cbd5e1",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#075985",
  },
  radioIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  radioContent: {
    flex: 1,
  },
  radioText: {
    color: "#1f2937",
    fontSize: 16,
    fontWeight: "600",
  },
  radioSubText: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 2,
  },
});

export default React.memo(DirectionRadio);
