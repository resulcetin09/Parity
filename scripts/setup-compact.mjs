import { mkdir, writeFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import path from "node:path";

const version = "0.31.1";
const platform =
  process.platform === "darwin"
    ? "darwin"
    : process.platform === "linux"
      ? "unknown-linux-musl"
      : null;
const arch =
  process.arch === "arm64"
    ? "aarch64"
    : process.arch === "x64"
      ? "x86_64"
      : null;
if (!platform || !arch)
  throw new Error("Compact requires macOS or Linux on ARM64/x64.");
const destination = path.resolve(".tools", `compact-${version}`);
try {
  await access(path.join(destination, "compactc"));
  console.log(`Compact already installed: ${destination}`);
  process.exit(0);
} catch {}
const response = await fetch(
  `https://api.github.com/repos/midnightntwrk/compact/releases/tags/compactc-v${version}`,
);
if (!response.ok) throw new Error(`Release lookup failed (${response.status})`);
const release = await response.json();
const name = `compactc_v${version}_${arch}-${platform}.zip`;
const asset = release.assets.find((item) => item.name === name);
if (!asset?.digest?.startsWith("sha256:"))
  throw new Error(
    "Official asset has no SHA-256 digest; refusing unverified download.",
  );
const download = await fetch(asset.browser_download_url);
if (!download.ok)
  throw new Error(`Compiler download failed (${download.status})`);
const bytes = Buffer.from(await download.arrayBuffer());
const actual = `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
if (actual !== asset.digest) throw new Error("Compiler checksum mismatch.");
await mkdir(destination, { recursive: true });
const archive = path.join(destination, name);
await writeFile(archive, bytes);
execFileSync("unzip", ["-oq", archive, "-d", destination], {
  stdio: "inherit",
});
console.log(`Verified Compact ${version} installed in ${destination}`);
