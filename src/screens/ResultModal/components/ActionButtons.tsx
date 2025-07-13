import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ActionButtonsProps {
  success: boolean;
  onScanAgain?: () => void;
  onClose?: () => void;
  primaryText?: string;
  secondaryText?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  success,
  onScanAgain,
  onClose,
  primaryText,
  secondaryText,
}) => {
  const defaultPrimaryText = success ? "Quét tiếp" : "Thử lại";
  const primaryIcon = success ? "scan" : "refresh";

  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity style={styles.primaryButton} onPress={onScanAgain}>
        <Ionicons name={primaryIcon} size={20} color="#ffffff" />
        <Text style={styles.primaryButtonText}>
          {primaryText || defaultPrimaryText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#075985",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#f0f9ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0f2fe",
  },
  secondaryButtonText: {
    color: "#075985",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default React.memo(ActionButtons);
