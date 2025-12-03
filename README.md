# Advent of Code Starter Template (JavaScript)

This is a starter template for solving Advent of Code puzzles using JavaScript.

## Installation

Install dependencies (including Node.js types):

```bash
pnpm install
```

## Usage

### Start a New Day

To set up the folder structure and files for a new day, run:

```bash
node new-day
```

This will create a new directory for the next available day (e.g., `day1`, `day2`, etc.) with the necessary files.

### Run Solutions

To run your solution for a specific day:

```bash
node day <number> [--part <number>] [--example]
```

**Arguments:**

*   `<number>`: The day number you want to run (e.g., `1`, `2`, `25`).
*   `--part <number>` (optional): Run only a specific part (`1` or `2`). If omitted, both parts are run.
*   `--example` (optional): Run using the example input file instead of the main puzzle input.

**Examples:**

```bash
# Run both parts for Day 1 using the real input
node day 1

# Run only Part 2 for Day 5
node day 5 --part 2

# Run Day 3 using the example input
node day 3 --example
```

## File Structure

For each day (e.g., `day1`), the following files are created:

*   `example.txt`: Paste the example input from the puzzle description here.
*   `input.txt`: Paste your unique puzzle input here.
*   `part1.js`: Write your solution for Part 1 here.
*   `part2.js`: Write your solution for Part 2 here.
