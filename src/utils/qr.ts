import { Buffer } from "buffer";

export const decryptQR = (ciphertext: string) => {
  try {
    const plaintext = Buffer.from(ciphertext, "base64").toString("utf8");
    return JSON.parse(plaintext);
  } catch (error) {
    console.error("Failed to decrypt QR:", error);
    return null;
  }
};
