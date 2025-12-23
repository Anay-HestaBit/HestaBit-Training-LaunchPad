#!/usr/bin/env node
// ^ optional shebang line; lets you run `./stats.js` if you chmod +x

const fs = require('node:fs/promises');
const path = require('node:path');
const { performance } = require('node:perf_hooks');

// 1. Parse command-line arguments
const args = process.argv.slice(2);

const options = {
  linesFile: null,
  charsFile: null,
  wordsFile: null,
  uniqueFiles: [],
};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  switch (arg) {
    case '--lines':
      options.linesFile = args[i + 1];
      i++;
      break;

    case '--chars':
      options.charsFile = args[i + 1];
      i++;
      break;

    case '--words':
      options.wordsFile = args[i + 1];
      i++;
      break;

    case '--unique':
      options.uniqueFiles.push(args[i + 1]);
      i++;
      break;

    default:
      console.error(`Unknown argument: ${arg}`);
  }
}

// count words in a string
function countWords(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

// compute stats for given text
function computeStats(text) {
  const charCount = text.length;
  const lineCount = text.split(/\r?\n/).length;
  const wordCount = countWords(text);

  return { charCount, lineCount, wordCount };
}

// Process a single file and return performance report
async function processFile(filePath, label) {
  if (!filePath) return null; // nothing to do

  try {
    const start = performance.now();

    const content = await fs.readFile(filePath, 'utf8');

    const end = performance.now();
    const executionTimeMs = end - start;

    const { charCount, lineCount, wordCount } = computeStats(content);

    const memoryUsage = process.memoryUsage();
    const memoryMB = Number((memoryUsage.heapUsed / (1024 * 1024)).toFixed(2));

    const report = {
      file: filePath,
      metric: label, // 'lines' / 'chars' / 'words'
      charCount,
      lineCount,
      wordCount,
      executionTimeMs: Number(executionTimeMs.toFixed(2)),
      memoryMB,
    };

    console.log(`\nStats for ${filePath} (${label}):`);
    console.log(`  Lines: ${lineCount}`);
    console.log(`  Words: ${wordCount}`);
    console.log(`  Characters: ${charCount}`);
    console.log(`  Execution time (ms): ${report.executionTimeMs}`);
    console.log(`  Memory (MB): ${report.memoryMB}`);

    return report;
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err.message);
    return null;
  }
}

// Remove duplicate lines for a file
async function removeDuplicateLines(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    const seen = new Set();
    const uniqueLines = [];

    for (const line of lines) {
      if (!seen.has(line)) {
        seen.add(line);
        uniqueLines.push(line);
      }
    }

    const uniqueContent = uniqueLines.join('\n');

    const outputDir = path.join(__dirname, 'output');
    await fs.mkdir(outputDir, { recursive: true });

    const baseName = path.basename(filePath);
    const outputPath = path.join(outputDir, `unique-${baseName}`);

    await fs.writeFile(outputPath, uniqueContent, 'utf8');

    console.log(`Unique lines written to ${outputPath}`);
  } catch (err) {
    console.error(`Error making unique version of ${filePath}:`, err.message);
  }
}

// Write performance log to logs/performance-<timestamp>.json
async function writePerformanceLog(results) {
  const filtered = results.filter(Boolean); // remove nulls

  if (filtered.length === 0) {
    console.log('No performance data to log.');
    return;
  }

  const logsDir = path.join(__dirname, 'logs');
  await fs.mkdir(logsDir, { recursive: true });

  const fileName = `performance-${Date.now()}.json`;
  const fullPath = path.join(logsDir, fileName);

  await fs.writeFile(fullPath, JSON.stringify(filtered, null, 2), 'utf8');

  console.log(`\nPerformance log written to ${fullPath}`);
}

// Main function to run everything concurrently
async function main() {
  const tasks = [];

  if (options.linesFile) {
    tasks.push(processFile(options.linesFile, 'lines'));
  }
  if (options.charsFile) {
    tasks.push(processFile(options.charsFile, 'chars'));
  }
  if (options.wordsFile) {
    tasks.push(processFile(options.wordsFile, 'words'));
  }

  // Run all stat tasks concurrently
  const results = await Promise.all(tasks);

  // handle unique files (one by one is fine)
  for (const file of options.uniqueFiles) {
    await removeDuplicateLines(file);
  }

  // Write performance logs
  await writePerformanceLog(results);
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
