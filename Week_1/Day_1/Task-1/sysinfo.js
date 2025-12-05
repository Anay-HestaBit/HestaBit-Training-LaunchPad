const os = require("os");
const util = require("util");
const { exec } = require("child_process");

const execAsync = util.promisify(exec);

function section(title) {
  console.log("\n");
  console.log(title);
  console.log("\n");
}

async function getHostName() {
  section("Host Name");
  console.log(os.hostname());
}

async function getDiskSpace() {
  section("Disk Space (df -h)");
  try {
    const { stdout } = await execAsync(
      "df -h --output=source,fstype,size,used,avail,pcent,target"
    );
    console.log(stdout.trim());
  } catch (err) {
    console.log("Error:", err.message);
  }
}

async function getOpenPorts() {
  section("Open Ports (Listening)");

  try {
    const { stdout } = await execAsync("ss -tulnp");
    const lines = stdout.trim().split("\n").slice(0, 6).join("\n");
    console.log(lines);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

async function getLoggedInUser() {
  section("Logged-in User");
  console.log(os.userInfo().username);
}

async function getDefaultGateway() {
  section("Default Gateway");
  try {
    const { stdout } = await execAsync("ip route show default");
    console.log(stdout.trim());
  } catch (err) {
    console.log("Error:", err.message);
  }
}

async function getNetworkInterfaces() {
  section("Network Interfaces");
  console.log(os.networkInterfaces());
}

async function main() {
  await getHostName();
  await getDiskSpace();
  await getOpenPorts();
  await getLoggedInUser();
  await getDefaultGateway();
  await getNetworkInterfaces();
}

main();
