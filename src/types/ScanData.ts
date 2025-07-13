import { Terminal } from "./terminal";

export interface ScanData {
  data: string;
  timestamp: Date;
  terminal: Terminal;
  direction: "in" | "out";
}
