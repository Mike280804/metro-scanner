import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Terminal } from "../../../types/terminal";

interface TerminalDropdownProps {
  selectedTerminal?: Terminal;
  terminals: Terminal[];
  loading: boolean;
  error: string | null;
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onSelectTerminal: (terminal: Terminal) => void;
  onRetry: () => void;
}

const TerminalDropdown: React.FC<TerminalDropdownProps> = ({
  selectedTerminal,
  terminals,
  loading,
  error,
  showDropdown,
  onToggleDropdown,
  onSelectTerminal,
  onRetry,
}) => {
  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownHeader}
        onPress={onToggleDropdown}
      >
        <View style={styles.dropdownHeaderContent}>
          <View style={styles.dropdownHeaderLeft}>
            <MaterialCommunityIcons name="train" size={20} color="#075985" />
            <View style={styles.dropdownHeaderTextContainer}>
              <Text style={styles.dropdownHeaderText}>
                {selectedTerminal ? selectedTerminal.name : "Chọn ga tàu"}
              </Text>
              {selectedTerminal && (
                <Text style={styles.dropdownSubText}>
                  {selectedTerminal.location}
                </Text>
              )}
            </View>
          </View>
          <Ionicons
            name={showDropdown ? "chevron-up" : "chevron-down"}
            size={20}
            color="#075985"
          />
        </View>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownList}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#075985" />
              <Text style={styles.loadingText}>Đang tải ga tàu...</Text>
            </View>
          ) : error ? (
            <TouchableOpacity onPress={onRetry} style={styles.errorContainer}>
              <Ionicons name="refresh" size={20} color="#ef4444" />
              <Text style={styles.errorText}>
                Lỗi tải ga tàu. Nhấn để thử lại.
              </Text>
            </TouchableOpacity>
          ) : (
            <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
              {terminals.map((terminal, index) => (
                <TouchableOpacity
                  key={terminal.id.toString()}
                  style={[
                    styles.dropdownItem,
                    selectedTerminal?.id === terminal.id &&
                      styles.dropdownItemSelected,
                    index === terminals.length - 1 && styles.dropdownItemLast,
                  ]}
                  onPress={() => onSelectTerminal(terminal)}
                >
                  <View style={styles.dropdownItemLeft}>
                    <Ionicons
                      name="location"
                      size={16}
                      color={
                        selectedTerminal?.id === terminal.id
                          ? "#ffffff"
                          : "#64748b"
                      }
                    />
                    <View style={styles.dropdownItemTextContainer}>
                      <Text
                        style={[
                          styles.dropdownItemText,
                          selectedTerminal?.id === terminal.id &&
                            styles.dropdownItemTextSelected,
                        ]}
                      >
                        {terminal.name}
                      </Text>
                      <Text
                        style={[
                          styles.dropdownItemSubText,
                          selectedTerminal?.id === terminal.id &&
                            styles.dropdownItemSubTextSelected,
                        ]}
                      >
                        {terminal.location}
                      </Text>
                    </View>
                  </View>
                  {selectedTerminal?.id === terminal.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#ffffff"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "relative",
  },
  dropdownHeader: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0f2fe",
  },
  dropdownHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  dropdownHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dropdownHeaderTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  dropdownHeaderText: {
    color: "#075985",
    fontSize: 16,
    fontWeight: "600",
  },
  dropdownSubText: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 2,
  },
  dropdownList: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e0f2fe",
    maxHeight: 240,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownScroll: {
    maxHeight: 240,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loadingText: {
    marginLeft: 8,
    color: "#64748b",
    fontSize: 14,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    marginLeft: 8,
    color: "#ef4444",
    fontSize: 14,
    textAlign: "center",
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemSelected: {
    backgroundColor: "#075985",
  },
  dropdownItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dropdownItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  dropdownItemText: {
    color: "#1f2937",
    fontSize: 15,
    fontWeight: "500",
  },
  dropdownItemTextSelected: {
    color: "#ffffff",
  },
  dropdownItemSubText: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 2,
  },
  dropdownItemSubTextSelected: {
    color: "#bfdbfe",
  },
});

export default React.memo(TerminalDropdown);
