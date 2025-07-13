import React from "react";
import { StyleSheet, Text } from "react-native";

interface ResultTitleProps {
  success: boolean;
  title?: string;
}

const ResultTitle: React.FC<ResultTitleProps> = ({ success, title }) => {
  const defaultTitle = success ? "Quét mã thành công!" : "Quét mã thất bại!";

  return (
    <>
      <Text style={success ? styles.successTitle : styles.errorTitle}>
        {title || defaultTitle}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  successTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 8,
  },
});

export default ResultTitle;
