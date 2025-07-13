import React from "react";
import { Animated } from "react-native";
import ResultIcon from "./ResultIcon";
import ResultTitle from "./ResultTitle";
import ErrorCard from "./ErrorCard";
import ActionButtons from "./ActionButtons";

interface ErrorContentProps {
  scaleAnim: Animated.Value;
  errorMessage?: string;
  onScanAgain?: () => void;
  onClose?: () => void;
}

const ErrorContent: React.FC<ErrorContentProps> = ({
  scaleAnim,
  errorMessage,
  onScanAgain,
  onClose,
}) => {
  return (
    <>
      <ResultIcon success={false} scaleAnim={scaleAnim} />
      <ResultTitle success={false} />
      <ErrorCard errorMessage={errorMessage} />
      <ActionButtons
        success={false}
        onScanAgain={onScanAgain}
        onClose={onClose}
      />
    </>
  );
};

export default ErrorContent;
