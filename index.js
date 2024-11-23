import { spawn } from "node:child_process";
import { insertReading } from "./database.js";
import { parseResult } from "./result-parser.js";
import { fileURLToPath } from "url";
import { resolve, dirname } from "node:path";

const acceptLicense = "--accept-license";
const acceptGdpr = "--accept-gdpr";

const speedTest = spawn(
  resolve(dirname(fileURLToPath(import.meta.url)), "bin", "speedtest"),
  [acceptLicense, acceptGdpr, "-f", "json"]
);

const startTime = Date.now();

speedTest.stdout.setEncoding("utf-8");
speedTest.stdout.on("data", async (response) => {
  try {
    const result = JSON.parse(response);
    const parsedResult = parseResult(result);
    const inserted = await insertReading({
      ...parsedResult,
      response,
      startTime,
    });
    console.log("New reading stored!", inserted.id);
  } catch (ex) {
    console.error("error", ex);
    process.exit(1);
  }
});
