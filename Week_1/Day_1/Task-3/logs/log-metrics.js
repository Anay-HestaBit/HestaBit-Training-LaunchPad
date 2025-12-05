const fs = require("fs");
const path = require("path");

const metrics = {
  timestamp: new Date().toISOString(),
  cpuUsage: process.cpuUsage(),
  resourceUsage: process.resourceUsage(),
};

const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filePath = path.join(logDir, "day1-sysmetrics.json");
fs.writeFileSync(filePath, JSON.stringify(metrics, null, 2));

console.log("✔ Metrics saved to logs/day1-sysmetrics.json");
