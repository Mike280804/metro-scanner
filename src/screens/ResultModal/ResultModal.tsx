import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import { ScanData } from "../../types/ScanData";
import SuccessContent from "./components/SuccessContent";
import ErrorContent from "./components/ErrorContent";

const { width, height } = Dimensions.get("window");

interface ResultModalProps {
  visible: boolean;
  success: boolean;
  scanData?: ScanData;
  errorMessage?: string;
  numberOfTicket?: number;
  onClose: () => void;
  onScanAgain?: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  visible,
  success,
  scanData,
  errorMessage,
  numberOfTicket,
  onClose,
  onScanAgain,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
          delay: 200,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: height,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ]).start();
    }
  }, [visible]);

  const formatTimestamp = useCallback((timestamp: Date) => {
    return timestamp.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, []);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Content */}
          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {success ? (
              <SuccessContent
                scaleAnim={scaleAnim}
                scanData={scanData}
                numberOfTicket={numberOfTicket}
                onScanAgain={onScanAgain}
                formatTimestamp={formatTimestamp}
              />
            ) : (
              <ErrorContent
                scaleAnim={scaleAnim}
                errorMessage={errorMessage}
                onScanAgain={onScanAgain}
                onClose={onClose}
              />
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.85,
    minHeight: height * 0.75,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  modalHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle: {
    color: "#1f2937",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: "center",
    paddingBottom: 30,
  },
});

export default React.memo(ResultModal);
