import { ScanData } from "../types/ScanData";
import { scanQrRepository } from "../repositories/scanQrRepository";

export const scanQrService = {
  scanQr: async (scanData: ScanData): Promise<any> => {
    try {
      const result = await scanQrRepository.scanQr(scanData);
      console.log(scanData);
      return {
        success: true,
        numberOfTicket: result.numberOfTicket,
        message: result.message || "Quét mã thành công",
      };
    } catch (error: any) {
      const status = error?.response?.status;

      // Chỉ log nếu không phải 400
      if (status !== 400) {
        console.error("Scan service error:", error);
      }

      return {
        success: false,
        numberOfTicket: 0,
        message: error?.response?.data?.message || "Có lỗi xảy ra",
      };
    }
  },
};
