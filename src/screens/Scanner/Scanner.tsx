import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
  Vibration,
  Platform,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import SettingModal from "../SettingModal/SettingModal";
import ResultModal from "../ResultModal/ResultModal";
import { Terminal } from "../../types/terminal";
import { useScan } from "../../hooks/useScan";
import LoadingScreen from "../../components/LoadingScreen";

const { width, height } = Dimensions.get("window");

const Scanner = () => {
  const {
    scan,
    loading: scanLoading,
    success: scanSuccess,
    errorMessage,
    numberOfTicket,
  } = useScan();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState<"on" | "off">("off");
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentScanData, setCurrentScanData] = useState<any>(null);
  const [currentTerminal, setCurrentTerminal] = useState<Terminal | undefined>(
    undefined
  );
  const [currentDirection, setCurrentDirection] = useState<"in" | "out">("in");
  const cameraRef = useRef<CameraView>(null);
  const canScan = !scanned && currentTerminal;

  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, [permission]);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;

    if (!currentTerminal) {
      Alert.alert("Thông báo", "Vui lòng chọn ga tàu trước khi quét.");
      return;
    }

    setScanned(true);
    Vibration.vibrate(100);

    const scanData = {
      data,
      timestamp: new Date(),
      terminal: currentTerminal,
      direction: currentDirection,
    };

    setCurrentScanData(scanData);

    await scan(scanData);

    setShowResultModal(true);
  };

  const handleSettingSave = (terminal: Terminal, direction: "in" | "out") => {
    setCurrentTerminal(terminal);
    setCurrentDirection(direction);
  };

  const handleScanAgain = () => {
    setShowResultModal(false);
    setScanned(false);
    setCurrentScanData(null);
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    setScanned(false);
    setCurrentScanData(null);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlashMode((current) => (current === "off" ? "on" : "off"));
  };

  const resetScanner = () => {
    setScanned(false);
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Đang kiểm tra quyền camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Cần cấp quyền truy cập camera để quét mã
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Cấp quyền</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {scanLoading && <LoadingScreen message="Đang xử lý..." />}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
        onBarcodeScanned={canScan ? handleBarCodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        flash={flashMode}
      />

      {/* Overlay khi chưa chọn ga tàu */}
      {!currentTerminal && (
        <View style={styles.disabledOverlay}>
          <Text style={styles.disabledText}>
            Vui lòng chọn ga tàu trước khi quét
          </Text>
          <TouchableOpacity
            style={styles.chooseStationButton}
            onPress={() => setShowSettingModal(true)}
          >
            <Text style={styles.chooseStationButtonText}>Chọn ga tàu</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.settingContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setShowSettingModal(true)}
        >
          <Ionicons name="settings-sharp" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Current Settings Display */}
      {currentTerminal && (
        <View style={styles.currentSettingsContainer}>
          <Text style={styles.currentSettingsText}>
            {currentTerminal.name} -{" "}
            {currentDirection === "in" ? "Vào ga" : "Ra ga"}
          </Text>
        </View>
      )}

      {/* Overlay với khung quét */}
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer}>
          <Text style={styles.instructions}>Đưa mã QR vào khung để quét</Text>
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.leftAndRightContainer} />
          <View style={styles.focusedContainer}>
            <View style={styles.scannerFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
          <View style={styles.leftAndRightContainer} />
        </View>
        <View style={styles.unfocusedContainer}>
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleFlash}
            >
              <Ionicons
                name={flashMode === "on" ? "flash" : "flash-off"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleCameraFacing}
            >
              <Ionicons name="camera-reverse" size={30} color="white" />
            </TouchableOpacity>
            {scanned && (
              <TouchableOpacity
                style={styles.controlButton}
                onPress={resetScanner}
              >
                <Ionicons name="refresh" size={30} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <SettingModal
        visible={showSettingModal}
        onClose={() => setShowSettingModal(false)}
        onSave={handleSettingSave}
        currentTerminal={currentTerminal}
        currentDirection={currentDirection}
      />

      <ResultModal
        visible={showResultModal}
        success={scanSuccess}
        scanData={currentScanData}
        errorMessage={errorMessage}
        numberOfTicket={numberOfTicket}
        onClose={handleCloseResultModal}
        onScanAgain={handleScanAgain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  settingContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 50,
    right: 20,
    zIndex: 10,
  },
  currentSettingsContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 160 : 200,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  currentSettingsText: {
    color: "#00ff00",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  middleContainer: {
    flexDirection: "row",
    height: 250,
  },
  leftAndRightContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  focusedContainer: {
    width: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerFrame: {
    width: 250,
    height: 250,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#00ff00",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  instructions: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 50,
  },
  controlButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    borderRadius: 50,
  },
  message: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  disabledText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  chooseStationButton: {
    backgroundColor: "#075985",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  chooseStationButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Scanner;
