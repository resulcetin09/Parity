import { Buffer } from "buffer";
import process from "process";

// SDK dependencies use Node-style globals even in their browser builds.
// Initialize them before importing the application or its lazy SDK modules.
globalThis.Buffer = Buffer;
globalThis.process ??= process;
