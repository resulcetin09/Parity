export const circuits = [
  "registerEmployees",
  "commitCategory",
  "openCheckWindow",
  "fileDispute",
  "resolveDispute",
  "closeCheckWindow",
  "publishCategory",
] as const;
export type ParityCircuit = (typeof circuits)[number];
