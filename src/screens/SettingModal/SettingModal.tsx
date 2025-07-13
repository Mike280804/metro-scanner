import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Terminal } from "../../types/terminal";
import { useTerminal } from "../../hooks/useTerminal";
import TerminalDropdown from "./components/TerminalDropdown";
import DirectionRadio from "./components/DirectionRadio";

const { height } = Dimensions.get("window");

interface SettingModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (terminal: Terminal, direction: "in" | "out") => void;
  currentTerminal?: Terminal;
  currentDirection?: "in" | "out";
}

const SettingModal: React.FC<SettingModalProps> = ({
  visible,
  onClose,
  onSave,
  currentTerminal,
  currentDirection = "in",
}) => {
  const { terminals, loading, error, refetch } = useTerminal();

  const [selectedTerminal, setSelectedTerminal] = useState<
    Terminal | undefined
  >(currentTerminal);
  const [selectedDirection, setSelectedDirection] = useState<"in" | "out">(
    currentDirection
  );
  const [showTerminalDropdown, setShowTerminalDropdown] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: height,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [visible]);

  const handleSave = useCallback(() => {
    if (selectedTerminal && selectedDirection) {
      onSave(selectedTerminal, selectedDirection);
      onClose();
    }
  }, [selectedTerminal, selectedDirection, onSave, onClose]);

  const handleTerminalSelect = useCallback((terminal: Terminal) => {
    setSelectedTerminal(terminal);
    setShowTerminalDropdown(false);
  }, []);

  const handleToggleDropdown = useCallback(() => {
    setShowTerminalDropdown((prev) => !prev);
  }, []);

  useEffect(() => {
    if (visible) {
      setSelectedTerminal(currentTerminal);
      setSelectedDirection(currentDirection);
    }
  }, [visible, currentTerminal, currentDirection]);

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
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderLeft}>
              <Ionicons name="settings" size={24} color="#075985" />
              <Text style={styles.modalTitle}>Cài đặt máy quét</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Terminal Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ga tàu</Text>
              <TerminalDropdown
                selectedTerminal={selectedTerminal}
                terminals={terminals}
                loading={loading}
                error={error}
                showDropdown={showTerminalDropdown}
                onToggleDropdown={handleToggleDropdown}
                onSelectTerminal={handleTerminalSelect}
                onRetry={refetch}
              />
            </View>

            {/* Direction Selection */}
            <View style={styles.section}>
              <DirectionRadio
                selectedDirection={selectedDirection}
                onSelectDirection={setSelectedDirection}
              />
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveButton,
                !selectedTerminal && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              disabled={!selectedTerminal}
            >
              <Text
                style={[
                  styles.saveButtonText,
                  !selectedTerminal && styles.saveButtonTextDisabled,
                ]}
              >
                Lưu cài đặt
              </Text>
            </TouchableOpacity>
          </View>
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
    minHeight: height * 0.68,
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
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: "#075985",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Footer Styles
  modalFooter: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#64748b",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#075985",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#cbd5e1",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonTextDisabled: {
    color: "#94a3b8",
  },
  errorText: {
    color: "red",
    padding: 10,
    textAlign: "center",
  },
});

export default React.memo(SettingModal);
