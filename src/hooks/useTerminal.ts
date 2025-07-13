import { useEffect, useState, useCallback } from "react";
import { Terminal } from "../types/terminal";
import { terminalService } from "../services/terminalService";

export const useTerminal = () => {
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTerminals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await terminalService.getList();
      setTerminals(data);
    } catch (err: any) {
      console.error("Failed to fetch terminals:", err);
      setError("Failed to load terminals. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTerminals();
  }, [fetchTerminals]);

  return {
    terminals,
    loading,
    error,
    refetch: fetchTerminals,
  };
};
