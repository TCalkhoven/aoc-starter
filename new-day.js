import fs from "node:fs/promises";
import path from "node:path";

const currentDir = process.cwd();

// Template for the JS files
const jsTemplate = `/**
 * @param {string} input
 * @returns {string | number}
 */
export default function execute(input) {
  return 0;
}
`;

async function createNewDay() {
  try {
    const files = await fs.readdir(currentDir);

    // Find existing day directories
    const dayDirs = files.filter((file) => /^day\d+$/.test(file));

    let nextDayNum = 1;
    if (dayDirs.length > 0) {
      const dayNums = dayDirs.map((dir) =>
        parseInt(dir.replace("day", ""), 10)
      );
      nextDayNum = Math.max(...dayNums) + 1;
    }

    const newDayDirName = `day${nextDayNum}`;
    const newDayPath = path.join(currentDir, newDayDirName);

    console.log(`Creating new day directory: ${newDayDirName}`);

    // Create directory
    await fs.mkdir(newDayPath);

    // Create files
    await Promise.all([
      fs.writeFile(path.join(newDayPath, "input.txt"), ""),
      fs.writeFile(path.join(newDayPath, "example.txt"), ""),
      fs.writeFile(path.join(newDayPath, "part1.js"), jsTemplate),
      fs.writeFile(path.join(newDayPath, "part2.js"), jsTemplate),
    ]);

    console.log(
      `Successfully created ${newDayDirName} with input.txt, example.txt, part1.js, and part2.js`
    );
  } catch (error) {
    console.error("Error creating new day:", error);
  }
}

createNewDay();
