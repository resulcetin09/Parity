export function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function fromHex(hex: string, length?: number): Uint8Array {
  if (
    !/^(?:[a-f0-9]{2})+$/i.test(hex) ||
    (length !== undefined && hex.length !== length * 2)
  )
    throw new Error("Invalid hexadecimal value.");
  return Uint8Array.from(hex.match(/.{2}/g)!, (b) => Number.parseInt(b, 16));
}

export const randomSecret = () => crypto.getRandomValues(new Uint8Array(32));

export const shortId = (value: string) =>
  value.length > 18 ? `${value.slice(0, 8)}…${value.slice(-6)}` : value;

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8", { fatal: true });

/** Labels (periods, categories) are stored on-chain as UTF-8 zero-padded to 32 bytes. */
export const MAX_LABEL_BYTES = 32;
export const labelBytes = (text: string) => encoder.encode(text.trim()).length;

export function encodeLabel(text: string): Uint8Array {
  const encoded = encoder.encode(text.trim());
  if (encoded.length === 0) throw new Error("A label cannot be empty.");
  if (encoded.length > MAX_LABEL_BYTES)
    throw new Error(`"${text.trim()}" is longer than 32 bytes.`);
  const out = new Uint8Array(32);
  out.set(encoded);
  return out;
}

export function decodeLabel(bytes: Uint8Array): string {
  let end = bytes.length;
  while (end > 0 && bytes[end - 1] === 0) end--;
  try {
    return decoder.decode(bytes.slice(0, end));
  } catch {
    return `0x${toHex(bytes)}`;
  }
}
