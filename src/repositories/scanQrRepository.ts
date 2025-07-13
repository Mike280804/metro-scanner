import { ScanData } from "../types/ScanData";
import scanQrApi from "../apis/scanQrApi";

export const scanQrRepository = {
  scanQr: async (scanData: ScanData): Promise<any> => {
    const payload = {
      qrToken: scanData.data,
      terminalId: scanData.terminal.id,
      isOut: scanData.direction === "out",
    };

    const response = await scanQrApi.scanQr(payload);
    return response.data;
  },
};
