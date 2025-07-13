import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ErrorCardProps {
  errorMessage?: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ errorMessage }) => {
  const tips = [
    "Đảm bảo mã QR rõ nét và không bị che khuất",
    "Giữ camera ổn định và đủ ánh sáng",
    "Kiểm tra mã QR có còn hiệu lực",
  ];

  return (
    <View style={styles.errorCard}>
      <View style={styles.errorSection}>
        <Ionicons name="warning" size={24} color="#f59e0b" />
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorMessage}>
            {errorMessage || "Mã QR không hợp lệ hoặc bị hỏng"}
          </Text>
          <Text style={styles.errorSubMessage}>
            Vui lòng thử lại hoặc kiểm tra mã QR
          </Text>
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Gợi ý khắc phục:</Text>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Ionicons name="bulb" size={16} color="#64748b" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorCard: {
    width: "100%",
    backgroundColor: "#fef2f2",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  errorTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  errorMessage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  errorSubMessage: {
    fontSize: 14,
    color: "#64748b",
  },
  tipsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 8,
    flex: 1,
  },
});

export default React.memo(ErrorCard);
