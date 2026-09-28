import { execFileSync } from "node:child_process";
import { mkdir, cp } from "node:fs/promises";
import path from "node:path";

const executable =
  process.env.COMPACTC ?? path.resolve(".tools/compact-0.31.1/compactc");
const checkOnly = process.argv.includes("--skip-zk");
await mkdir("contract/managed", { recursive: true });
execFileSync(
  executable,
  [
    ...(checkOnly ? ["--skip-zk"] : []),
    "contract/parity.compact",
    "contract/managed/parity",
  ],
  { stdio: "inherit" },
);
if (!checkOnly) {
  // The browser fetches proving keys and ZKIR from /contract/voting.
  await mkdir("public/contract/parity", { recursive: true });
  for (const folder of ["keys", "zkir"])
    await cp(
      `contract/managed/parity/${folder}`,
      `public/contract/parity/${folder}`,
      { recursive: true },
    );
}
console.log(
  checkOnly
    ? "Contract compiled (proving keys skipped)."
    : "Contract and proving assets ready.",
);
