import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { ApiResponse } from "../types/api";
import { Terminal } from "../types/terminal"; 

const terminalApi = {
  getList: (): Promise<ApiResponse<Terminal[]>> =>
    axiosClient.get(API_ENDPOINTS.LIST_TERMINAL),
};

export default terminalApi;
