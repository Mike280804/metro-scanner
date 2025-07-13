import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InfoSectionProps {
  label: string;
  icon: string;
  value: string;
  subValue?: string;
  iconColor?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  label,
  icon,
  value,
  subValue,
  iconColor = "#075985",
}) => {
  return (
    <View style={styles.infoSection}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.infoRow}>
        <Ionicons name={icon as any} size={20} color={iconColor} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoValue} numberOfLines={3}>
            {value}
          </Text>
          {subValue && <Text style={styles.infoSubValue}>{subValue}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#075985",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  infoSubValue: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748b",
  },
});

export default InfoSection;
