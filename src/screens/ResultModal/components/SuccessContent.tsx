import React from "react";
import { Animated } from "react-native";
import { ScanData } from "../../../types/ScanData";
import ResultIcon from "./ResultIcon";
import ResultTitle from "./ResultTitle";
import SuccessInfoCard from "./SuccessInfoCard";
import ActionButtons from "./ActionButtons";

interface SuccessContentProps {
  scaleAnim: Animated.Value;
  scanData?: ScanData;
  numberOfTicket?: number;
  onScanAgain?: () => void;
  formatTimestamp: (timestamp: Date) => string;
}

const SuccessContent: React.FC<SuccessContentProps> = ({
  scaleAnim,
  scanData,
  numberOfTicket,
  onScanAgain,
  formatTimestamp,
}) => {
  return (
    <>
      <ResultIcon success={true} scaleAnim={scaleAnim} />
      <ResultTitle success={true} />
      <SuccessInfoCard
        scanData={scanData}
        numberOfTicket={numberOfTicket}
        formatTimestamp={formatTimestamp}
      />
      <ActionButtons success={true} onScanAgain={onScanAgain} />
    </>
  );
};

export default SuccessContent;
