import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { ScanRequest } from "../types/scanRequest";

const scanQrApi = {
  scanQr: (body: ScanRequest): Promise<any> =>
    axiosClient.post(API_ENDPOINTS.SCAN_QR, body),
};

export default scanQrApi;
