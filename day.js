import fs from "node:fs/promises";
import path from "node:path";

// Remove node and extract script and args
const [script, ...args] = process.argv.slice(1);

const config = parseCliOptions(args);

const pathname = path.resolve(path.dirname(script), `day${config.day}`);
const target = path.resolve(pathname, `part${config.part}.js`);
const input = path.resolve(
  pathname,
  config.example ? "example.txt" : "input.txt"
);

const { default: execute } = await import(target);
if (typeof execute !== "function") {
  throw new Error(`${target} must export a default function`);
}

const result = await execute(await fs.readFile(input, "utf8"));
if (result !== undefined) {
  console.log(result);
  process.exit(0);
}

/**
 *
 * @param {string[]} argv
 * @returns {{ day: number, part: number, example: boolean }}
 */
function parseCliOptions(argv) {
  if (argv.length < 1) {
    console.error(
      "Not enough arguments provided. Expected `day <number> [--part <number>] [--example]`"
    );
    process.exit(1);
  }

  const [argument, ...options] = argv;
  const day = parseInt(argument);
  if (isNaN(day)) {
    console.error(`Invalid day number: ${argument}`);
    process.exit(1);
  }

  let config = { day: day, part: 1, example: false };
  if (options.length === 0) {
    return config;
  }

  for (let i = 0; i < options.length; i++) {
    const arg = options[i];

    switch (arg) {
      case "--part":
        if (i + 1 === options.length) {
          console.error(
            `Invalid argument ${arg}: \`Expected ${arg} <value>.\``
          );
          process.exit(1);
        }

        const val = parseInt(options[i + 1]);
        if (Number.isNaN(val)) {
          console.error(
            `Invalid value ${arg}=${val}: \`Expected ${arg} <number>.\``
          );
          process.exit(1);
        }

        config.part = val;
        // Skip val iteration
        i++;
        break;
      case "--example":
        config.example = true;
        break;
    }
  }

  return config;
}
