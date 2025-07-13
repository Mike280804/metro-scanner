import React from "react";
import { StyleSheet, View } from "react-native";
import { ScanData } from "../../../types/ScanData";
import InfoSection from "./InfoSection";

interface SuccessInfoCardProps {
  scanData?: ScanData;
  numberOfTicket?: number;
  formatTimestamp: (timestamp: Date) => string;
}

const SuccessInfoCard: React.FC<SuccessInfoCardProps> = ({
  scanData,
  numberOfTicket,
  formatTimestamp,
}) => {
  return (
    <View style={styles.infoCard}>
      {/* Terminal Info */}
      {scanData?.terminal && (
        <InfoSection
          label="GA TÀU"
          icon="train"
          value={scanData.terminal.name}
          subValue={scanData.terminal.location}
        />
      )}

      {/* Number of Tickets Info */}
      {typeof numberOfTicket === "number" && (
        <InfoSection
          label="SỐ LƯỢNG VÉ"
          icon="pricetags"
          value={numberOfTicket.toString()}
        />
      )}

      {/* Direction Info */}
      {scanData?.direction && (
        <InfoSection
          label="HƯỚNG DI CHUYỂN"
          icon={scanData.direction === "in" ? "enter-outline" : "exit-outline"}
          value={scanData.direction === "in" ? "Vào ga" : "Ra ga"}
          subValue={
            scanData.direction === "in"
              ? "Hành khách vào ga tàu"
              : "Hành khách ra khỏi ga tàu"
          }
          iconColor={scanData.direction === "in" ? "#10b981" : "#ef4444"}
        />
      )}

      {/* Timestamp Info */}
      {scanData?.timestamp && (
        <InfoSection
          label="THỜI GIAN QUÉT"
          icon="time"
          value={formatTimestamp(scanData.timestamp)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    width: "100%",
    backgroundColor: "#f0f9ff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0f2fe",
  },
});

export default SuccessInfoCard;
