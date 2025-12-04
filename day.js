import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

try {
  const { day, part, isExample } = parseConfig();

  // Resolve paths relative to this script
  const baseDir = import.meta.dirname;
  const dayDir = path.resolve(baseDir, `day${day}`);
  const inputFile = path.resolve(
    dayDir,
    isExample ? "example.txt" : "input.txt"
  );

  console.log(`> Running Day ${day}`, isExample ? "(Example Input)" : "");

  // Check if day directory exists
  try {
    await fs.access(dayDir);
  } catch {
    throw new Error(`Directory for day ${day} does not exist at ${dayDir}`);
  }

  // Read input file once
  let input;
  try {
    input = await fs.readFile(inputFile, "utf8");
  } catch {
    throw new Error(`Input file not found: ${inputFile}`);
  }

  const partsToRun = part ? [part] : [1, 2];

  for (const p of partsToRun) {
    await runPart(dayDir, p, input);
  }
} catch (error) {
  const message =
    error instanceof Error ? error.stack || error.message : String(error);
  console.error(`\x1b[31mError:\x1b[0m ${message}`);
  process.exit(1);
}

/**
 * @param {string} dayDir
 * @param {number} partNum
 * @param {string} input
 */
async function runPart(dayDir, partNum, input) {
  console.log(`\n> Executing part ${partNum}...`);
  const scriptPath = path.resolve(dayDir, `part${partNum}.js`);

  try {
    await fs.access(scriptPath);
  } catch {
    console.warn(`  Skipping: ${scriptPath} not found.`);
    return;
  }

  const module = await import(scriptPath);
  if (typeof module.default !== "function") {
    throw new Error(`part${partNum}.js must export a default function.`);
  }

  const result = await module.default(input);
  if (result !== undefined) {
    console.log(result);
  }
}

function parseConfig() {
  const { values, positionals } = parseArgs({
    options: {
      part: { type: "string" },
      example: { type: "boolean" },
    },
    allowPositionals: true,
  });

  if (positionals.length === 0) {
    throw new Error("Please provide a day number (e.g., `node day 1`)");
  }

  const day = parseInt(positionals[0], 10);
  if (isNaN(day)) {
    throw new Error(`Invalid day number: ${positionals[0]}`);
  }

  let part = null;
  if (values.part) {
    const parsed = parseInt(values.part, 10);
    if (Number.isNaN(parsed)) {
      throw new Error(`Invalid part number: ${values.part}`);
    }
    part = parsed;
  }

  return {
    day,
    part,
    isExample: values.example || false,
  };
}
