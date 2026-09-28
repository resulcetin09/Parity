import type { PrivateStateProvider } from "@midnight-ntwrk/midnight-js-types";
import type { SigningKey } from "@midnight-ntwrk/compact-runtime";
import type { PrivateState } from "../contract/witnesses";

export function memoryPrivateState(): PrivateStateProvider<
  string,
  PrivateState
> {
  let address = "";
  const states = new Map<string, PrivateState>();
  const keys = new Map<string, SigningKey>();
  const scoped = (id: string) => {
    if (!address) throw new Error("Private state requires a contract scope.");
    return `${address}:${id}`;
  };
  const unsupported = async (): Promise<never> => {
    throw new Error(
      "Memory-only state cannot be exported. Use the Parity organizer file or employee packet.",
    );
  };
  return {
    setContractAddress(value) {
      address = value;
    },
    async set(id, state) {
      states.set(scoped(id), structuredClone(state));
    },
    async get(id) {
      const value = states.get(scoped(id));
      return value ? structuredClone(value) : null;
    },
    async remove(id) {
      states.delete(scoped(id));
    },
    async clear() {
      states.clear();
    },
    async setSigningKey(id, key) {
      keys.set(id, key);
    },
    async getSigningKey(id) {
      return keys.get(id) ?? null;
    },
    async removeSigningKey(id) {
      keys.delete(id);
    },
    async clearSigningKeys() {
      keys.clear();
    },
    exportPrivateStates: unsupported,
    importPrivateStates: unsupported,
    exportSigningKeys: unsupported,
    importSigningKeys: unsupported,
  };
}
