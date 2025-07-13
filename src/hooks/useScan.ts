import { useState, useCallback, useEffect, useRef } from "react";
import { scanQrService } from "../services/scanQrService";
import { ScanData } from "../types/ScanData";

export const useScan = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [success, setSuccess] = useState<boolean>(false);
  const [numberOfTicket, setNumberOfTicket] = useState<number>(0);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const scan = useCallback(async (scanData: ScanData) => {
    if (!isMounted.current) return;

    setLoading(true);
    setErrorMessage(undefined);
    setSuccess(false);
    setNumberOfTicket(0);

    try {
      const response = await scanQrService.scanQr(scanData);

      if (isMounted.current) {
        setNumberOfTicket(response.numberOfTicket || 0);
        setSuccess(response.success);

        if (!response.success) {
          setErrorMessage(response.message || "Có lỗi xảy ra");
        }
      }

      return response;
    } catch (error: any) {
      console.error("useScan error:", error);
      const message =
        error?.response?.data?.message || error.message || "Có lỗi xảy ra";
      if (isMounted.current) {
        setSuccess(false);
        setErrorMessage(message);
      }
      return { success: false, message, numberOfTicket: 0 };
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  return {
    scan,
    loading,
    errorMessage,
    success,
    numberOfTicket,
  };
};
