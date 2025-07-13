import terminalApi from "../apis/terminalApi";
import { Terminal } from "../types/terminal";

export const terminalRepository = {
  getList: async (): Promise<Terminal[]> => {
    const response = await terminalApi.getList();
    return response.data;
  },
};
