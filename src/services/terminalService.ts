import { terminalRepository } from "../repositories/terminalRepository";
import { Terminal } from "../types/terminal";

export const terminalService = {
  getList: async (): Promise<Terminal[]> => {
    const [terminals] = await Promise.all([terminalRepository.getList()]);

    // Thêm business logic tại đây nếu cần
    return terminals;
  },
};
