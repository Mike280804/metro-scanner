import { ScanData } from "../types/ScanData";
import { scanQrRepository } from "../repositories/scanQrRepository";
import { decryptQR } from "../utils/qr";
import { socket } from "../libs/socket";

type ScanQrResult = {
  success: boolean;
  numberOfTicket: number;
  message: string;
};

export const scanQrService = {
  scanQr: async (scanData: ScanData): Promise<ScanQrResult> => {
    const decrypted = decryptQR(scanData.data);
    if (!decrypted) {
      return {
        success: false,
        message: "QR không hợp lệ",
        numberOfTicket: 0,
      };
    }

    const { qrToken, ticketId, userId } = decrypted;

    if (!qrToken || !ticketId || !userId) {
      return {
        success: false,
        message: "QR thiếu dữ liệu cần thiết",
        numberOfTicket: 0,
      };
    }

    const payload = {
      ...scanData,
      data: qrToken,
    };

    try {
      const result = await scanQrRepository.scanQr(payload);

      if (!socket.connected) {
        socket.connect();

        await Promise.race([
          new Promise<void>((resolve) => {
            if (socket.connected) {
              resolve();
            } else {
              socket.once("connect", () => resolve());
            }
          }),
          new Promise<void>((_, reject) =>
            setTimeout(() => reject(new Error("Socket connect timeout")), 5000)
          ),
        ]);
      }

      socket.emit("ticketScanned", {
        ticketId: String(ticketId),
        userId: String(userId),
      });

      // Optional: listen for confirmation
      socket.once("ticketScanConfirmed", () => {});

      return {
        success: true,
        numberOfTicket: result.numberOfTicket ?? 1,
        message: result.message || "Quét mã thành công",
      };
    } catch (error: any) {
      const status = error?.response?.status;

      if (status !== 400) {
        console.error("ScanQrService error:", error);
      }

      return {
        success: false,
        numberOfTicket: 0,
        message: error?.response?.data?.message || "Có lỗi xảy ra",
      };
    }
  },
};

// Socket setup for scanner
const setupScannerSocket = () => {
  socket.on("connect", () => {});

  socket.on("connect_error", (err) => {
    console.error(`Scanner socket connect error:`, err.message);
  });

  socket.on("disconnect", () => {});
  socket.on("ticketScanConfirmed", () => {});
};

setupScannerSocket();
